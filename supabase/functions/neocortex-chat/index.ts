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
const FIRECRAWL_API_KEY = Deno.env.get('FIRECRAWL_API_KEY');
const DEFAULT_PROJECT_ID = 'cm8jsx0750001i803s90qa1co'; // English

// AMY Counsellor Agent ID
const AMY_COUNSELLOR_ID = 'cml2h562w0001la046ykixctc';

// OGIFT website base URL
const OGIFT_BASE_URL = 'https://www.ogiftbangalore.com';

// Cache for website structure (refreshed periodically)
let siteMapCache: { urls: string[]; lastUpdated: number } | null = null;
const SITE_MAP_CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache

// Cache for scraped page content
const pageContentCache: Map<string, { content: string; lastUpdated: number }> = new Map();
const PAGE_CACHE_TTL = 10 * 60 * 1000; // 10 minutes cache

// Function to map OGIFT website and get all URLs
async function mapOgiftWebsite(): Promise<string[]> {
  // Check cache first
  if (siteMapCache && Date.now() - siteMapCache.lastUpdated < SITE_MAP_CACHE_TTL) {
    console.log('Using cached sitemap with', siteMapCache.urls.length, 'URLs');
    return siteMapCache.urls;
  }

  if (!FIRECRAWL_API_KEY) {
    console.error('FIRECRAWL_API_KEY not configured, using static sitemap');
    return getStaticSitemap();
  }

  try {
    console.log('Mapping OGIFT website with Firecrawl...');
    const response = await fetch('https://api.firecrawl.dev/v1/map', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: OGIFT_BASE_URL,
        limit: 100,
        includeSubdomains: false,
      }),
    });

    if (!response.ok) {
      console.error('Firecrawl map error:', response.status);
      return getStaticSitemap();
    }

    const data = await response.json();
    const urls = data.links || data.urls || [];
    
    // Filter to only OGIFT URLs
    const ogiftUrls = urls.filter((url: string) => 
      url.startsWith(OGIFT_BASE_URL) || url.startsWith('https://ogiftbangalore.com')
    );

    console.log('Mapped', ogiftUrls.length, 'OGIFT URLs');
    
    // Update cache
    siteMapCache = { urls: ogiftUrls, lastUpdated: Date.now() };
    
    return ogiftUrls;
  } catch (error) {
    console.error('Error mapping website:', error);
    return getStaticSitemap();
  }
}

// Static sitemap fallback
function getStaticSitemap(): string[] {
  return [
    'https://www.ogiftbangalore.com',
    'https://www.ogiftbangalore.com/about',
    'https://www.ogiftbangalore.com/courses',
    'https://www.ogiftbangalore.com/admissions',
    'https://www.ogiftbangalore.com/contact',
    'https://www.ogiftbangalore.com/gallery',
    'https://www.ogiftbangalore.com/placements',
    'https://www.ogiftbangalore.com/videos',
    'https://www.ogiftbangalore.com/quicktour',
    'https://www.ogiftbangalore.com/courses/fashup-free-taster-sessions',
    'https://www.ogiftbangalore.com/courses/fashion-illustration',
    'https://www.ogiftbangalore.com/courses/pattern-making-basic',
    'https://www.ogiftbangalore.com/courses/six-months-diploma-fashion-designing',
    'https://www.ogiftbangalore.com/courses/one-year-advanced-diploma-fashion-designing',
  ];
}

// Function to find relevant URLs based on user query
function findRelevantUrls(query: string, allUrls: string[]): string[] {
  const lowerQuery = query.toLowerCase();
  const keywords: { [key: string]: string[] } = {
    'course': ['courses', 'diploma', 'certificate', 'training'],
    'admission': ['admission', 'enrol', 'apply', 'register'],
    'fee': ['admission', 'courses', 'fee', 'pricing'],
    'about': ['about', 'institute', 'ogift'],
    'contact': ['contact', 'phone', 'email'],
    'placement': ['placement', 'job', 'career'],
    'gallery': ['gallery', 'photo', 'image'],
    'video': ['video', 'training'],
    'fashion illustration': ['fashion-illustration', 'illustration'],
    'pattern': ['pattern-making', 'pattern'],
    'diploma': ['diploma', 'six-month', 'one-year', 'advanced'],
    'boutique': ['boutique-management', 'boutique'],
    'styling': ['styling', 'fashion-styling'],
    'draping': ['draping', 'drape'],
    'fabric': ['fabric', 'textile'],
    'portfolio': ['portfolio', 'digital-portfolio'],
    'kids': ['kids', 'children'],
    'blouse': ['blouse'],
    'western': ['western'],
    'online': ['online', 'quicktour'],
  };

  const relevantUrls: Set<string> = new Set();
  
  // Always include homepage for context
  relevantUrls.add(OGIFT_BASE_URL);

  // Find matching keywords
  for (const [keyword, patterns] of Object.entries(keywords)) {
    if (lowerQuery.includes(keyword)) {
      for (const url of allUrls) {
        for (const pattern of patterns) {
          if (url.toLowerCase().includes(pattern)) {
            relevantUrls.add(url);
          }
        }
      }
    }
  }

  // If no specific matches, include main pages
  if (relevantUrls.size <= 1) {
    relevantUrls.add(`${OGIFT_BASE_URL}/courses`);
    relevantUrls.add(`${OGIFT_BASE_URL}/about`);
  }

  // Limit to 5 most relevant URLs to avoid overwhelming the context
  return Array.from(relevantUrls).slice(0, 5);
}

// Function to scrape a single page
async function scrapePage(url: string): Promise<string> {
  // Check cache first
  const cached = pageContentCache.get(url);
  if (cached && Date.now() - cached.lastUpdated < PAGE_CACHE_TTL) {
    console.log('Using cached content for:', url);
    return cached.content;
  }

  if (!FIRECRAWL_API_KEY) {
    console.error('FIRECRAWL_API_KEY not configured');
    return '';
  }

  try {
    console.log('Scraping page:', url);
    const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: url,
        formats: ['markdown'],
        onlyMainContent: true,
      }),
    });

    if (!response.ok) {
      console.error('Firecrawl scrape error for', url, ':', response.status);
      return '';
    }

    const data = await response.json();
    const content = data.data?.markdown || data.markdown || '';
    
    // Update cache
    pageContentCache.set(url, { content, lastUpdated: Date.now() });
    
    console.log('Scraped', content.length, 'chars from', url);
    return content;
  } catch (error) {
    console.error('Error scraping page:', url, error);
    return '';
  }
}

// Function to get dynamic OGIFT knowledge based on user query
async function getDynamicOgiftKnowledge(userQuery: string): Promise<string> {
  // Map the website to get all current URLs
  const allUrls = await mapOgiftWebsite();
  
  // Find URLs relevant to the user's query
  const relevantUrls = findRelevantUrls(userQuery, allUrls);
  console.log('Relevant URLs for query:', relevantUrls);

  // Scrape relevant pages in parallel
  const scrapePromises = relevantUrls.map(url => scrapePage(url));
  const pageContents = await Promise.all(scrapePromises);

  // Combine scraped content
  let dynamicContent = '';
  for (let i = 0; i < relevantUrls.length; i++) {
    if (pageContents[i]) {
      dynamicContent += `\n\n## Content from ${relevantUrls[i]}\n${pageContents[i].substring(0, 3000)}`; // Limit each page
    }
  }

  // Create the full knowledge base
  return `
You are Amy, a friendly and knowledgeable counsellor for Onati Global Institute of Fashion Technology (OGIFT), Bangalore's premier fashion design institute.

## YOUR CORE INFORMATION
- Website: https://www.ogiftbangalore.com
- Contact: +91 90369 28799
- Location: Bangalore, Karnataka, India
- Founded: 2024

## AVAILABLE PAGES ON THE WEBSITE
${allUrls.slice(0, 30).map(url => `- ${url}`).join('\n')}

## LIVE WEBSITE CONTENT (Scraped in Real-time)
${dynamicContent || 'No dynamic content available - using cached knowledge.'}

## YOUR ROLE AS AMY
1. Warmly greet students and answer questions about OGIFT
2. Recommend appropriate courses based on student goals, experience, and time availability
3. Provide accurate course information based on the LIVE content scraped from the website
4. **GENERATE PERSONALIZED COURSE PLANS** when students describe their goals or ask for recommendations
5. Guide students to relevant website pages for more information
6. Encourage students to enroll or call +91 90369 28799 for fee details
7. Be encouraging about their fashion career aspirations

## CRITICAL NAVIGATION RULES
**IMPORTANT: DO NOT immediately navigate to pages during normal conversation!**

Your PRIMARY job is to PROVIDE INFORMATION FIRST. Only suggest navigation AFTER you have:
1. Fully answered the user's question with all relevant details
2. Provided comprehensive information about what they asked
3. Explicitly asked the user "Would you like me to take you to this page?" or similar confirmation

**When to actually navigate:**
ONLY include a navigation action [NAVIGATE: URL] when:
- User explicitly says "take me to", "go to", "open", "show me the page", "navigate to"
- User confirms they want to visit a page after you suggested it

## NAVIGATION ACTION FORMAT
When navigation IS appropriate, include this at the END of your response:
[NAVIGATE: URL]

Examples:
- User says "take me to the courses page" → [NAVIGATE: https://www.ogiftbangalore.com/courses]
- User says "yes, open the admission page" → [NAVIGATE: https://www.ogiftbangalore.com/admissions]
`;
}

// Static base knowledge (used as fallback)
const OGIFT_BASE_KNOWLEDGE = `
You are Amy, a friendly and knowledgeable counsellor for Onati Global Institute of Fashion Technology (OGIFT), Bangalore's premier fashion design institute.

## ABOUT OGIFT
- Founded in 2024, located in Bangalore, Karnataka, India
- Vision: To be the leading fashion technology institute in India
- Contact: +91 90369 28799
- Website: https://www.ogiftbangalore.com

## YOUR ROLE AS AMY
1. Warmly greet students and answer questions about OGIFT
2. Recommend appropriate courses based on student goals
3. Guide students to relevant website pages
4. Encourage students to call +91 90369 28799 for details
`;

// Type for student progress records
interface ProgressRecord {
  video_id: string;
  video_title: string;
  progress_percent: number;
  completed: boolean | number;
  last_watched_at: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    const { message, conversationId, projectId, studentContext, ttsOnly } = await req.json();
    
    // Use provided projectId or fall back to default (English)
    const agentProjectId = projectId || DEFAULT_PROJECT_ID;
    
    // Check if this is AMY counsellor
    const isAmyCounsellor = agentProjectId === AMY_COUNSELLOR_ID;
    
    console.log('Project ID:', agentProjectId);
    console.log('Is AMY Counsellor:', isAmyCounsellor);
    console.log('TTS Only mode:', ttsOnly ? 'YES' : 'NO');

    if (!NEOCORTEX_API_KEY) {
      console.error('NEOCORTEX_API_KEY not configured');
      throw new Error('NEOCORTEX_API_KEY not configured');
    }

    // TTS-only mode: Just generate audio for the provided text without calling chat API
    if (ttsOnly && message) {
      console.log('TTS-only: Generating audio for text:', message.substring(0, 50) + '...');
      
      let audioBase64 = null;
      try {
        const audioResponse = await fetch('https://neocortex.link/api/v2/audio/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': NEOCORTEX_API_KEY,
          },
          body: JSON.stringify({
            characterId: agentProjectId,
            message: message,
          }),
        });

        if (audioResponse.ok) {
          const audioBuffer = await audioResponse.arrayBuffer();
          audioBase64 = base64Encode(audioBuffer);
          console.log('TTS audio generated successfully, size:', audioBuffer.byteLength);
        } else {
          console.error('TTS audio generation failed:', audioResponse.status, await audioResponse.text());
        }
      } catch (audioError) {
        console.error('Error generating TTS audio:', audioError);
      }

      // Generate visemes for lipsync
      const visemes = generateVisemes(message);

      return new Response(
        JSON.stringify({
          text: message,
          visemes: visemes,
          audio: audioBase64,
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Regular chat mode
    console.log('Received message:', message);
    console.log('Conversation ID:', conversationId);
    console.log('Student context:', studentContext ? JSON.stringify(studentContext) : 'none');

    // Build the message with student context and OGIFT knowledge for AMY
    let contextualMessage = message;
    
    // For AMY counsellor, always include OGIFT knowledge in the first message
    if (isAmyCounsellor && !conversationId) {
      const studentName = studentContext?.name || 'Student';
      
      // Fetch dynamic OGIFT knowledge by scraping relevant pages
      console.log('Fetching dynamic OGIFT knowledge for query:', message);
      const dynamicKnowledge = await getDynamicOgiftKnowledge(message);
      
      contextualMessage = `[SYSTEM INSTRUCTIONS - FOLLOW THESE CAREFULLY]
${dynamicKnowledge}

[USER CONTEXT]
The user's name is ${studentName}. Address them by name and be warm and helpful.

[USER MESSAGE]
${message}`;
      console.log('Added dynamic OGIFT knowledge context for AMY counsellor');
    } else if (studentContext && !conversationId) {
      // For other agents, add basic student context
      const studentName = studentContext.name || 'Student';
      const studentEmail = studentContext.email || '';
      const studentPhone = studentContext.phone || '';
      const studentId = studentContext.studentId || '';
      
      let contextParts = [`The user's name is ${studentName}`];
      if (studentId) contextParts.push(`their student ID is ${studentId}`);
      if (studentEmail) contextParts.push(`their email is ${studentEmail}`);
      if (studentPhone) contextParts.push(`their phone number is ${studentPhone}`);
      
      // Add video progress context
      if (studentContext.progress && Array.isArray(studentContext.progress)) {
        const progressArr: ProgressRecord[] = studentContext.progress;
        const totalVideos = studentContext.totalVideos || progressArr.length;
        const completedVideos = studentContext.completedVideos || progressArr.filter((p: ProgressRecord) => p.completed).length;
        
        contextParts.push(`they have watched ${progressArr.length} training videos`);
        contextParts.push(`completed ${completedVideos} out of ${totalVideos} videos`);
        
        // Add details about recent videos
        const recentVideos = progressArr
          .sort((a: ProgressRecord, b: ProgressRecord) => new Date(b.last_watched_at).getTime() - new Date(a.last_watched_at).getTime())
          .slice(0, 5);
        
        if (recentVideos.length > 0) {
          const videoSummary = recentVideos.map((v: ProgressRecord) => 
            `"${v.video_title}" (${v.progress_percent}% ${v.completed ? 'completed' : 'in progress'})`
          ).join(', ');
          contextParts.push(`their recent videos are: ${videoSummary}`);
        }
        
        // Identify subjects they've been working on
        const subjects = [...new Set(recentVideos.map((v: ProgressRecord) => {
          // Extract subject/language from video title
          const match = v.video_title.match(/\(([^)]+)\)$/);
          return match ? match[1] : 'Unknown';
        }))];
        if (subjects.length > 0) {
          contextParts.push(`they are studying: ${subjects.join(', ')}`);
        }
      }
      
      const contextString = contextParts.join(', ');
      contextualMessage = `[System context: ${contextString}. You have access to all these details including their learning progress and can reference them when the user asks. Please address them by name when appropriate, be encouraging about their progress, and offer suggestions based on their learning journey.]\n\nUser: ${message}`;
      console.log('Added full student context to message:', contextString);
    }

    // Call Neocortex API v2 for chat with timeout and retry
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000); // 25 second timeout
    
    let neocortexResponse;
    let retryCount = 0;
    const maxRetries = 2;
    
    while (retryCount <= maxRetries) {
      try {
        neocortexResponse = await fetch('https://neocortex.link/api/v2/chat', {
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
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);
        
        if (neocortexResponse.ok) {
          break; // Success, exit retry loop
        }
        
        const errorText = await neocortexResponse.text();
        console.error(`Neocortex API error (attempt ${retryCount + 1}):`, neocortexResponse.status, errorText);
        
        if (neocortexResponse.status >= 500 && retryCount < maxRetries) {
          retryCount++;
          console.log(`Retrying... attempt ${retryCount + 1}`);
          await new Promise(resolve => setTimeout(resolve, 1000 * retryCount)); // Backoff
          continue;
        }
        
        throw new Error(`Neocortex API error: ${neocortexResponse.status} - ${errorText}`);
      } catch (fetchError) {
        clearTimeout(timeoutId);
        if (fetchError instanceof Error && fetchError.name === 'AbortError') {
          console.error(`Request timeout (attempt ${retryCount + 1})`);
          if (retryCount < maxRetries) {
            retryCount++;
            console.log(`Retrying after timeout... attempt ${retryCount + 1}`);
            continue;
          }
          throw new Error('Neocortex API timeout - please try again');
        }
        throw fetchError;
      }
    }
    
    if (!neocortexResponse || !neocortexResponse.ok) {
      throw new Error('Failed to get response from Neocortex API after retries');
    }

    const data = await neocortexResponse.json();
    console.log('Neocortex response:', JSON.stringify(data));

    // Extract the response text - v2 API returns response directly
    let responseText = data.response || data.message || data.text || 'I apologize, but I could not generate a response.';
    const newConversationId = data.sessionId || conversationId;
    let action = data.action || null;

    // Handle navigation actions for AMY
    if (isAmyCounsellor) {
      const lowerMessage = message.toLowerCase();
      
      // Detect navigation intent from user message keywords
      const navigationPhrases = ['go to', 'take me to', 'show me', 'open', 'navigate to', 'visit', 'see the', 'view the', 'check out'];
      const hasNavigationIntent = navigationPhrases.some(phrase => lowerMessage.includes(phrase));
      
      // Check if Neocortex returned a navigation action OR user has navigation intent
      if (action === 'GOTO_WEBSITE' || action === 'NAVIGATE' || hasNavigationIntent) {
        let targetUrl: string | null = null;
        
        // ===== COMPREHENSIVE OGIFT PAGE MAPPINGS =====
        
        // Main Pages
        if (lowerMessage.includes('home') || lowerMessage.includes('main page') || lowerMessage.includes('homepage')) {
          targetUrl = 'https://www.ogiftbangalore.com';
        } else if (lowerMessage.includes('about') || lowerMessage.includes('institute') || lowerMessage.includes('who are') || lowerMessage.includes('company')) {
          targetUrl = 'https://www.ogiftbangalore.com/about';
        } else if (lowerMessage.includes('admission') || lowerMessage.includes('enrol') || lowerMessage.includes('apply') || lowerMessage.includes('join') || lowerMessage.includes('register') || lowerMessage.includes('sign up')) {
          targetUrl = 'https://www.ogiftbangalore.com/admissions';
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('call') || lowerMessage.includes('phone') || lowerMessage.includes('reach')) {
          targetUrl = 'https://www.ogiftbangalore.com/contact';
        } else if (lowerMessage.includes('placement') || lowerMessage.includes('job') || lowerMessage.includes('career') || lowerMessage.includes('employment')) {
          targetUrl = 'https://www.ogiftbangalore.com/placements';
        } else if (lowerMessage.includes('gallery') || lowerMessage.includes('photo') || lowerMessage.includes('image') || lowerMessage.includes('picture')) {
          targetUrl = 'https://www.ogiftbangalore.com/gallery';
        } else if ((lowerMessage.includes('video') || lowerMessage.includes('training video')) && !lowerMessage.includes('portfolio')) {
          targetUrl = 'https://www.ogiftbangalore.com/videos';
        } else if (lowerMessage.includes('tour') || lowerMessage.includes('quick tour') || lowerMessage.includes('quicktour') || lowerMessage.includes('online course demo')) {
          targetUrl = 'https://www.ogiftbangalore.com/quicktour';
        } else if (lowerMessage.includes('online course') || lowerMessage.includes('online program')) {
          targetUrl = 'https://www.ogiftbangalore.com/courses/onlinecourse';
        }
        
        // ===== SPECIFIC COURSE PAGES =====
        
        // FREE Course
        else if (lowerMessage.includes('fashup') || lowerMessage.includes('free taster') || lowerMessage.includes('free session') || lowerMessage.includes('taster session')) {
          targetUrl = 'https://www.ogiftbangalore.com/courses/fashup-free-taster-sessions';
        }
        
        // Express Mastery Month (1 Month) Courses
        else if (lowerMessage.includes('fashion illustration') || lowerMessage.includes('illustration course')) {
          targetUrl = 'https://www.ogiftbangalore.com/courses/fashion-illustration';
        } else if (lowerMessage.includes('pattern making basic') || lowerMessage.includes('basic pattern') || (lowerMessage.includes('pattern') && lowerMessage.includes('basic'))) {
          targetUrl = 'https://www.ogiftbangalore.com/courses/pattern-making-basic';
        } else if (lowerMessage.includes('blouse') || lowerMessage.includes('pattern making blouse') || lowerMessage.includes('blouses advanced')) {
          targetUrl = 'https://www.ogiftbangalore.com/courses/pattern-making-blouses-advanced';
        } else if (lowerMessage.includes('western') || lowerMessage.includes('pattern making western') || lowerMessage.includes('western advanced')) {
          targetUrl = 'https://www.ogiftbangalore.com/courses/pattern-making-western-advanced';
        } else if (lowerMessage.includes('garment foundation') || lowerMessage.includes('art of garment') || lowerMessage.includes('sewing technique')) {
          targetUrl = 'https://www.ogiftbangalore.com/courses/art-of-garment-foundation';
        } else if (lowerMessage.includes('fabric knowledge') || lowerMessage.includes('textile design') || lowerMessage.includes('textile course') || lowerMessage.includes('fabric science')) {
          targetUrl = 'https://www.ogiftbangalore.com/courses/fabric-knowledge-textile-designing';
        } else if (lowerMessage.includes('draping') || lowerMessage.includes('drape technology') || lowerMessage.includes('muslin')) {
          targetUrl = 'https://www.ogiftbangalore.com/courses/draping-technology';
        } else if (lowerMessage.includes('digital portfolio') || lowerMessage.includes('portfolio making') || lowerMessage.includes('portfolio course')) {
          targetUrl = 'https://www.ogiftbangalore.com/courses/digital-portfolio-making';
        } else if (lowerMessage.includes('graphic design') || lowerMessage.includes('fashion branding') || lowerMessage.includes('graphic for fashion')) {
          targetUrl = 'https://www.ogiftbangalore.com/courses/graphic-designing-for-fashion';
        } else if (lowerMessage.includes('boutique management') || lowerMessage.includes('boutique course') || lowerMessage.includes('fashion business') || lowerMessage.includes('retail')) {
          targetUrl = 'https://www.ogiftbangalore.com/courses/fashion-designing-boutique-management';
        } else if (lowerMessage.includes('fashion styling') || lowerMessage.includes('styling course') || lowerMessage.includes('stylist') || lowerMessage.includes('wardrobe')) {
          targetUrl = 'https://www.ogiftbangalore.com/courses/fashion-styling';
        } else if (lowerMessage.includes('kids clothing') || lowerMessage.includes('kids pattern') || lowerMessage.includes('children') || lowerMessage.includes('pattern making kids')) {
          targetUrl = 'https://www.ogiftbangalore.com/courses/pattern-making-kids-clothing';
        }
        
        // 3-Month Capsule Courses
        else if (lowerMessage.includes('pmbm') || (lowerMessage.includes('pattern making') && lowerMessage.includes('boutique') && lowerMessage.includes('3 month'))) {
          targetUrl = 'https://www.ogiftbangalore.com/courses/pattern-making-boutique-management-3months';
        } else if (lowerMessage.includes('dppm') || (lowerMessage.includes('design process') && lowerMessage.includes('pattern') && lowerMessage.includes('3 month'))) {
          targetUrl = 'https://www.ogiftbangalore.com/courses/design-process-pattern-making-3months';
        } else if (lowerMessage.includes('dppmp') || (lowerMessage.includes('design') && lowerMessage.includes('portfolio') && lowerMessage.includes('3 month'))) {
          targetUrl = 'https://www.ogiftbangalore.com/courses/design-pattern-making-portfolio-3months';
        } else if (lowerMessage.includes('capsule') || lowerMessage.includes('3 month') || lowerMessage.includes('three month') || lowerMessage.includes('short certificate')) {
          targetUrl = 'https://www.ogiftbangalore.com/courses/pattern-making-boutique-management-3months';
        }
        
        // Diploma Programs
        else if (lowerMessage.includes('six month diploma') || lowerMessage.includes('6 month diploma') || lowerMessage.includes('6 months diploma') || lowerMessage.includes('half year diploma')) {
          targetUrl = 'https://www.ogiftbangalore.com/courses/six-months-diploma-fashion-designing';
        } else if (lowerMessage.includes('one year') || lowerMessage.includes('1 year') || lowerMessage.includes('advanced diploma') || lowerMessage.includes('year diploma')) {
          targetUrl = 'https://www.ogiftbangalore.com/courses/one-year-advanced-diploma-fashion-designing';
        } else if (lowerMessage.includes('diploma') && !lowerMessage.includes('advanced')) {
          targetUrl = 'https://www.ogiftbangalore.com/courses/six-months-diploma-fashion-designing';
        }
        
        // General Courses page (fallback for generic course queries)
        else if (lowerMessage.includes('course') || lowerMessage.includes('program') || lowerMessage.includes('all course') || lowerMessage.includes('list of course')) {
          targetUrl = 'https://www.ogiftbangalore.com/courses';
        }
        
        // Only set action if we found a matching URL
        if (targetUrl) {
          action = {
            type: 'navigate',
            url: targetUrl
          };
          console.log('Detected navigation intent, mapped to URL:', targetUrl);
        }
      }
      
      // Also parse [NAVIGATE: URL] pattern from response text if present
      const navigateMatch = responseText.match(/\[NAVIGATE:\s*(https?:\/\/[^\]]+)\]/i);
      if (navigateMatch) {
        action = {
          type: 'navigate',
          url: navigateMatch[1].trim()
        };
        // Remove the navigation marker from displayed text
        responseText = responseText.replace(/\[NAVIGATE:\s*https?:\/\/[^\]]+\]/gi, '').trim();
        console.log('Parsed navigation action from text:', action);
      }
    }

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
