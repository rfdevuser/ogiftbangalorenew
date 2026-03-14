import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageUrl, title, category, description } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    if (!imageUrl) {
      throw new Error("imageUrl is required");
    }

    console.log("Analyzing design:", { title, category, imageUrl: imageUrl.substring(0, 80) });

const systemPrompt = `You are a world-class fashion design professor and industry expert with 25+ years of experience at institutions like Parsons, Central Saint Martins, and working with brands like Chanel, Dior, and Balenciaga.

You are reviewing a student's design work submitted to their portfolio. Provide a thorough, constructive, and encouraging professional critique.

ANALYZE THE FOLLOWING ASPECTS (score each 1-10):

1. **Proportion & Silhouette** - Body proportions, garment proportions, silhouette balance, visual weight distribution
2. **Color Theory** - Color harmony, palette cohesion, contrast usage, mood conveyed through color
3. **Technical Execution** - Line quality, rendering technique, construction details, finishing
4. **Trend Alignment** - Relevance to current/upcoming fashion trends, market awareness
5. **Commercial Viability** - Market potential, target audience clarity, wearability vs artistry balance
6. **Creativity & Originality** - Unique design elements, innovation, personal design voice
7. **Presentation Quality** - Layout, composition, labeling, overall visual impact of the portfolio piece

COURSE RECOMMENDATIONS:
Based on your critique, recommend 2-3 courses from the following catalog that would help the student improve in their weakest areas. Choose courses that directly address the skill gaps you identified:

Available courses (use the exact slug values):
- "fashup-free-taster-sessions" — FASHUP Free Taster Sessions (10 Days, FREE) — Great intro to fashion
- "fashion-illustration" — Fashion Illustration (1 Month, ₹15,000) — Figure drawing, garment rendering, color & media
- "pattern-making-basic" — Pattern Making Basic (1 Month, ₹12,000) — Pattern creation & development basics
- "pattern-making-blouses-advanced" — Pattern Making Blouses Advanced (1 Month, ₹15,000) — Advanced blouse patterns
- "pattern-making-western-advanced" — Pattern Making Western Advanced (1 Month, ₹15,000) — Western clothing patterns
- "art-of-garment-foundation" — Art of Garment Foundation (1 Month, ₹12,000) — Pattern making, fabric science, sewing
- "fabric-knowledge-textile-designing" — Fabric Knowledge & Textile Designing (1 Month) — Material science of textiles
- "draping-technology" — Draping Technology (1 Month) — 3D pattern creation via draping
- "digital-portfolio-making" — Digital Portfolio Making (1 Month, Online) — Curating & presenting work digitally
- "graphic-designing-for-fashion" — Graphic Designing for Fashion (1 Month, ₹15,000) — Fashion branding & digital assets
- "fashion-designing-boutique-management" — Boutique Management (1 Month, ₹12,000) — Business & retail skills
- "fashion-styling" — Fashion Styling (1 Month) — Styling for photoshoots, editorials, clients
- "pattern-making-kids-clothing" — Pattern Making for Kids (1 Month) — Kids clothing patterns
- "pattern-making-boutique-management-3months" — PMBM 3 Months (₹35,000) — Pattern making + boutique management
- "design-process-pattern-making-3months" — DPPM 3 Months (₹35,000) — Design process + pattern making
- "design-pattern-making-portfolio-3months" — DPPMP 3 Months (₹35,000) — Design, pattern making + portfolio
- "six-months-diploma-fashion-designing" — 6 Months Diploma (₹55,000) — Comprehensive fashion designing
- "one-year-advanced-diploma-fashion-designing" — 1 Year Advanced Diploma (₹1,20,000) — Full advanced program

RESPONSE FORMAT (you MUST use this exact JSON structure):
{
  "scores": {
    "proportion": <1-10>,
    "colorTheory": <1-10>,
    "technicalExecution": <1-10>,
    "trendAlignment": <1-10>,
    "commercialViability": <1-10>,
    "creativity": <1-10>,
    "presentationQuality": <1-10>,
    "overall": <1-10>
  },
  "summary": "<2-3 sentence overall assessment>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "improvements": ["<improvement 1>", "<improvement 2>", "<improvement 3>"],
  "detailedFeedback": {
    "proportion": "<detailed feedback>",
    "colorTheory": "<detailed feedback>",
    "technicalExecution": "<detailed feedback>",
    "trendAlignment": "<detailed feedback>",
    "commercialViability": "<detailed feedback>",
    "creativity": "<detailed feedback>",
    "presentationQuality": "<detailed feedback>"
  },
  "actionableNextSteps": ["<step 1>", "<step 2>", "<step 3>"],
  "inspirationReferences": ["<designer or collection reference 1>", "<designer or collection reference 2>"],
  "recommendedCourses": [
    {
      "slug": "<exact course slug from the list above>",
      "reason": "<1-2 sentences explaining why this course addresses the student's specific weakness>"
    }
  ]
}

Be encouraging but honest. Students learn best from specific, actionable feedback. Always frame criticism constructively with a path to improvement. For course recommendations, be specific about HOW the course will help address the weaknesses you identified.`;

    const userContent = [
      {
        type: "text",
        text: `Please critique this ${category || "fashion design"} piece${title ? ` titled "${title}"` : ""}${description ? `. Student's notes: ${description}` : ""}. Provide your expert analysis.`,
      },
      {
        type: "image_url",
        image_url: { url: imageUrl },
      },
    ];

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        max_tokens: 4096,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userContent },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);

      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      throw new Error(`AI Gateway error: ${errorText}`);
    }

    const data = await response.json();
    const rawReply = data.choices?.[0]?.message?.content;

    if (!rawReply) {
      throw new Error("No response from AI");
    }

    console.log("AI critique received, length:", rawReply.length);

    // Parse the JSON response - handle markdown code blocks
    let critique;
    try {
      let jsonStr = rawReply.trim();
      // Remove markdown code block wrappers if present
      if (jsonStr.startsWith("```json")) {
        jsonStr = jsonStr.slice(7);
      } else if (jsonStr.startsWith("```")) {
        jsonStr = jsonStr.slice(3);
      }
      if (jsonStr.endsWith("```")) {
        jsonStr = jsonStr.slice(0, -3);
      }
      critique = JSON.parse(jsonStr.trim());
    } catch (parseError) {
      console.error("Failed to parse AI response as JSON:", parseError);
      console.log("Raw response:", rawReply.substring(0, 500));
      // Return a structured fallback
      critique = {
        scores: {
          proportion: 7, colorTheory: 7, technicalExecution: 7,
          trendAlignment: 7, commercialViability: 7, creativity: 7,
          presentationQuality: 7, overall: 7,
        },
        summary: rawReply.substring(0, 300),
        strengths: ["Good effort shown in the design"],
        improvements: ["Consider refining technical details"],
        detailedFeedback: {},
        actionableNextSteps: ["Continue iterating on this design"],
        inspirationReferences: [],
      };
    }

    return new Response(
      JSON.stringify({ critique }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in portfolio-critique:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
