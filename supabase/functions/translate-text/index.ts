import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, action } = await req.json(); // action: "detect" | "translate"
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    if (action === "detect") {
      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-lite",
          messages: [
            {
              role: "system",
              content: `You are a language detector. Given text, respond with ONLY a JSON object: {"language": "<language_code>", "language_name": "<language_name>"}. 
Use these codes: "en" for English, "hi" for Hindi, "ta" for Tamil, "te" for Telugu, "kn" for Kannada. 
For any other language, use the ISO 639-1 code. Respond with ONLY the JSON, nothing else.`,
            },
            { role: "user", content: text },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`AI Gateway error: ${response.status}`);
      }

      const data = await response.json();
      const raw = data.choices?.[0]?.message?.content?.trim() || "";
      
      // Parse JSON from response (handle markdown code blocks)
      const jsonStr = raw.replace(/```json?\n?/g, "").replace(/```/g, "").trim();
      const detected = JSON.parse(jsonStr);

      return new Response(JSON.stringify(detected), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "translate") {
      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            {
              role: "system",
              content: `You are a translator. Translate the given text to English. Preserve the original meaning, tone, and any emojis. Respond with ONLY the translated text, nothing else. Do not add quotes or explanations.`,
            },
            { role: "user", content: text },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`AI Gateway error: ${response.status}`);
      }

      const data = await response.json();
      const translated = data.choices?.[0]?.message?.content?.trim() || "";

      return new Response(JSON.stringify({ translated_text: translated }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    throw new Error('Invalid action. Use "detect" or "translate".');
  } catch (error) {
    console.error("Error in translate-text:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
