import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { params, metrics, preset } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are a textile-engineering AI advisor at Onati Global Institute of Fashion Technology.
You analyze real-time cloth simulation data and give actionable fabric tuning advice.

Guidelines:
- Identify which real-world fabric the current parameters most closely match.
- Suggest specific parameter adjustments (gravity, wind, stiffness, mass, damping) to achieve a more realistic simulation.
- Explain the physics behind your suggestions in simple terms a fashion design student would understand.
- Keep your response concise — 3-5 bullet points max.
- If the simulation shows excessive stretch or unrealistic draping, flag it.`;

    const userPrompt = `Current simulation state:
- Preset: ${preset}
- Gravity: ${params.gravity} m/s²
- Wind: ${params.wind}
- Stiffness: ${params.stiffness}
- Mass: ${params.mass} kg
- Damping: ${params.damping}

Live metrics:
- Average drape height: ${metrics.avgDrape?.toFixed(2)}m
- Max stretch: ${(metrics.maxStretch * 100)?.toFixed(1)}%
- Settling speed: ${metrics.settlingSpeed?.toFixed(4)}

Analyse this and suggest adjustments for a more realistic fabric behaviour.`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        }),
      }
    );

    if (!response.ok) {
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);

      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limited. Please try again shortly." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add funds." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw new Error(`AI gateway error: ${t}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;

    return new Response(
      JSON.stringify({ reply }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("fabric-ai-advisor error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
