import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, X, Send, Mic, MicOff, Volume2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const FloatingAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! नमस्ते! I\'m your virtual assistant for Onati Global Institute. You can speak to me in English or Hindi. How can I help you learn about our fashion design courses today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize speech recognition with Indian English and Kannada support
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-IN'; // Indian English with Kannada support

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast({
          title: 'Speech Recognition Error',
          description: 'Could not recognize speech. Please try again.',
          variant: 'destructive',
        });
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [toast]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const speakText = (audioBase64: string) => {
    if (!audioBase64) return;
    
    stopSpeaking();
    
    // Convert base64 to audio blob and play
    const audioData = atob(audioBase64);
    const arrayBuffer = new ArrayBuffer(audioData.length);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i < audioData.length; i++) {
      view[i] = audioData.charCodeAt(i);
    }
    
    const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' });
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    
    setIsSpeaking(true);
    
    audio.onended = () => {
      URL.revokeObjectURL(url);
      setIsSpeaking(false);
    };
    
    audio.onerror = () => {
      URL.revokeObjectURL(url);
      setIsSpeaking(false);
    };
    
    audio.play();
  };

  const stopSpeaking = () => {
    // Stop any currently playing audio
    const audios = document.getElementsByTagName('audio');
    for (let i = 0; i < audios.length; i++) {
      audios[i].pause();
      audios[i].currentTime = 0;
    }
    setIsSpeaking(false);
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      if (recognitionRef.current) {
        setIsListening(true);
        recognitionRef.current.start();
      } else {
        toast({
          title: 'Not Supported',
          description: 'Speech recognition is not supported in your browser.',
          variant: 'destructive',
        });
      }
    }
  };

  const sendMessage = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim() || isLoading) return;

    stopSpeaking();

    const userMessage: Message = { role: 'user', content: messageText };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat-assistant', {
        body: { message: messageText },
      });

      if (error) throw error;

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.reply,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      
      // Automatically speak the response with Indian female voice
      if (data.audioContent) {
        speakText(data.audioContent);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg bg-gradient-to-br from-primary to-accent hover:shadow-xl transition-all duration-300 z-50"
          size="icon"
        >
          <MessageCircle className="h-8 w-8 text-primary-foreground" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-2xl z-50 flex flex-col overflow-hidden border-2 border-primary/20">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-accent p-4 text-primary-foreground flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Onati AI Assistant</h3>
                <p className="text-xs opacity-90">English | हिंदी | ಕನ್ನಡ</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setIsOpen(false);
                stopSpeaking();
              }}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="flex items-center space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question..."
                  disabled={isLoading || isListening}
                  className="flex-1"
                />
                <Button
                  type="button"
                  size="icon"
                  variant={isListening ? 'destructive' : 'secondary'}
                  onClick={toggleListening}
                  disabled={isLoading}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                {isSpeaking && (
                  <Button
                    type="button"
                    size="icon"
                    variant="secondary"
                    onClick={stopSpeaking}
                  >
                    <Volume2 className="h-4 w-4 animate-pulse" />
                  </Button>
                )}
                <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              {isListening && (
                <p className="text-xs text-muted-foreground text-center animate-pulse">
                  Listening... Speak now
                </p>
              )}
            </form>
          </div>
        </Card>
      )}
    </>
  );
};

export default FloatingAssistant;
