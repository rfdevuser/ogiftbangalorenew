import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { encode as base64Encode } from "https://deno.land/std@0.168.0/encoding/base64.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Max-Age': '86400',
  'Vary': 'Origin',
};

const NEOCORTEX_API_KEY = Deno.env.get('NEOCORTEX_API_KEY');
const DEFAULT_PROJECT_ID = 'cm8jsx0750001i803s90qa1co'; // English

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    const { message, conversationId, projectId, studentContext } = await req.json();
    
    // Use provided projectId or fall back to default (English)
    const agentProjectId = projectId || DEFAULT_PROJECT_ID;
    
    console.log('Received message:', message);
    console.log('Conversation ID:', conversationId);
    console.log('Project ID:', agentProjectId);
    console.log('Student context:', studentContext ? JSON.stringify(studentContext) : 'none');

    if (!NEOCORTEX_API_KEY) {
      console.error('NEOCORTEX_API_KEY not configured');
      throw new Error('NEOCORTEX_API_KEY not configured');
    }

    // Build the message with student context for personalization
    let contextualMessage = message;
    if (studentContext && !conversationId) {
      // Only add context at the start of conversation - include all available student details
      const studentName = studentContext.name || 'Student';
      const studentEmail = studentContext.email || '';
      const studentPhone = studentContext.phone || '';
      const studentId = studentContext.studentId || '';
      
      let contextParts = [`The user's name is ${studentName}`];
      if (studentId) contextParts.push(`their student ID is ${studentId}`);
      if (studentEmail) contextParts.push(`their email is ${studentEmail}`);
      if (studentPhone) contextParts.push(`their phone number is ${studentPhone}`);
      
      const contextString = contextParts.join(', ');
      contextualMessage = `[System context: ${contextString}. You have access to all these details and can reference them when the user asks. Please address them by name when appropriate and be friendly.]\n\nUser: ${message}`;
      console.log('Added full student context to message:', contextString);
    }

    // Call Neocortex API v2 for chat
    const neocortexResponse = await fetch('https://neocortex.link/api/v2/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': NEOCORTEX_API_KEY,
      },
      body: JSON.stringify({
        characterId: agentProjectId,
        message: contextualMessage,
        sessionId: conversationId || undefined,
      }),
    });

    if (!neocortexResponse.ok) {
      const errorText = await neocortexResponse.text();
      console.error('Neocortex API error:', neocortexResponse.status, errorText);
      throw new Error(`Neocortex API error: ${neocortexResponse.status} - ${errorText}`);
    }

    const data = await neocortexResponse.json();
    console.log('Neocortex response:', JSON.stringify(data));

    // Extract the response text - v2 API returns response directly
    const responseText = data.response || data.message || data.text || 'I apologize, but I could not generate a response.';
    const newConversationId = data.sessionId || conversationId;
    const action = data.action || null;

    // Generate audio using Neocortex TTS
    let audioBase64 = null;
    try {
      console.log('Generating speech for text:', responseText.substring(0, 50) + '...');
      
      const audioResponse = await fetch('https://neocortex.link/api/v2/audio/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': NEOCORTEX_API_KEY,
        },
        body: JSON.stringify({
          characterId: agentProjectId,
          message: responseText,
        }),
      });

      if (audioResponse.ok) {
        const audioBuffer = await audioResponse.arrayBuffer();
        audioBase64 = base64Encode(audioBuffer);
        console.log('Audio generated successfully, size:', audioBuffer.byteLength);
      } else {
        console.error('Audio generation failed:', audioResponse.status, await audioResponse.text());
      }
    } catch (audioError) {
      console.error('Error generating audio:', audioError);
    }

    // Generate visemes for lipsync based on the response text
    const visemes = generateVisemes(responseText);

    return new Response(
      JSON.stringify({
        text: responseText,
        conversationId: newConversationId,
        visemes: visemes,
        audio: audioBase64,
        action: action,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error in neocortex-chat function:', errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

// Devanagari (Hindi) character to viseme mapping
const hindiCharToViseme: { [key: string]: string } = {
  // Vowels (स्वर)
  'अ': 'viseme_aa', 'आ': 'viseme_aa', 'इ': 'viseme_I', 'ई': 'viseme_I',
  'उ': 'viseme_U', 'ऊ': 'viseme_U', 'ए': 'viseme_E', 'ऐ': 'viseme_E',
  'ओ': 'viseme_O', 'औ': 'viseme_O', 'ऋ': 'viseme_RR',
  // Vowel matras
  'ा': 'viseme_aa', 'ि': 'viseme_I', 'ी': 'viseme_I', 'ु': 'viseme_U',
  'ू': 'viseme_U', 'े': 'viseme_E', 'ै': 'viseme_E', 'ो': 'viseme_O',
  'ौ': 'viseme_O', 'ृ': 'viseme_RR',
  // Consonants (व्यंजन)
  'क': 'viseme_kk', 'ख': 'viseme_kk', 'ग': 'viseme_kk', 'घ': 'viseme_kk', 'ङ': 'viseme_nn',
  'च': 'viseme_CH', 'छ': 'viseme_CH', 'ज': 'viseme_CH', 'झ': 'viseme_CH', 'ञ': 'viseme_nn',
  'ट': 'viseme_DD', 'ठ': 'viseme_DD', 'ड': 'viseme_DD', 'ढ': 'viseme_DD', 'ण': 'viseme_nn',
  'त': 'viseme_DD', 'थ': 'viseme_TH', 'द': 'viseme_DD', 'ध': 'viseme_DD', 'न': 'viseme_nn',
  'प': 'viseme_PP', 'फ': 'viseme_FF', 'ब': 'viseme_PP', 'भ': 'viseme_PP', 'म': 'viseme_PP',
  'य': 'viseme_I', 'र': 'viseme_RR', 'ल': 'viseme_nn', 'व': 'viseme_FF',
  'श': 'viseme_SS', 'ष': 'viseme_SS', 'स': 'viseme_SS', 'ह': 'viseme_aa',
  // Special characters
  'ं': 'viseme_nn', 'ः': 'viseme_aa', '्': 'viseme_sil', 'ँ': 'viseme_nn',
  // Nukta consonants
  'क़': 'viseme_kk', 'ख़': 'viseme_kk', 'ग़': 'viseme_kk', 'ज़': 'viseme_SS',
  'ड़': 'viseme_RR', 'ढ़': 'viseme_RR', 'फ़': 'viseme_FF',
};

// Kannada character to viseme mapping
const kannadaCharToViseme: { [key: string]: string } = {
  // Vowels (ಸ್ವರಗಳು)
  'ಅ': 'viseme_aa', 'ಆ': 'viseme_aa', 'ಇ': 'viseme_I', 'ಈ': 'viseme_I',
  'ಉ': 'viseme_U', 'ಊ': 'viseme_U', 'ಋ': 'viseme_RR', 'ೠ': 'viseme_RR',
  'ಎ': 'viseme_E', 'ಏ': 'viseme_E', 'ಐ': 'viseme_E',
  'ಒ': 'viseme_O', 'ಓ': 'viseme_O', 'ಔ': 'viseme_O',
  // Vowel matras
  'ಾ': 'viseme_aa', 'ಿ': 'viseme_I', 'ೀ': 'viseme_I', 'ು': 'viseme_U',
  'ೂ': 'viseme_U', 'ೃ': 'viseme_RR', 'ೆ': 'viseme_E', 'ೇ': 'viseme_E',
  'ೈ': 'viseme_E', 'ೊ': 'viseme_O', 'ೋ': 'viseme_O', 'ೌ': 'viseme_O',
  // Consonants (ವ್ಯಂಜನಗಳು)
  'ಕ': 'viseme_kk', 'ಖ': 'viseme_kk', 'ಗ': 'viseme_kk', 'ಘ': 'viseme_kk', 'ಙ': 'viseme_nn',
  'ಚ': 'viseme_CH', 'ಛ': 'viseme_CH', 'ಜ': 'viseme_CH', 'ಝ': 'viseme_CH', 'ಞ': 'viseme_nn',
  'ಟ': 'viseme_DD', 'ಠ': 'viseme_DD', 'ಡ': 'viseme_DD', 'ಢ': 'viseme_DD', 'ಣ': 'viseme_nn',
  'ತ': 'viseme_DD', 'ಥ': 'viseme_TH', 'ದ': 'viseme_DD', 'ಧ': 'viseme_DD', 'ನ': 'viseme_nn',
  'ಪ': 'viseme_PP', 'ಫ': 'viseme_FF', 'ಬ': 'viseme_PP', 'ಭ': 'viseme_PP', 'ಮ': 'viseme_PP',
  'ಯ': 'viseme_I', 'ರ': 'viseme_RR', 'ಱ': 'viseme_RR', 'ಲ': 'viseme_nn', 'ಳ': 'viseme_nn',
  'ವ': 'viseme_FF', 'ಶ': 'viseme_SS', 'ಷ': 'viseme_SS', 'ಸ': 'viseme_SS', 'ಹ': 'viseme_aa',
  // Special characters
  'ಂ': 'viseme_nn', 'ಃ': 'viseme_aa', '್': 'viseme_sil',
};

// English phoneme to viseme mapping
const englishPhonemeToViseme: { [key: string]: string } = {
  'a': 'viseme_aa', 'e': 'viseme_E', 'i': 'viseme_I', 'o': 'viseme_O', 'u': 'viseme_U',
  'b': 'viseme_PP', 'p': 'viseme_PP', 'm': 'viseme_PP',
  'f': 'viseme_FF', 'v': 'viseme_FF',
  'th': 'viseme_TH',
  'd': 'viseme_DD', 't': 'viseme_DD',
  'n': 'viseme_nn', 'l': 'viseme_nn',
  'k': 'viseme_kk', 'g': 'viseme_kk',
  'ch': 'viseme_CH', 'j': 'viseme_CH',
  'sh': 'viseme_SS', 's': 'viseme_SS', 'z': 'viseme_SS',
  'r': 'viseme_RR',
  'w': 'viseme_U', 'y': 'viseme_I',
};

// Detect script of text
function detectScript(text: string): 'hindi' | 'kannada' | 'english' {
  // Check for Devanagari (Hindi) - Unicode range 0900-097F
  const hindiRegex = /[\u0900-\u097F]/;
  // Check for Kannada - Unicode range 0C80-0CFF
  const kannadaRegex = /[\u0C80-\u0CFF]/;
  
  if (kannadaRegex.test(text)) return 'kannada';
  if (hindiRegex.test(text)) return 'hindi';
  return 'english';
}

// Generate viseme data for lipsync animation with multi-language support
function generateVisemes(text: string): { viseme: string; time: number; duration: number }[] {
  const visemes: { viseme: string; time: number; duration: number }[] = [];
  const script = detectScript(text);
  
  console.log('Generating visemes for script:', script, 'text sample:', text.substring(0, 30));
  
  let currentTime = 0;
  const charDuration = 0.08; // Duration per character in seconds
  
  if (script === 'hindi') {
    for (const char of text) {
      if (char === ' ' || char === '\n') {
        currentTime += 0.1;
        visemes.push({ viseme: 'viseme_sil', time: currentTime, duration: 0.1 });
        continue;
      }
      
      const viseme = hindiCharToViseme[char] || 'viseme_aa';
      visemes.push({ viseme, time: currentTime, duration: charDuration });
      currentTime += charDuration;
    }
  } else if (script === 'kannada') {
    for (const char of text) {
      if (char === ' ' || char === '\n') {
        currentTime += 0.1;
        visemes.push({ viseme: 'viseme_sil', time: currentTime, duration: 0.1 });
        continue;
      }
      
      const viseme = kannadaCharToViseme[char] || 'viseme_aa';
      visemes.push({ viseme, time: currentTime, duration: charDuration });
      currentTime += charDuration;
    }
  } else {
    // English processing with digraph support
    const cleanText = text.toLowerCase().replace(/[^a-z\s]/g, '');
    
    for (let i = 0; i < cleanText.length; i++) {
      const char = cleanText[i];
      
      if (char === ' ') {
        currentTime += 0.1;
        visemes.push({ viseme: 'viseme_sil', time: currentTime, duration: 0.1 });
        continue;
      }
      
      // Check for digraphs first
      const twoChar = cleanText.substring(i, i + 2);
      let viseme: string | undefined;
      
      if (englishPhonemeToViseme[twoChar]) {
        viseme = englishPhonemeToViseme[twoChar];
        i++; // Skip next character
      } else {
        viseme = englishPhonemeToViseme[char] || 'viseme_sil';
      }
      
      visemes.push({ viseme, time: currentTime, duration: charDuration });
      currentTime += charDuration;
    }
  }
  
  console.log('Generated', visemes.length, 'visemes');
  return visemes;
}
