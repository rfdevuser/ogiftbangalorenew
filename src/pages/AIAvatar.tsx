import * as React from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { NeocortexAvatar } from '@/components/NeocortexAvatar';
import { useNeocortexChat } from '@/hooks/useNeocortexChat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mic, MicOff, Trash2, MessageSquare, Globe, LogOut, Coins } from 'lucide-react';
import { toast } from 'sonner';
import type { AvatarRef, AvatarState, LanguageCode, LanguageConfig } from '@/types/avatar';

const { useState, useRef, useCallback, Suspense, useEffect } = React;

// Hardcoded Lovable Cloud Supabase credentials for verify-student edge function
const AVATAR_SUPABASE_URL = 'https://azfyktcspmhcaqbhozuw.supabase.co';
const AVATAR_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6ZnlrdGNzcG1oY2FxYmhvenV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxNTg4NDIsImV4cCI6MjA4MTczNDg0Mn0.qvGq90_IQxWjNjKTdqRzFO63DIuSUMCPCiFcA7qG7fM';

const STORAGE_KEY = 'avatar_student_info';

interface StudentInfo {
  studentId: string;
  name: string;
  email: string;
  phone: string;
}

// Language configurations
const LANGUAGES: LanguageConfig[] = [
  { code: 'en', name: 'English', nativeName: 'English', projectId: 'cm8jsx0750001i803s90qa1co', speechLang: 'en-US' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', projectId: 'cm8v1dqph0001jr03oamsopla', speechLang: 'hi-IN' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', projectId: 'cm8v1kv7f0001jp038ist0bka', speechLang: 'kn-IN' },
];

// Office background component
function OfficeBackground(): React.JSX.Element {
  return (
    <>
      {/* Back wall */}
      <mesh position={[0, 1, -2]} receiveShadow>
        <planeGeometry args={[8, 5]} />
        <meshStandardMaterial color="#e8e4df" />
      </mesh>

      {/* Window frame */}
      <mesh position={[-1.5, 1.5, -1.95]}>
        <boxGeometry args={[1.8, 2.2, 0.1]} />
        <meshStandardMaterial color="#5a4a3a" />
      </mesh>

      {/* Window glass with sky reflection */}
      <mesh position={[-1.5, 1.5, -1.9]}>
        <planeGeometry args={[1.6, 2]} />
        <meshStandardMaterial color="#87ceeb" metalness={0.1} roughness={0.1} transparent opacity={0.8} />
      </mesh>

      {/* Bookshelf */}
      <mesh position={[2, 1.2, -1.8]}>
        <boxGeometry args={[1.2, 2, 0.3]} />
        <meshStandardMaterial color="#8b6914" />
      </mesh>

      {/* Books on shelf */}
      <mesh position={[1.7, 1.8, -1.7]}>
        <boxGeometry args={[0.15, 0.6, 0.2]} />
        <meshStandardMaterial color="#c44536" />
      </mesh>
      <mesh position={[1.9, 1.75, -1.7]}>
        <boxGeometry args={[0.12, 0.5, 0.2]} />
        <meshStandardMaterial color="#2a4d6e" />
      </mesh>
      <mesh position={[2.1, 1.85, -1.7]}>
        <boxGeometry args={[0.14, 0.7, 0.2]} />
        <meshStandardMaterial color="#4a7c59" />
      </mesh>
      <mesh position={[2.3, 1.7, -1.7]}>
        <boxGeometry args={[0.1, 0.4, 0.2]} />
        <meshStandardMaterial color="#9d6b53" />
      </mesh>

      {/* Plant pot */}
      <mesh position={[1.8, 0.3, -1.5]}>
        <cylinderGeometry args={[0.15, 0.12, 0.25, 16]} />
        <meshStandardMaterial color="#6b4423" />
      </mesh>

      {/* Plant leaves */}
      <mesh position={[1.8, 0.6, -1.5]}>
        <sphereGeometry args={[0.25, 8, 8]} />
        <meshStandardMaterial color="#2d5a27" />
      </mesh>

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#c4b8a8" />
      </mesh>
    </>
  );
}

function LoadingFallback(): React.JSX.Element {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#8B7355" />
    </mesh>
  );
}

interface FixedCameraProps {
  position?: [number, number, number];
  target?: [number, number, number];
}

function FixedCamera({ 
  position = [0.2, 1.3, 1.3], 
  target = [0, 0.85, 0] 
}: FixedCameraProps): null {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(position[0], position[1], position[2]);
    camera.lookAt(target[0], target[1], target[2]);
    camera.updateProjectionMatrix();
  }, [camera, position, target]);

  return null;
}

// Chat message typing (kept loose to match hook output)
type ChatRole = string;
type ChatMessage = { role: ChatRole; content: string };

function ChatMessages({
  messages,
  isLoading,
}: {
  messages: ChatMessage[];
  isLoading: boolean;
}): React.JSX.Element {
  return (
    <>
      {messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
          <MessageSquare className="h-12 w-12 mb-4 opacity-50" />
          <p className="text-lg font-medium">Start a conversation</p>
          <p className="text-sm">Type a message and press Enter, or use voice input</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {isLoading && (
        <div className="flex justify-start mt-4">
          <div className="bg-muted rounded-2xl px-4 py-3">
            <div className="flex gap-1">
              <span
                className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce"
                style={{ animationDelay: '0ms' }}
              />
              <span
                className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce"
                style={{ animationDelay: '150ms' }}
              />
              <span
                className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce"
                style={{ animationDelay: '300ms' }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ChatComposer({
  inputMessage,
  setInputMessage,
  onKeyDown,
  onClearConversation,
  onToggleVoiceInput,
  isListening,
  isLoading,
  hasMessages,
}: {
  inputMessage: string;
  setInputMessage: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClearConversation: () => void;
  onToggleVoiceInput: () => void;
  isListening: boolean;
  isLoading: boolean;
  hasMessages: boolean;
}): React.JSX.Element {
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={onClearConversation}
        title="Clear conversation"
        disabled={!hasMessages}
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      <Button
        variant={isListening ? 'destructive' : 'outline'}
        size="icon"
        onClick={onToggleVoiceInput}
        title={isListening ? 'Stop listening' : 'Voice input'}
        disabled={isLoading}
      >
        {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
      </Button>

      <Input
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Type your message and press Enter..."
        disabled={isLoading || isListening}
        className="flex-1"
      />
    </div>
  );
}

function AvatarStage({
  avatarRef,
  onStateChange,
  avatarState,
  heightClass,
  children,
}: {
  avatarRef: React.MutableRefObject<AvatarRef | null>;
  onStateChange: (state: AvatarState) => void;
  avatarState: AvatarState;
  heightClass: string;
  children?: React.ReactNode;
}): React.JSX.Element {
  return (
    <div className={`${heightClass} relative`}>
      <Canvas camera={{ position: [0.2, 1.3, 1.3], fov: 28, near: 0.1, far: 50 }} shadows>
        <FixedCamera position={[0.2, 1.3, 1.3]} target={[0, 0.85, 0]} />

        <ambientLight intensity={0.75} />
        <directionalLight castShadow shadow-mapSize={[1024, 1024]} />
        <spotLight position={[-3, 3, 3]} angle={0.4} penumbra={1} intensity={0.6} />
        <pointLight position={[0, 2, 2]} intensity={0.35} />

        <Suspense fallback={<LoadingFallback />}>
          <OfficeBackground />
          <NeocortexAvatar
            ref={avatarRef}
            position={[0, -0.5, 0]}
            rotation={[0, 0.15, 0]}
            scale={1}
            onStateChange={onStateChange}
          />
        </Suspense>

        <Environment preset="apartment" />
      </Canvas>

      {/* State indicator */}
      <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
        <span
          className={`w-2 h-2 rounded-full ${
            avatarState === 'talking'
              ? 'bg-green-500 animate-pulse'
              : avatarState === 'listening'
                ? 'bg-yellow-500 animate-pulse'
                : 'bg-gray-400'
          }`}
        />
        {avatarState === 'talking' ? 'Speaking' : avatarState === 'listening' ? 'Listening' : 'Ready'}
      </div>

      {children}
    </div>
  );
}

// Get SpeechRecognition type from window
type SpeechRecognitionType = NonNullable<typeof window.SpeechRecognition> extends new () => infer R ? R : never;

export default function AIAvatar(): React.JSX.Element {
  const navigate = useNavigate();
  const avatarRef = useRef<AvatarRef>(null);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [avatarState, setAvatarState] = useState<AvatarState>('idle');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>('en');
  const [student, setStudent] = useState<StudentInfo | null>(null);
  const [credits, setCredits] = useState<number | null>(null);
  const [creditsLoading, setCreditsLoading] = useState<boolean>(false);
  const recognitionRef = useRef<SpeechRecognitionType | null>(null);

  const { sendMessage, isLoading, messages, clearConversation } = useNeocortexChat();

  // Fetch student credits using hardcoded credentials
  const fetchCredits = useCallback(async (studentId: string) => {
    setCreditsLoading(true);
    try {
      console.log('Fetching credits for student:', studentId);
      const response = await fetch(`${AVATAR_SUPABASE_URL}/functions/v1/verify-student`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AVATAR_SUPABASE_KEY}`,
          'apikey': AVATAR_SUPABASE_KEY,
        },
        body: JSON.stringify({ studentId, action: 'get_credits' }),
      });
      
      const data = await response.json();
      console.log('Credits response:', data);
      
      if (!response.ok) {
        console.error('Credits fetch error:', data);
        setCredits(0);
      } else if (data?.credits !== undefined) {
        setCredits(Number(data.credits));
      } else {
        console.warn('Credits data missing in response:', data);
        setCredits(0);
      }
    } catch (err) {
      console.error('Failed to fetch credits:', err);
      setCredits(0);
    } finally {
      setCreditsLoading(false);
    }
  }, []);

  // Check authentication on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedStudent = JSON.parse(stored);
        if (parsedStudent && parsedStudent.studentId) {
          setStudent(parsedStudent);
          fetchCredits(parsedStudent.studentId);
        } else {
          // Not logged in, redirect to login
          navigate('/ai-avatar');
        }
      } else {
        // Not logged in, redirect to login
        navigate('/ai-avatar');
      }
    } catch {
      navigate('/ai-avatar');
    }
  }, [navigate, fetchCredits]);

  // Get current language config
  const currentLanguage = LANGUAGES.find(l => l.code === selectedLanguage) || LANGUAGES[0];

  // Handle language change
  const handleLanguageChange = useCallback((langCode: LanguageCode): void => {
    if (langCode !== selectedLanguage) {
      setSelectedLanguage(langCode);
      clearConversation();
      avatarRef.current?.stopTalking();
      const lang = LANGUAGES.find(l => l.code === langCode);
      toast.success(`Language changed to ${lang?.name || langCode}`);
    }
  }, [selectedLanguage, clearConversation]);

  // Handle logout
  const handleLogout = useCallback((): void => {
    clearConversation();
    avatarRef.current?.stopTalking();
    localStorage.removeItem(STORAGE_KEY);
    setStudent(null);
    toast.success('Logged out successfully');
    navigate('/ai-avatar');
  }, [clearConversation, navigate]);

  const handleSendMessage = useCallback(
    async (messageToSend?: string): Promise<void> => {
      const message = messageToSend || inputMessage.trim();
      if (!message || isLoading) return;

      setInputMessage('');

      try {
        // Set avatar to listening while processing
        avatarRef.current?.setListening();

        // Pass student context for personalization
        const studentContext = student ? {
          name: student.name,
          email: student.email,
          phone: student.phone,
          studentId: student.studentId,
        } : undefined;

        const response = await sendMessage(message, currentLanguage.projectId, studentContext);

        // Handle GOTO_WEBSITE action (action can be a string or object with type)
        const actionType = typeof response?.action === 'string' ? response.action : response?.action?.type;
        if (actionType === 'GOTO_WEBSITE') {
          window.open('https://www.ogiftbangalore.com', '_blank');
        }

        if (response?.text) {
          // Estimate duration for fallback mode
          const wordCount = response.text.split(/\s+/).length;
          const estimatedDuration = wordCount / 2.5;

          // Prefer backend-provided visemes (more accurate), fallback to text mapping
          const lipsyncInput =
            Array.isArray(response.visemes) && response.visemes.length > 0 
              ? response.visemes 
              : response.text;

          avatarRef.current?.startTalking(lipsyncInput, estimatedDuration);

          // Use Neocortex-generated audio if available, fallback to browser TTS
          if (response.audio) {
            try {
              const audioUrl = `data:audio/mpeg;base64,${response.audio}`;
              const audio = new Audio(audioUrl);
              audio.onended = () => setTimeout(() => avatarRef.current?.stopTalking(), 250);
              audio.onerror = () => {
                console.error('Audio playback error');
                avatarRef.current?.stopTalking();
              };
              await audio.play();
            } catch (audioError) {
              console.error('Failed to play Neocortex audio:', audioError);
              // Fallback to browser TTS
              if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(response.text);
                utterance.rate = 1;
                utterance.pitch = 1;
                utterance.onend = () => setTimeout(() => avatarRef.current?.stopTalking(), 250);
                utterance.onerror = () => avatarRef.current?.stopTalking();
                window.speechSynthesis.speak(utterance);
              }
            }
          } else if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(response.text);
            utterance.rate = 1;
            utterance.pitch = 1;
            utterance.onend = () => setTimeout(() => avatarRef.current?.stopTalking(), 250);
            utterance.onerror = () => avatarRef.current?.stopTalking();
            window.speechSynthesis.speak(utterance);
          }
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        toast.error('Failed to get response: ' + errorMessage);
        avatarRef.current?.stopTalking();
      }
    },
    [inputMessage, isLoading, sendMessage, currentLanguage.projectId, student]
  );

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  const toggleVoiceInput = useCallback((): void => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognitionAPI) {
      toast.error('Speech recognition is not supported in your browser');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognitionRef.current = recognition;

    recognition.continuous = true; // Keep listening for slow speakers
    recognition.interimResults = true; // Show interim results for better UX
    recognition.lang = currentLanguage.speechLang;

    let finalTranscript = '';
    let silenceTimer: ReturnType<typeof setTimeout> | null = null;

    const processFinalResult = (): void => {
      if (silenceTimer) clearTimeout(silenceTimer);
      recognition.stop();
      setIsListening(false);
      if (finalTranscript.trim()) {
        handleSendMessage(finalTranscript.trim());
      }
      finalTranscript = '';
    };

    recognition.onstart = (): void => {
      setIsListening(true);
      avatarRef.current?.setListening();
      finalTranscript = '';
    };

    recognition.onresult = (event): void => {
      // Reset silence timer on any result
      if (silenceTimer) clearTimeout(silenceTimer);
      
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
        } else {
          interimTranscript += result[0].transcript;
        }
      }
      
      // Wait 3 seconds of silence after final result before processing
      if (finalTranscript) {
        silenceTimer = setTimeout(processFinalResult, 3000);
      }
    };

    recognition.onerror = (event): void => {
      console.error('Speech recognition error:', event.error);
      if (event.error !== 'no-speech') {
        toast.error('Speech recognition error: ' + event.error);
      }
      setIsListening(false);
      if (silenceTimer) clearTimeout(silenceTimer);
    };

    recognition.onend = (): void => {
      // If we have a final transcript when recognition ends, process it
      if (finalTranscript.trim()) {
        setIsListening(false);
        handleSendMessage(finalTranscript.trim());
        finalTranscript = '';
      } else {
        setIsListening(false);
      }
      if (silenceTimer) clearTimeout(silenceTimer);
    };

    recognition.start();
  }, [isListening, handleSendMessage, currentLanguage.speechLang]);

  const handleClearConversation = useCallback((): void => {
    clearConversation();
    avatarRef.current?.stopTalking();
    toast.success('Conversation cleared');
  }, [clearConversation]);

  // Show loading while checking auth
  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          {/* User greeting, credits and logout */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-4" style={{paddingTop:90}}>
            <div className="bg-primary/10 px-4 py-2 rounded-full">
              <span className="text-sm font-medium text-primary">
                Welcome, {student?.name || 'Student'}
              </span>
            </div>
            <div className="bg-accent/20 px-4 py-2 rounded-full flex items-center gap-2">
              <Coins className="h-4 w-4 text-amber-600" />
              <span className="text-sm font-medium text-amber-700">
                {creditsLoading ? '...' : credits !== null ? `${credits} Credits Available` : 'Credits unavailable'}
              </span>
            </div>
             <Button variant="outline"
              size="sm"
              className="rounded-full">
              <Link to='/videos' target="_blank">Training Sessions</Link>
            </Button>
               <Button variant="default" asChild>
              <a href="/creditpackages" target="_blank">Buy More Credits</a>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="rounded-full"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
           
          </div>

          <h1 className="text-4xl font-serif font-bold text-primary mb-4">Meet Your Student Advisor</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ask me anything in the language of your choice below ! I'm here to help you with your queries.
          </p>

          {/* Language Toggle Buttons */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <Globe className="h-5 w-5 text-muted-foreground" />
            <div className="flex gap-1 bg-muted rounded-full p-1">
              {LANGUAGES.map((lang) => (
                <Button
                  key={lang.code}
                  variant={selectedLanguage === lang.code ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`rounded-full px-4 ${
                    selectedLanguage === lang.code
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-background'
                  }`}
                >
                  {lang.nativeName}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Mobile: message box sits on the bottom half of the avatar box */}
          <div className="bg-card rounded-2xl shadow-xl overflow-hidden border lg:hidden">
            <AvatarStage
              avatarRef={avatarRef}
              onStateChange={setAvatarState}
              avatarState={avatarState}
              heightClass="h-[70vh] min-h-[560px] max-h-[760px]"
            >
              <div className="absolute left-0 right-0 bottom-0 h-1/2 bg-card/90 backdrop-blur-md border-t flex flex-col">
                <div className="flex-1 overflow-y-auto p-4">
                  <ChatMessages messages={messages as unknown as ChatMessage[]} isLoading={isLoading} />
                </div>

                <div className="border-t p-3">
                  <ChatComposer
                    inputMessage={inputMessage}
                    setInputMessage={setInputMessage}
                    onKeyDown={handleKeyDown}
                    onClearConversation={handleClearConversation}
                    onToggleVoiceInput={toggleVoiceInput}
                    isListening={isListening}
                    isLoading={isLoading}
                    hasMessages={messages.length > 0}
                  />
                </div>
              </div>
            </AvatarStage>
          </div>

          {/* Desktop: side-by-side layout */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-8">
            {/* Avatar Canvas */}
            <div className="bg-card rounded-2xl shadow-xl overflow-hidden border">
              <AvatarStage
                avatarRef={avatarRef}
                onStateChange={setAvatarState}
                avatarState={avatarState}
                heightClass="h-[500px]"
              />
            </div>

            {/* Chat Panel */}
            <div className="bg-card rounded-2xl shadow-xl border flex flex-col h-[500px]">
              <div className="flex-1 overflow-y-auto p-4">
                <ChatMessages messages={messages as unknown as ChatMessage[]} isLoading={isLoading} />
              </div>

              <div className="border-t p-4">
                <ChatComposer
                  inputMessage={inputMessage}
                  setInputMessage={setInputMessage}
                  onKeyDown={handleKeyDown}
                  onClearConversation={handleClearConversation}
                  onToggleVoiceInput={toggleVoiceInput}
                  isListening={isListening}
                  isLoading={isLoading}
                  hasMessages={messages.length > 0}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

