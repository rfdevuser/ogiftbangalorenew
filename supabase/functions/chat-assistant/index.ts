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
    const { message } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are a helpful AI assistant for Onati Global Institute of Fashion Technology, a premier fashion design institute in Bangalore, India.

LANGUAGE SUPPORT:
- You can communicate fluently in English, Hindi, and understand Kannada
- When users speak or write in Hindi, respond naturally in Hindi
- Maintain a warm, friendly tone suitable for a young Indian female from Bangalore

INSTITUTE INFORMATION:
- Location: No 4 5th Main 1st Cross B Block, 4th Main Vinayakanagar, Bengaluru, Karnataka 560017
- Contact: +91 90369 28799
- Email: admissions@ogiftbangalore.com
- Established: 2010
- Placement Rate: 100%
- Average Package: ₹4.5 Lakhs per annum

COURSES OFFERED:
1. Fashion Design (3 Years Diploma) - Comprehensive program covering sketching, pattern making, draping, and garment construction
2. Garment Technology (2 Years Advanced Diploma) - Technical program focusing on production planning and quality control
3. Fashion Styling (1 Year Certificate) - Personal styling, editorial fashion, wardrobe management
4. Textile Design (2 Years Diploma) - Surface design, print techniques, fabric manipulation
5. Fashion Illustration (6 Months Certificate) - Fashion drawing and digital rendering
6. Fashion Business Management (1 Year Advanced Certificate) - Marketing, retail management, entrepreneurship

FACILITIES:
- Modern design studios with professional equipment
- Computer labs with latest CAD software
- Textile testing and fabric manipulation facilities
- Industry partnerships with 50+ fashion brands

PLACEMENTS:
- 100% placement record for last 3 years
- Alumni placed at: Fabindia, Myntra, Raymond, Westside, Pantaloons, W, AND, Vero Moda, Lifestyle, Shoppers Stop, Max Fashion, Zara, H&M, and more
- Comprehensive career support including resume building, interview prep, and campus placements

FACULTY:
- 20+ experienced industry professionals
- Average 15+ years of experience
- Award-winning designers and stylists

Your role is to:
- Answer questions about courses, admissions, facilities, placements, and fees in the user's preferred language
- Provide helpful information about the institute with a friendly, enthusiastic tone
- Encourage prospective students to visit campus or contact admissions
- Be professional yet warm, reflecting the personality of a young Indian woman from Bangalore
- Keep responses concise but informative (2-3 paragraphs maximum)
- Switch seamlessly between English and Hindi based on user's language choice

If asked about something not related to the institute, politely redirect the conversation back to how you can help with their fashion education journey.`;

    console.log("Calling AI Gateway with message:", message);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      throw new Error(`AI Gateway error: ${errorText}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;

    if (!reply) {
      throw new Error("No response from AI");
    }

    console.log("AI response:", reply);

    // Generate audio using OpenAI TTS with Indian female voice
    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    
    if (OPENAI_API_KEY) {
      try {
        const ttsResponse = await fetch('https://api.openai.com/v1/audio/speech', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'tts-1',
            input: reply,
            voice: 'nova', // Nova is a warm, engaging female voice
            response_format: 'mp3',
          }),
        });

        if (ttsResponse.ok) {
          // Convert audio to base64
          const arrayBuffer = await ttsResponse.arrayBuffer();
          // Convert ArrayBuffer to base64 in chunks to avoid call stack overflow
          const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
            const bytes = new Uint8Array(buffer);
            let binary = "";
            const chunkSize = 0x8000; // 32KB
            for (let i = 0; i < bytes.length; i += chunkSize) {
              const chunk = bytes.subarray(i, Math.min(i + chunkSize, bytes.length));
              binary += String.fromCharCode(...chunk);
            }
            return btoa(binary);
          };
          const base64Audio = arrayBufferToBase64(arrayBuffer);

          return new Response(
            JSON.stringify({ reply, audioContent: base64Audio }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        } else {
          console.error('TTS error:', await ttsResponse.text());
        }
      } catch (ttsError) {
        console.error('TTS generation failed:', ttsError);
      }
    }

    // Return text without audio if TTS fails
    return new Response(
      JSON.stringify({ reply }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in chat-assistant:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
