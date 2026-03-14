import * as React from 'react';
import type { ChatMessage, ChatResponse, NeocortexChatResult, StudentContext } from '@/types/avatar';

const { useState, useCallback } = React;

// Hardcoded Lovable Cloud Supabase credentials for the AI Avatar edge function
const AVATAR_SUPABASE_URL = 'https://azfyktcspmhcaqbhozuw.supabase.co';
const AVATAR_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6ZnlrdGNzcG1oY2FxYmhvenV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxNTg4NDIsImV4cCI6MjA4MTczNDg0Mn0.qvGq90_IQxWjNjKTdqRzFO63DIuSUMCPCiFcA7qG7fM';

export function useNeocortexChat(): NeocortexChatResult {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const sendMessage = useCallback(async (
    message: string, 
    projectId?: string, 
    studentContext?: StudentContext,
    displayMessage?: string // Optional: what to show in chat (defaults to message)
  ): Promise<ChatResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      // Add user message to history (use displayMessage if provided, otherwise use message)
      const userMessage: ChatMessage = { 
        role: 'user', 
        content: displayMessage || message, 
        timestamp: Date.now() 
      };
      // Prevent duplicate messages - check if last message is the same user message
      setMessages(prev => {
        const lastMessage = prev[prev.length - 1];
        if (lastMessage?.role === 'user' && lastMessage?.content === userMessage.content) {
          return prev; // Skip adding duplicate
        }
        return [...prev, userMessage];
      });

      // Call Lovable Cloud edge function directly with full URL
      const response = await fetch(`${AVATAR_SUPABASE_URL}/functions/v1/neocortex-chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AVATAR_SUPABASE_KEY}`,
          'apikey': AVATAR_SUPABASE_KEY,
        },
        body: JSON.stringify({ 
          message,
          conversationId,
          projectId, // Pass projectId for language-specific avatar
          studentContext, // Pass student info for personalization
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Edge function error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();

      if (data?.error) {
        throw new Error(data.error);
      }

      // Update conversation ID if returned
      if (data?.conversationId) {
        setConversationId(data.conversationId);
      }

      // Add assistant message to history
      const assistantMessage: ChatMessage = { 
        role: 'assistant', 
        content: data?.text || '', 
        timestamp: Date.now(),
        visemes: data?.visemes,
      };
      setMessages(prev => [...prev, assistantMessage]);

      return {
        text: data?.text || '',
        visemes: data?.visemes,
        audio: data?.audio,
        action: data?.action,
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Neocortex chat error:', err);
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [conversationId]);

  const clearConversation = useCallback((): void => {
    setConversationId(null);
    setMessages([]);
    setError(null);
  }, []);

  return {
    sendMessage,
    clearConversation,
    isLoading,
    error,
    messages,
    conversationId,
  };
}
