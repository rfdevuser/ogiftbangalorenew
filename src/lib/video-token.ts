// Video URL service - tokens are generated server-side for security
// The secret never touches the frontend

import { supabase } from "@/integrations/supabase/client";

// Cached signed URL with expiry tracking
let cachedUrl: { url: string; path: string; expiry: number } | null = null;

// Token validity from server: 5 minutes (300 seconds)
const TOKEN_VALIDITY_SECONDS = 300;
// Regenerate buffer: 1 minute before expiry
const REGENERATE_BUFFER_SECONDS = 60;

/**
 * Get a signed video URL from the backend
 * The token is generated server-side so the secret is never exposed
 */
export async function getSignedVideoUrl(videoPath: string): Promise<string> {
  if (!videoPath) {
    return "https://www.w3schools.com/html/mov_bbb.mp4";
  }

  const now = Math.floor(Date.now() / 1000);
  
  // Return cached URL if still valid for this path
  if (cachedUrl && cachedUrl.path === videoPath && cachedUrl.expiry > now + REGENERATE_BUFFER_SECONDS) {
    return cachedUrl.url;
  }

  try {
    const { data, error } = await supabase.functions.invoke('video-serve', {
      body: null,
      method: 'GET',
    });

    // Use query params approach via fetch since invoke doesn't support query params well
    const response = await fetch(
      `https://azfyktcspmhcaqbhozuw.supabase.co/functions/v1/video-serve?path=${encodeURIComponent(videoPath)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error('[video-token] Failed to get signed URL:', response.status);
      throw new Error('Failed to get signed URL');
    }

    const result = await response.json();
    
    // Cache the result
    cachedUrl = {
      url: result.url,
      path: videoPath,
      expiry: now + (result.expiresIn || TOKEN_VALIDITY_SECONDS)
    };

    return result.url;
  } catch (error) {
    console.error('[video-token] Error getting signed URL:', error);
    // Fallback - should not happen in production
    throw error;
  }
}

/**
 * Force refresh the cached URL
 */
export function clearUrlCache(): void {
  cachedUrl = null;
}

/**
 * Get remaining validity time in seconds
 */
export function getUrlRemainingTime(): number {
  if (!cachedUrl) return 0;
  const now = Math.floor(Date.now() / 1000);
  return Math.max(0, cachedUrl.expiry - now);
}

/**
 * Synchronous URL builder for backwards compatibility
 * NOTE: This returns a promise now, update callers accordingly
 */
export const buildSecureVideoUrl = getSignedVideoUrl;
