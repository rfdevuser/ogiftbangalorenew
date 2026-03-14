import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { NeocortexAvatar } from '@/components/NeocortexAvatar';
import { useNeocortexChat } from '@/hooks/useNeocortexChat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mic, MicOff, Trash2, MessageSquare, Globe, LogOut, Coins, Video } from 'lucide-react';
import { toast } from 'sonner';
import type { AvatarRef, AvatarState, LanguageCode, LanguageConfig, StudentProgress } from '@/types/avatar';
import WebcamVision, { analyzeImageWithVision } from '@/components/WebcamVision';

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
  const [studentProgress, setStudentProgress] = useState<StudentProgress[]>([]);
  const [progressStats, setProgressStats] = useState<{ total: number; completed: number }>({ total: 0, completed: 0 });
  const [showWebcam, setShowWebcam] = useState<boolean>(false);
  const [visionAutoCapture, setVisionAutoCapture] = useState<boolean>(false);
  const [pendingVisionQuestion, setPendingVisionQuestion] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognitionType | null>(null);
  const latestTranscriptRef = useRef<string>('');
  const shouldSendOnEndRef = useRef<boolean>(false);

  const replyAudioRef = useRef<HTMLAudioElement | null>(null);
  const lastReplyObjectUrlRef = useRef<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const audioSourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const audioUnlockedRef = useRef<boolean>(false);

  // Unlock iOS audio on first user interaction and set up gain for volume boost
  const unlockAudio = useCallback(() => {
    if (audioUnlockedRef.current) return;

    // 1) Unlock WebAudio path and create gain node for volume boost
    try {
      const AudioContextCtor = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextCtor) {
        const ctx: AudioContext = audioContextRef.current ?? new AudioContextCtor();
        audioContextRef.current = ctx;

        if (ctx.state === 'suspended') {
          void ctx.resume().catch(() => {});
        }

        // Create gain node for volume boost (helps on iOS where volume can seem low)
        if (!gainNodeRef.current) {
          const gainNode = ctx.createGain();
          // Boost volume by 50% (1.5x) - can be adjusted higher if needed
          gainNode.gain.value = 1.5;
          gainNode.connect(ctx.destination);
          gainNodeRef.current = gainNode;
        }

        // Play silent buffer to unlock
        const buffer = ctx.createBuffer(1, 1, 22050);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.start(0);
      }
    } catch (e) {
      console.log('[AIAvatar] AudioContext unlock attempt:', e);
    }

    // 2) Unlock HTMLAudioElement path (reuse the same element later for replies)
    try {
      if (!replyAudioRef.current) {
        const a = new Audio();
        a.setAttribute('playsinline', 'true');
        a.preload = 'auto';
        a.volume = 1.0; // Ensure max volume
        replyAudioRef.current = a;

        // Connect audio element to gain node for volume boost on iOS
        const ctx = audioContextRef.current;
        if (ctx && gainNodeRef.current && !audioSourceNodeRef.current) {
          try {
            const sourceNode = ctx.createMediaElementSource(a);
            sourceNode.connect(gainNodeRef.current);
            audioSourceNodeRef.current = sourceNode;
            console.log('[AIAvatar] Audio routed through gain node for volume boost');
          } catch (err) {
            console.log('[AIAvatar] Could not create MediaElementSource:', err);
          }
        }
      }

      const silentWav = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==';
      const a = replyAudioRef.current;
      a.src = silentWav;

      const p = a.play();
      if (p) {
        p.then(() => {
          a.pause();
          a.currentTime = 0;
        }).catch(() => {});
      }
    } catch (e) {
      console.log('[AIAvatar] HTMLAudio unlock attempt:', e);
    }

    audioUnlockedRef.current = true;
    console.log('[AIAvatar] Audio unlocked with volume boost');
  }, []);

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

  // Fetch student progress for AI context
  const fetchStudentProgress = useCallback(async (studentId: string) => {
    try {
      console.log('[AIAvatar] Fetching student progress for:', studentId);
      const response = await fetch(`${AVATAR_SUPABASE_URL}/functions/v1/student-progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AVATAR_SUPABASE_KEY}`,
          'apikey': AVATAR_SUPABASE_KEY,
        },
        body: JSON.stringify({ student_id: studentId }),
      });
      
      const data = await response.json();
      console.log('[AIAvatar] Progress response:', data);
      
      if (data?.success && Array.isArray(data.progress)) {
        setStudentProgress(data.progress);
        setProgressStats({
          total: data.total_videos || data.progress.length,
          completed: data.completed_videos || data.progress.filter((p: StudentProgress) => p.completed).length,
        });
        console.log('[AIAvatar] Loaded progress for', data.progress.length, 'videos');
      } else {
        console.warn('[AIAvatar] No progress data available:', data);
        setStudentProgress([]);
        setProgressStats({ total: 0, completed: 0 });
      }
    } catch (err) {
      console.error('[AIAvatar] Failed to fetch progress:', err);
      setStudentProgress([]);
      setProgressStats({ total: 0, completed: 0 });
    }
  }, []);

  // Check authentication on mount AND when component becomes visible again
  useEffect(() => {
    console.log('[AIAvatar] Component mounted, checking localStorage...');
    
    const loadStudentAndCredits = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        console.log('[AIAvatar] localStorage stored value:', stored ? 'found' : 'not found');
        
        if (stored) {
          const parsedStudent = JSON.parse(stored);
          console.log('[AIAvatar] Parsed student:', parsedStudent);
          
          if (parsedStudent && parsedStudent.studentId) {
            console.log('[AIAvatar] Setting student and fetching credits...');
            setStudent(parsedStudent);
            fetchCredits(parsedStudent.studentId);
            // Fetch student progress for AI context
            fetchStudentProgress(parsedStudent.studentId);
          } else {
            // Not logged in, redirect to login
            console.log('[AIAvatar] No valid studentId, redirecting to login');
            navigate('/ai-avatar');
          }
        } else {
          // Not logged in, redirect to login
          console.log('[AIAvatar] No stored data, redirecting to login');
          navigate('/ai-avatar');
        }
      } catch (err) {
        console.error('[AIAvatar] Error loading student:', err);
        navigate('/ai-avatar');
      }
    };

    // Initial load - always fetch fresh credits
    loadStudentAndCredits();

    // Also refresh credits when page becomes visible again (user returns from another tab/page)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          try {
            const parsedStudent = JSON.parse(stored);
            if (parsedStudent?.studentId) {
              console.log('[AIAvatar] Page visible again, refreshing credits');
              fetchCredits(parsedStudent.studentId);
            }
          } catch {
            // Ignore parsing errors
          }
        }
      }
    };

    // Refresh when window gains focus (covers SPA navigation and browser refocus)
    const handleFocus = () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsedStudent = JSON.parse(stored);
          if (parsedStudent?.studentId) {
            console.log('[AIAvatar] Window focused, refreshing credits');
            fetchCredits(parsedStudent.studentId);
          }
        } catch {
          // Ignore parsing errors
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [navigate, fetchCredits, fetchStudentProgress]);

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

  // Detect if a message is asking about appearance/vision
  const isVisionQuestion = useCallback((text: string): boolean => {
    const visionKeywords = [
      'how do i look', 'what do i look like', 'my appearance', 'my outfit', 'my clothes',
      'what am i wearing', 'my style', 'my fashion', 'see me', 'look at me',
      'can you see me', 'do i look', 'my dress', 'my shirt', 'my hair',
      'my face', 'am i looking', 'rate my', 'judge my', 'evaluate my look',
      'give me feedback on my', 'what do you think of my', 'how is my',
      'describe my', 'analyze my appearance', 'my attire', 'how am i dressed'
    ];
    const lower = text.toLowerCase();
    return visionKeywords.some(kw => lower.includes(kw));
  }, []);

  // Handle vision analysis completion - route through Neocortex for consistent voice
  const handleVisionAnalysisComplete = useCallback(async (analysis: string) => {
    console.log('[AIAvatar] Vision analysis received, sending to Neocortex for voice response:', analysis.substring(0, 100) + '...');
    
    // Reset vision state (dialog is closed by WebcamVision after calling this)
    setVisionAutoCapture(false);
    setPendingVisionQuestion(null);
    
    // Route the vision analysis through Neocortex to get proper voice response
    try {
      avatarRef.current?.setListening();
      
      // Send the vision analysis as a message to get Neocortex-generated audio
      const visionMessage = `Based on what I can see: ${analysis}`;
      console.log('[AIAvatar] Sending vision analysis to Neocortex for voice synthesis...');
      
      const studentContext = student ? {
        name: student.name,
        email: student.email,
        phone: student.phone,
        studentId: student.studentId,
        progress: studentProgress,
        totalVideos: progressStats.total,
        completedVideos: progressStats.completed,
      } : undefined;
      
      const response = await sendMessage(visionMessage, currentLanguage.projectId, studentContext);
      console.log('[AIAvatar] Neocortex response received:', response?.text?.substring(0, 50), 'Audio:', !!response?.audio);
      if (response?.text) {
        const wordCount = response.text.split(/\s+/).length;
        const estimatedDuration = wordCount / 2.5;
        
        const lipsyncInput =
          Array.isArray(response.visemes) && response.visemes.length > 0 
            ? response.visemes 
            : response.text;
        
        avatarRef.current?.startTalking(lipsyncInput, estimatedDuration);
        
        // Use Neocortex-generated audio (same voice as regular chat)
        if (response.audio) {
          const detectAudioMime = (b64: string): string => {
            if (b64.startsWith('UklGR')) return 'audio/wav';
            if (b64.startsWith('SUQz')) return 'audio/mpeg';
            return 'audio/mpeg';
          };
          
          const base64ToBlobUrl = (b64: string, mime: string): string => {
            const binary = atob(b64);
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
            const blob = new Blob([bytes], { type: mime });
            return URL.createObjectURL(blob);
          };
          
          if (lastReplyObjectUrlRef.current) {
            URL.revokeObjectURL(lastReplyObjectUrlRef.current);
            lastReplyObjectUrlRef.current = null;
          }
          
          const mime = detectAudioMime(response.audio);
          const objectUrl = base64ToBlobUrl(response.audio, mime);
          lastReplyObjectUrlRef.current = objectUrl;
          
          const audio = replyAudioRef.current ?? new Audio();
          audio.setAttribute('playsinline', 'true');
          audio.preload = 'auto';
          audio.volume = 1.0;
          replyAudioRef.current = audio;
          
          if (audioContextRef.current?.state === 'suspended') {
            void audioContextRef.current.resume().catch(() => {});
          }
          
          if ('speechSynthesis' in window) window.speechSynthesis.cancel();
          
          audio.onended = () => {
            if (lastReplyObjectUrlRef.current) {
              URL.revokeObjectURL(lastReplyObjectUrlRef.current);
              lastReplyObjectUrlRef.current = null;
            }
            setTimeout(() => avatarRef.current?.stopTalking(), 250);
          };
          
          audio.onerror = () => avatarRef.current?.stopTalking();
          
          audio.src = objectUrl;
          audio.load();
          
          const playPromise = audio.play();
          if (playPromise) {
            playPromise.catch(() => avatarRef.current?.stopTalking());
          }
        } else {
          // Fallback to browser TTS if no audio
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
      }
    } catch (error) {
      console.error('[AIAvatar] Failed to process vision response:', error);
      avatarRef.current?.stopTalking();
      toast.error('Failed to process vision analysis');
    }
  }, [student, studentProgress, progressStats, sendMessage, currentLanguage.projectId]);

  const handleSendMessage = useCallback(
    async (messageToSend?: string): Promise<void> => {
      const message = messageToSend || inputMessage.trim();
      if (!message || isLoading) return;

      // Unlock audio on iOS - must happen during user gesture
      unlockAudio();

      setInputMessage('');

      // Check if this is a vision-related question
      if (isVisionQuestion(message)) {
        console.log('[AIAvatar] Vision question detected, opening camera...');
        setPendingVisionQuestion(message);
        setVisionAutoCapture(true);
        setShowWebcam(true);
        return;
      }

      try {
        // Set avatar to listening while processing
        avatarRef.current?.setListening();

        // Pass student context for personalization (including progress)
        const studentContext = student ? {
          name: student.name,
          email: student.email,
          phone: student.phone,
          studentId: student.studentId,
          progress: studentProgress,
          totalVideos: progressStats.total,
          completedVideos: progressStats.completed,
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
            const speakWithBrowserTTS = (): void => {
              if (!('speechSynthesis' in window)) return;
              window.speechSynthesis.cancel();
              const utterance = new SpeechSynthesisUtterance(response.text);
              utterance.rate = 1;
              utterance.pitch = 1;
              utterance.onend = () => setTimeout(() => avatarRef.current?.stopTalking(), 250);
              utterance.onerror = () => avatarRef.current?.stopTalking();
              window.speechSynthesis.speak(utterance);
            };

            const detectAudioMime = (b64: string): string => {
              // WAV starts with "RIFF" => base64 "UklGR"
              if (b64.startsWith('UklGR')) return 'audio/wav';
              // MP3 often starts with "ID3" => base64 "SUQz"
              if (b64.startsWith('SUQz')) return 'audio/mpeg';
              return 'audio/mpeg';
            };

            const base64ToBlobUrl = (b64: string, mime: string): string => {
              const binary = atob(b64);
              const bytes = new Uint8Array(binary.length);
              for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
              const blob = new Blob([bytes], { type: mime });
              return URL.createObjectURL(blob);
            };

            try {
              // Revoke previous reply URL (avoid iOS memory issues)
              if (lastReplyObjectUrlRef.current) {
                URL.revokeObjectURL(lastReplyObjectUrlRef.current);
                lastReplyObjectUrlRef.current = null;
              }

              const mime = detectAudioMime(response.audio);
              const objectUrl = base64ToBlobUrl(response.audio, mime);
              lastReplyObjectUrlRef.current = objectUrl;

              // Reuse a single Audio element (iOS is stricter when you create new elements per reply)
              const audio = replyAudioRef.current ?? new Audio();
              audio.setAttribute('playsinline', 'true');
              audio.preload = 'auto';
              audio.volume = 1.0; // Ensure max volume
              replyAudioRef.current = audio;

              // Ensure AudioContext is resumed (required on iOS after tab switch)
              if (audioContextRef.current?.state === 'suspended') {
                void audioContextRef.current.resume().catch(() => {});
              }

              // Stop any in-progress speech synthesis so it doesn't fight with playback
              if ('speechSynthesis' in window) window.speechSynthesis.cancel();

              audio.onended = () => {
                if (lastReplyObjectUrlRef.current) {
                  URL.revokeObjectURL(lastReplyObjectUrlRef.current);
                  lastReplyObjectUrlRef.current = null;
                }
                setTimeout(() => avatarRef.current?.stopTalking(), 250);
              };

              audio.onerror = (e) => {
                console.error('Audio playback error:', e);
                speakWithBrowserTTS();
              };

              audio.src = objectUrl;
              audio.load();

              const playPromise = audio.play();
              if (playPromise) {
                playPromise.catch((audioError) => {
                  console.error('Failed to play Neocortex audio:', audioError);
                  speakWithBrowserTTS();
                });
              }
            } catch (audioError) {
              console.error('Failed to play Neocortex audio:', audioError);
              speakWithBrowserTTS();
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
    [inputMessage, isLoading, sendMessage, currentLanguage.projectId, student, unlockAudio, studentProgress, progressStats]
  );

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  const toggleVoiceInput = useCallback((): void => {
    // CRITICAL: Unlock audio on iOS during this user gesture (mic button tap)
    // This is needed because the actual message send happens after speech recognition,
    // which is no longer within a user gesture context.
    unlockAudio();

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      toast.error('Speech recognition is not supported in your browser');
      return;
    }

    // Second tap: stop recording and SEND what we have.
    if (isListening) {
      shouldSendOnEndRef.current = true;

      // If the user typed anything while recording (rare), keep it as a fallback.
      if (!latestTranscriptRef.current.trim() && inputMessage.trim()) {
        latestTranscriptRef.current = inputMessage.trim();
      }

      try {
        recognitionRef.current?.stop();
      } catch {
        // ignore
      }

      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognitionRef.current = recognition;

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = currentLanguage.speechLang;

    let finalTranscript = '';
    let silenceTimer: ReturnType<typeof setTimeout> | null = null;

    const requestStopAndSend = (): void => {
      shouldSendOnEndRef.current = true;
      if (silenceTimer) clearTimeout(silenceTimer);
      try {
        recognition.stop();
      } catch {
        // ignore
      }
    };

    recognition.onstart = (): void => {
      shouldSendOnEndRef.current = false;
      latestTranscriptRef.current = '';
      setIsListening(true);
      avatarRef.current?.setListening();
    };

    recognition.onresult = (event): void => {
      if (silenceTimer) clearTimeout(silenceTimer);

      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcript = result?.[0]?.transcript || '';

        if (result.isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      const combined = `${finalTranscript} ${interimTranscript}`.trim();

      if (combined) {
        latestTranscriptRef.current = combined;
        // Show live transcript so the user sees what will be sent.
        setInputMessage(combined);

        // Also auto-stop after a short silence (still allows manual stop).
        silenceTimer = setTimeout(requestStopAndSend, 2000);
      }
    };

    recognition.onerror = (event): void => {
      console.error('Speech recognition error:', event.error);
      if (silenceTimer) clearTimeout(silenceTimer);

      shouldSendOnEndRef.current = false;
      latestTranscriptRef.current = '';
      setIsListening(false);

      if (event.error !== 'no-speech') {
        toast.error('Speech recognition error: ' + event.error);
      }
    };

    recognition.onend = (): void => {
      if (silenceTimer) clearTimeout(silenceTimer);
      setIsListening(false);

      // IMPORTANT (iOS): Send the message only AFTER recognition fully ends.
      const textToSend = (shouldSendOnEndRef.current ? latestTranscriptRef.current : '').trim();

      shouldSendOnEndRef.current = false;
      latestTranscriptRef.current = '';
      finalTranscript = '';

      if (textToSend) {
        setInputMessage('');
        void handleSendMessage(textToSend);
      }
    };

    recognition.start();
  }, [isListening, handleSendMessage, currentLanguage.speechLang, unlockAudio, inputMessage]);

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
      {/* Mobile iOS safe-area padding so the welcome + buttons never hide behind the notch/dynamic island */}
      <div className="container mx-auto px-4 pb-8 pt-[max(6rem,calc(env(safe-area-inset-top)+3rem))] lg:pt-24">
        <div className="text-center mb-8">
          {/* User greeting, credits and logout */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
            <div className="bg-primary/10 px-4 py-2 rounded-full">
              <span className="text-sm font-medium text-primary">
                Welcome, {student?.name || 'Student'}
              </span>
            </div>
            <div className="bg-accent/20 px-4 py-2 rounded-full flex items-center gap-2">
              <Coins className="h-4 w-4 text-amber-600" />
              <span className="text-sm font-medium text-amber-700">
                {creditsLoading ? '...' : credits !== null ? `${credits} Credits` : 'Credits unavailable'}
              </span>
            </div>
            <Button
              variant="default"
              size="sm"
              onClick={() => navigate('/videos')}
              className="rounded-full"
            >
              <Video className="h-4 w-4 mr-2" />
              Training Sessions
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="rounded-full"
            >
              View Progress
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate('/credit-packages')}
              className="rounded-full"
            >
              <Coins className="h-4 w-4 mr-2" />
              Buy Credits
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
            Ask me anything! I'm here to help you with your queries. I can also look at you and suggest fashion 
            styles that can make you look and feel good. Try asking me 'How do I look today ?'
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

          {/* Mobile hint: mic must be tapped again to end recording */}
          <p className="mt-3 text-xs text-muted-foreground text-center lg:hidden">
            Tap the microphone again to end voice input. Only after that the avatar can play the audio reply.
          </p>

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

      {/* Webcam Vision Modal */}
      <WebcamVision 
        open={showWebcam} 
        onOpenChange={(open) => {
          setShowWebcam(open);
          if (!open) {
            setVisionAutoCapture(false);
            setPendingVisionQuestion(null);
          }
        }}
        autoCapture={visionAutoCapture}
        onAnalysisComplete={visionAutoCapture ? handleVisionAnalysisComplete : undefined}
        analysisPrompt={pendingVisionQuestion 
          ? `The user asked: "${pendingVisionQuestion}". Look at them through the camera and respond to their question about their appearance. Be friendly, encouraging, and specific about what you observe.`
          : undefined
        }
      />
    </div>
  );
}

