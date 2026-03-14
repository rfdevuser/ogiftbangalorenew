import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

/**
 * Simple hash function matching the PHP proxy implementation
 */
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

/**
 * Generates a time-based token for the OGIFT video proxy.
 * Token format: {timestamp}.{simpleHash(timestamp + secret)}
 */
function generateToken(secret: string): string {
  const timestamp = Math.floor(Date.now() / 1000);
  const hash = simpleHash(`${timestamp}${secret}`);
  return `${timestamp}.${hash}`;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const secret = Deno.env.get("OGIFT_VIDEO_TOKEN_SECRET");
    if (!secret) {
      console.error("Missing OGIFT_VIDEO_TOKEN_SECRET");
      return new Response(
        JSON.stringify({ error: "Server misconfiguration" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const token = generateToken(secret);
    const videoUrl = `https://www.newogwebsite.com/OGIFTVideos/English/proxy.php?file=OGIFT-Teaser.mp4&token=${encodeURIComponent(token)}`;

    console.log("Generated video token:", token);

    return new Response(
      JSON.stringify({ url: videoUrl, token }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error generating video token:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate token" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
