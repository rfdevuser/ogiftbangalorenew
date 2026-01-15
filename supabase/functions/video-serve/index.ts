import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simple hash function matching the PHP proxy implementation
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  
  let result = hex;
  for (let round = 1; round < 4; round++) {
    let roundHash = 0;
    const input = str + round.toString();
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      roundHash = ((roundHash << 5) - roundHash) + char;
      roundHash = roundHash & roundHash;
    }
    result += Math.abs(roundHash).toString(16).padStart(8, '0');
  }
  
  return result;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const videoPath = url.searchParams.get('path');
    
    if (!videoPath) {
      return new Response(JSON.stringify({ error: 'Missing path parameter' }), { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }

    // Get secret from environment
    const secretKey = Deno.env.get('VIDEO_TOKEN_SECRET');
    
    if (!secretKey) {
      console.error('[video-serve] VIDEO_TOKEN_SECRET not configured');
      return new Response(JSON.stringify({ error: 'Server configuration error' }), { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }

    // Generate token server-side
    const timestamp = Math.floor(Date.now() / 1000);
    const hash = simpleHash(`${timestamp}${secretKey}`);
    const token = `${timestamp}.${hash}`;

    // Build the signed URL
    const lastSlashIndex = videoPath.lastIndexOf('/');
    const folder = lastSlashIndex > -1 ? videoPath.substring(0, lastSlashIndex) : '';
    const fileName = lastSlashIndex > -1 ? videoPath.substring(lastSlashIndex + 1) : videoPath;
    
    const baseUrl = folder 
      ? `https://www.newogwebsite.com/OGIFTVideos/${folder}/proxy.php`
      : `https://www.newogwebsite.com/OGIFTVideos/proxy.php`;
    
    const signedUrl = `${baseUrl}?file=${encodeURIComponent(fileName)}&token=${encodeURIComponent(token)}`;

    console.log(`[video-serve] Generated signed URL for: ${videoPath}`);

    return new Response(JSON.stringify({ 
      url: signedUrl,
      expiresIn: 300 // 5 minutes
    }), {
      status: 200, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });

  } catch (e) {
    console.error('[video-serve] Error:', e);
    return new Response(JSON.stringify({ error: 'Server error' }), { 
      status: 500, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  }
});
