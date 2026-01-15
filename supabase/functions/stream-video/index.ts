import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, range',
  'Access-Control-Expose-Headers': 'content-length, content-range, accept-ranges',
};

serve(async (req) => {
  console.log("Video proxy function called");
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const videoFile = url.searchParams.get('file');
    
    if (!videoFile) {
      console.error('No video file specified');
      return new Response(
        JSON.stringify({ error: 'No video file specified' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get credentials from secrets
    const username = Deno.env.get('VIDEO_SERVER_USERNAME');
    const password = Deno.env.get('VIDEO_SERVER_PASSWORD');
    
    if (!username || !password) {
      console.error('Video server credentials not configured');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse the video file path to get folder and filename
    const lastSlashIndex = videoFile.lastIndexOf('/');
    const folder = lastSlashIndex > -1 ? videoFile.substring(0, lastSlashIndex) : '';
    const fileName = lastSlashIndex > -1 ? videoFile.substring(lastSlashIndex + 1) : videoFile;
    
    // Construct the PHP proxy URL (proxy.php exists in each folder)
    const phpProxyUrl = folder 
      ? `https://www.newogwebsite.com/OGIFTVideos/${folder}/proxy.php?file=${encodeURIComponent(fileName)}`
      : `https://www.newogwebsite.com/OGIFTVideos/proxy.php?file=${encodeURIComponent(fileName)}`;
    
    console.log(`Proxying video request for: ${videoFile}`);
    console.log(`PHP Proxy URL: ${phpProxyUrl}`);

    // Create Basic Auth header for the PHP proxy
    const authHeader = 'Basic ' + btoa(`${username}:${password}`);

    // Forward range header if present (for video seeking)
    const rangeHeader = req.headers.get('range');

    const fetchHeaders: Record<string, string> = {
      'Authorization': authHeader,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Accept': '*/*',
    };

    if (rangeHeader) {
      fetchHeaders['Range'] = rangeHeader;
      console.log(`Range request: ${rangeHeader}`);
    }

    // Fetch from PHP proxy
    const response = await fetch(phpProxyUrl, {
      method: 'GET',
      headers: fetchHeaders,
    });

    if (!response.ok && response.status !== 206) {
      const errorBody = await response.text().catch(() => '');
      console.error(`Failed to fetch video: ${response.status} ${response.statusText}`);
      if (errorBody) {
        console.error(`Upstream body (first 500 chars): ${errorBody.slice(0, 500)}`);
      }

      return new Response(
        JSON.stringify({ error: 'Failed to fetch video', status: response.status }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get content headers from the response
    const contentType = response.headers.get('content-type') || 'video/mp4';
    const contentLength = response.headers.get('content-length');
    const contentRange = response.headers.get('content-range');
    const acceptRanges = response.headers.get('accept-ranges');

    // Build response headers
    const responseHeaders: Record<string, string> = {
      ...corsHeaders,
      'Content-Type': contentType,
    };

    if (contentLength) {
      responseHeaders['Content-Length'] = contentLength;
    }
    if (contentRange) {
      responseHeaders['Content-Range'] = contentRange;
    }
    if (acceptRanges) {
      responseHeaders['Accept-Ranges'] = acceptRanges;
    }

    console.log(`Streaming video: ${videoFile}, Status: ${response.status}`);

    // Stream the response body
    return new Response(response.body, {
      status: response.status,
      headers: responseHeaders,
    });

  } catch (error) {
    console.error('Video proxy error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
