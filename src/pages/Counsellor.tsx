import * as React from 'react';
import { Link } from 'react-router-dom';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { Helmet } from 'react-helmet-async';
import { AmyAvatar } from '@/components/AmyAvatar';
import { useNeocortexChat } from '@/hooks/useNeocortexChat';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Mic, MicOff, Trash2, MessageSquare, Send, LogOut, ExternalLink, Globe, X, Check } from 'lucide-react';
import { toast } from 'sonner';
import type { AvatarRef, AvatarState, LanguageCode } from '@/types/avatar';

const { useState, useRef, useCallback, Suspense, useEffect } = React;

// Language configurations for AMY Counsellor
interface AmyLanguageConfig {
  code: LanguageCode;
  name: string;
  nativeName: string;
  projectId: string;
  speechLang: string;
}

const AMY_LANGUAGES: AmyLanguageConfig[] = [
  { code: 'en', name: 'English', nativeName: 'English', projectId: 'cml2h562w0001la046ykixctc', speechLang: 'en-US' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', projectId: 'cml39zmn90001l804lwqqma5k', speechLang: 'hi-IN' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', projectId: 'cml39zypz0001ih04kr2p98g1', speechLang: 'kn-IN' },
];

// UI translations for each language
const UI_TRANSLATIONS: Record<LanguageCode, {
  startConversation: string;
  typeOrVoice: string;
  placeholder: string;
  speaking: string;
  listening: string;
  ready: string;
  endConversation: string;
  clearConversation: string;
  voiceInput: string;
  stopListening: string;
}> = {
  en: {
    startConversation: 'Start a conversation with Amy',
    typeOrVoice: 'Type a message or use voice input',
    placeholder: 'Type your message...',
    speaking: 'Speaking',
    listening: 'Listening',
    ready: 'Ready',
    endConversation: 'End conversation',
    clearConversation: 'Clear conversation',
    voiceInput: 'Voice input',
    stopListening: 'Stop listening',
  },
  hi: {
    startConversation: 'एमी से बातचीत शुरू करें',
    typeOrVoice: 'संदेश टाइप करें या वॉइस इनपुट का उपयोग करें',
    placeholder: 'अपना संदेश लिखें...',
    speaking: 'बोल रही हूं',
    listening: 'सुन रही हूं',
    ready: 'तैयार',
    endConversation: 'बातचीत समाप्त करें',
    clearConversation: 'बातचीत साफ़ करें',
    voiceInput: 'वॉइस इनपुट',
    stopListening: 'सुनना बंद करें',
  },
  kn: {
    startConversation: 'ಆಮಿಯೊಂದಿಗೆ ಸಂಭಾಷಣೆ ಪ್ರಾರಂಭಿಸಿ',
    typeOrVoice: 'ಸಂದೇಶವನ್ನು ಟೈಪ್ ಮಾಡಿ ಅಥವಾ ಧ್ವನಿ ಇನ್‌ಪುಟ್ ಬಳಸಿ',
    placeholder: 'ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಟೈಪ್ ಮಾಡಿ...',
    speaking: 'ಮಾತನಾಡುತ್ತಿದ್ದೇನೆ',
    listening: 'ಕೇಳುತ್ತಿದ್ದೇನೆ',
    ready: 'ಸಿದ್ಧ',
    endConversation: 'ಸಂಭಾಷಣೆ ಮುಗಿಸಿ',
    clearConversation: 'ಸಂಭಾಷಣೆ ಅಳಿಸಿ',
    voiceInput: 'ಧ್ವನಿ ಇನ್‌ಪುಟ್',
    stopListening: 'ಕೇಳುವುದನ್ನು ನಿಲ್ಲಿಸಿ',
  },
};

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

type ChatRole = string;
type ChatMessage = { role: ChatRole; content: string };

function ChatMessages({
  messages,
  isLoading,
  language,
}: {
  messages: ChatMessage[];
  isLoading: boolean;
  language: LanguageCode;
}): React.JSX.Element {
  const t = UI_TRANSLATIONS[language];
  
  return (
    <>
      {messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
          <MessageSquare className="h-12 w-12 mb-4 opacity-50" />
          <p className="text-lg font-medium">{t.startConversation}</p>
          <p className="text-sm">{t.typeOrVoice}</p>
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
              <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Avatar stage component for reuse
function AvatarStage({
  avatarRef,
  onStateChange,
  avatarState,
  heightClass,
  language,
  children,
}: {
  avatarRef: React.MutableRefObject<AvatarRef | null>;
  onStateChange: (state: AvatarState) => void;
  avatarState: AvatarState;
  heightClass: string;
  language: LanguageCode;
  children?: React.ReactNode;
}): React.JSX.Element {
  const t = UI_TRANSLATIONS[language];
  
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
          <AmyAvatar
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
        {avatarState === 'talking' ? t.speaking : avatarState === 'listening' ? t.listening : t.ready}
      </div>

      {children}
    </div>
  );
}

// Chat composer component for reuse
function ChatComposer({
  inputMessage,
  setInputMessage,
  onKeyDown,
  onSend,
  onClearConversation,
  onEndConversation,
  onToggleVoiceInput,
  isListening,
  isLoading,
  hasMessages,
  language,
}: {
  inputMessage: string;
  setInputMessage: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSend: () => void;
  onClearConversation: () => void;
  onEndConversation: () => void;
  onToggleVoiceInput: () => void;
  isListening: boolean;
  isLoading: boolean;
  hasMessages: boolean;
  language: LanguageCode;
}): React.JSX.Element {
  const t = UI_TRANSLATIONS[language];
  
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={onEndConversation}
        title={t.endConversation}
        className="text-destructive hover:text-destructive"
      >
        <LogOut className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={onClearConversation}
        title={t.clearConversation}
        disabled={!hasMessages}
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      <Button
        variant={isListening ? 'destructive' : 'outline'}
        size="icon"
        onClick={onToggleVoiceInput}
        title={isListening ? t.stopListening : t.voiceInput}
        disabled={isLoading}
      >
        {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
      </Button>

      <Input
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={t.placeholder}
        disabled={isLoading || isListening}
        className="flex-1"
      />

      <Button
        onClick={onSend}
        disabled={isLoading || !inputMessage.trim()}
        size="icon"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
}

type SpeechRecognitionType = NonNullable<typeof window.SpeechRecognition> extends new () => infer R ? R : never;

export default function Counsellor(): React.JSX.Element {
  const isMobile = useIsMobile();
  const avatarRef = useRef<AvatarRef>(null);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [avatarState, setAvatarState] = useState<AvatarState>('idle');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [studentName, setStudentName] = useState<string>('');
  const [showNameDialog, setShowNameDialog] = useState<boolean>(true);
  const [nameInput, setNameInput] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>('en');
  const [pendingNavigation, setPendingNavigation] = useState<{ url: string; message: string } | null>(null);
  const recognitionRef = useRef<SpeechRecognitionType | null>(null);
  const latestTranscriptRef = useRef<string>('');
  const shouldSendOnEndRef = useRef<boolean>(false);
  
  // Get current language config
  const currentLanguage = AMY_LANGUAGES.find(l => l.code === selectedLanguage) || AMY_LANGUAGES[0];

  const replyAudioRef = useRef<HTMLAudioElement | null>(null);
  const lastReplyObjectUrlRef = useRef<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const audioSourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const audioUnlockedRef = useRef<boolean>(false);

  const unlockAudio = useCallback(() => {
    if (audioUnlockedRef.current) return;

    try {
      const AudioContextCtor = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextCtor) {
        const ctx: AudioContext = audioContextRef.current ?? new AudioContextCtor();
        audioContextRef.current = ctx;

        if (ctx.state === 'suspended') {
          void ctx.resume().catch(() => {});
        }

        if (!gainNodeRef.current) {
          const gainNode = ctx.createGain();
          gainNode.gain.value = 1.5;
          gainNode.connect(ctx.destination);
          gainNodeRef.current = gainNode;
        }

        const buffer = ctx.createBuffer(1, 1, 22050);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.start(0);
      }
    } catch (e) {
      console.log('[Counsellor] AudioContext unlock attempt:', e);
    }

    try {
      if (!replyAudioRef.current) {
        const a = new Audio();
        a.setAttribute('playsinline', 'true');
        a.preload = 'auto';
        a.volume = 1.0;
        replyAudioRef.current = a;

        const ctx = audioContextRef.current;
        if (ctx && gainNodeRef.current && !audioSourceNodeRef.current) {
          try {
            const sourceNode = ctx.createMediaElementSource(a);
            sourceNode.connect(gainNodeRef.current);
            audioSourceNodeRef.current = sourceNode;
          } catch (err) {
            console.log('[Counsellor] Could not create MediaElementSource:', err);
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
      console.log('[Counsellor] HTMLAudio unlock attempt:', e);
    }

    audioUnlockedRef.current = true;
  }, []);

  const { sendMessage, isLoading, messages, clearConversation } = useNeocortexChat();
  
  // Handle language change
  const handleLanguageChange = useCallback((langCode: LanguageCode): void => {
    setSelectedLanguage(langCode);
    clearConversation();
    const lang = AMY_LANGUAGES.find(l => l.code === langCode);
    if (lang) {
      toast.success(`Switched to ${lang.name}`);
    }
  }, [clearConversation]);

  const handleNameSubmit = useCallback(() => {
    if (nameInput.trim()) {
      setStudentName(nameInput.trim());
      setShowNameDialog(false);
      toast.success(`Welcome, ${nameInput.trim()}! Amy is here to help you.`);
    } else {
      toast.error('Please enter your name');
    }
  }, [nameInput]);

  // Handle navigation actions from AI response - now asks for confirmation
  const handleNavigationAction = useCallback((action: { type: string; url: string }, responseText: string): void => {
    if (action.type === 'navigate' && action.url) {
      // Store pending navigation for confirmation
      setPendingNavigation({ url: action.url, message: responseText });
    }
  }, []);
  
  // Execute navigation when user confirms
  const confirmNavigation = useCallback((): void => {
    if (pendingNavigation) {
      toast.success(
        <div className="flex items-center gap-2">
          <span>Navigating to page...</span>
          <ExternalLink className="h-3 w-3" />
        </div>,
        { duration: 2000 }
      );
      window.location.href = pendingNavigation.url;
      setPendingNavigation(null);
    }
  }, [pendingNavigation]);
  
  // Cancel pending navigation
  const cancelNavigation = useCallback((): void => {
    setPendingNavigation(null);
    toast.info('Navigation cancelled');
  }, []);

  const handleSendMessage = useCallback(
    async (messageToSend?: string): Promise<void> => {
      const message = messageToSend || inputMessage.trim();
      if (!message || isLoading) return;

      unlockAudio();
      setInputMessage('');

      try {
        avatarRef.current?.setListening();

        const studentContext = {
          name: studentName,
        };

        const response = await sendMessage(message, currentLanguage.projectId, studentContext);

        if (response?.text) {
          const wordCount = response.text.split(/\s+/).length;
          const estimatedDuration = wordCount / 2.5;

          const lipsyncInput =
            Array.isArray(response.visemes) && response.visemes.length > 0 
              ? response.visemes 
              : response.text;

          avatarRef.current?.startTalking(lipsyncInput, estimatedDuration);

          // Handle navigation action if present - now shows confirmation
          const actionObj = response.action && typeof response.action === 'object' ? response.action : null;
          if (actionObj && actionObj.type === 'navigate' && actionObj.url) {
            setTimeout(() => {
              handleNavigationAction({ type: actionObj.type, url: actionObj.url as string }, response.text);
            }, 1500); // Delay to let Amy speak first
          }

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
              playPromise.catch(() => {
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
              });
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
    [inputMessage, isLoading, sendMessage, studentName, unlockAudio, handleNavigationAction, currentLanguage.projectId]
  );

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  const toggleVoiceInput = useCallback((): void => {
    unlockAudio();

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      toast.error('Speech recognition is not supported in your browser');
      return;
    }

    if (isListening) {
      shouldSendOnEndRef.current = true;

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

    // Start listening
    latestTranscriptRef.current = '';
    shouldSendOnEndRef.current = false;

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = currentLanguage.speechLang;

    recognition.onstart = () => {
      setIsListening(true);
      avatarRef.current?.setListening();
      toast.info('Listening... Tap again to send');
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      if (finalTranscript) {
        latestTranscriptRef.current += finalTranscript;
      }

      setInputMessage(latestTranscriptRef.current + interimTranscript);
    };

    recognition.onerror = (event) => {
      if (event.error !== 'no-speech') {
        console.error('Speech recognition error:', event.error);
        toast.error('Voice input error: ' + event.error);
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);

      if (shouldSendOnEndRef.current && latestTranscriptRef.current.trim()) {
        const messageToSend = latestTranscriptRef.current.trim();
        latestTranscriptRef.current = '';
        setInputMessage('');
        handleSendMessage(messageToSend);
      }

      shouldSendOnEndRef.current = false;
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [isListening, inputMessage, handleSendMessage, unlockAudio, currentLanguage.speechLang]);

  const handleClearConversation = useCallback((): void => {
    clearConversation();
    avatarRef.current?.stopTalking();
    toast.success('Conversation cleared');
  }, [clearConversation]);

  const handleEndConversation = useCallback((): void => {
    clearConversation();
    avatarRef.current?.stopTalking();
    setStudentName('');
    setNameInput('');
    setInputMessage('');
    setShowNameDialog(true);
    toast.success('Conversation ended');
  }, [clearConversation]);

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Onati Global Institute of Fashion Technology",
    "alternateName": "OGIFT Bangalore",
    "description": "Premier fashion design institute in Bangalore offering AI-powered career counselling with Amy, personalized guidance for fashion courses, and comprehensive placement support.",
    "url": "https://www.ogiftbangalore.com/counsellor",
    "logo": "https://ogiftbangalore.com/logo.png",
    "sameAs": [
      "https://www.instagram.com/ogiftbangalore",
      "https://www.facebook.com/ogiftbangalore"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bangalore",
      "addressRegion": "Karnataka",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-90369-28799",
      "contactType": "admissions",
      "availableLanguage": ["English", "Hindi", "Kannada"]
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Fashion Design Courses",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "Express Mastery Month",
            "description": "Intensive one-month fashion design course"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "3 Months Capsule Course",
            "description": "Comprehensive capsule fashion design certification"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "6 Months Diploma in Fashion Designing",
            "description": "Professional diploma in fashion design"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "One Year Advanced Diploma",
            "description": "Advanced diploma in fashion designing"
          }
        }
      ]
    }
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Free AI Fashion Career Counsellor | OGIFT Bangalore | Admissions 2026</title>
        <meta name="title" content="Free AI Fashion Career Counsellor Amy | OGIFT Bangalore | Best Fashion Institute" />
        <meta name="description" content="Get free personalized fashion career guidance from Amy, OGIFT's AI counsellor. Explore courses, check admissions 2026 eligibility & plan your fashion design career at Bangalore's 4.9★ rated best fashion institute." />
        <meta name="keywords" content="fashion design career guidance bangalore, AI fashion counsellor, free fashion career counselling bangalore, fashion course admission 2026, OGIFT counsellor, Onati Global career guidance, best fashion institute bangalore admissions, fashion design course recommendation bangalore, fashion career planning, fashion institute counselling bangalore" />
        <meta name="author" content="Onati Global Institute of Fashion Technology" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ogiftbangalore.com/counsellor" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogiftbangalore.com/counsellor" />
        <meta property="og:title" content="Free AI Fashion Career Counsellor | OGIFT Bangalore | Admissions 2026" />
        <meta property="og:description" content="Free career guidance from Amy, OGIFT's AI counsellor. Explore fashion design courses, check admissions 2026 eligibility & plan your career at Bangalore's 4.9★ best fashion institute." />
        <meta property="og:site_name" content="Onati Global Institute of Fashion Technology" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogiftbangalore.com/counsellor" />
        <meta name="twitter:title" content="Free AI Fashion Career Counsellor | OGIFT Bangalore 2026" />
        <meta name="twitter:description" content="Free fashion career guidance from Amy. Explore courses, admissions 2026 & placement support at Bangalore's 4.9★ rated OGIFT." />

        {/* Additional SEO Meta Tags */}
        <meta name="geo.region" content="IN-KA" />
        <meta name="geo.placename" content="Bangalore" />
        <meta name="geo.position" content="12.9716;77.5946" />
        <meta name="ICBM" content="12.9716, 77.5946" />
        <meta name="language" content="English, Hindi, Kannada" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="General" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Name Input Dialog */}
      <Dialog open={showNameDialog} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-center">
              👋 Hi! I'm Amy
            </DialogTitle>
            <DialogDescription className="text-center text-base">
              I'm your personal counsellor. What's your name?
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 mt-4">
            <Input
              placeholder="Enter your name..."
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleNameSubmit();
                }
              }}
              className="text-lg h-12"
              autoFocus
            />
            <Button onClick={handleNameSubmit} size="lg" className="w-full">
              Start Conversation
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Navigation Confirmation Dialog */}
      <Dialog open={!!pendingNavigation} onOpenChange={(open) => !open && cancelNavigation()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ExternalLink className="h-5 w-5" />
              Open Page?
            </DialogTitle>
            <DialogDescription className="text-left">
              Amy suggests visiting this page. Would you like to go there now?
            </DialogDescription>
          </DialogHeader>
          <div className="bg-muted p-3 rounded-lg text-sm break-all">
            {pendingNavigation?.url}
          </div>
          <DialogFooter className="flex gap-2 sm:gap-0">
            <Button variant="outline" onClick={cancelNavigation} className="flex-1 sm:flex-none">
              <X className="h-4 w-4 mr-2" />
              Stay Here
            </Button>
            <Button onClick={confirmNavigation} className="flex-1 sm:flex-none">
              <Check className="h-4 w-4 mr-2" />
              Go to Page
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Amy - Your Personal Counsellor
          </h1>
          {studentName && (
            <p className="text-muted-foreground">
              Helping <span className="font-semibold text-primary">{studentName}</span> today
            </p>
          )}
          
          {/* Language Toggle Buttons */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <Globe className="h-5 w-5 text-muted-foreground" />
            <div className="flex gap-1 bg-muted rounded-full p-1">
              {AMY_LANGUAGES.map((lang) => (
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

        {/* Conditionally render only ONE avatar based on viewport to prevent ref conflicts */}
        {isMobile ? (
          /* Mobile: message box overlays on avatar */
          <div className="max-w-7xl mx-auto">
            <div className="bg-card rounded-2xl shadow-xl overflow-hidden border">
              <AvatarStage
                avatarRef={avatarRef}
                onStateChange={setAvatarState}
                avatarState={avatarState}
                heightClass="h-[70vh] min-h-[560px] max-h-[760px]"
                language={selectedLanguage}
              >
                <div className="absolute left-0 right-0 bottom-0 h-1/2 bg-card/90 backdrop-blur-md border-t flex flex-col">
                  <div className="flex-1 overflow-y-auto p-4">
                    <ChatMessages messages={messages as ChatMessage[]} isLoading={isLoading} language={selectedLanguage} />
                  </div>

                  <div className="border-t p-3">
                    <ChatComposer
                      inputMessage={inputMessage}
                      setInputMessage={setInputMessage}
                      onKeyDown={handleKeyDown}
                      onSend={() => handleSendMessage()}
                      onClearConversation={handleClearConversation}
                      onEndConversation={handleEndConversation}
                      onToggleVoiceInput={toggleVoiceInput}
                      isListening={isListening}
                      isLoading={isLoading}
                      hasMessages={messages.length > 0}
                      language={selectedLanguage}
                    />
                  </div>
                </div>
              </AvatarStage>
            </div>
            
            {/* Mobile hint */}
            <p className="mt-3 text-xs text-muted-foreground text-center">
              Tap the microphone again to end voice input.
            </p>
          </div>
        ) : (
          /* Desktop: side-by-side layout */
          <div className="grid grid-cols-2 gap-6 max-w-7xl mx-auto">
            {/* Avatar Stage */}
            <div className="h-[70vh] relative rounded-2xl overflow-hidden border border-border shadow-lg">
              <Canvas camera={{ position: [0.2, 1.3, 1.3], fov: 28, near: 0.1, far: 50 }} shadows>
                <FixedCamera position={[0.2, 1.3, 1.3]} target={[0, 0.85, 0]} />

                <ambientLight intensity={0.75} />
                <directionalLight castShadow shadow-mapSize={[1024, 1024]} />
                <spotLight position={[-3, 3, 3]} angle={0.4} penumbra={1} intensity={0.6} />
                <pointLight position={[0, 2, 2]} intensity={0.35} />

                <Suspense fallback={<LoadingFallback />}>
                  <OfficeBackground />
                  <AmyAvatar
                    ref={avatarRef}
                    position={[0, -0.5, 0]}
                    rotation={[0, 0.15, 0]}
                    scale={1}
                    onStateChange={setAvatarState}
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
                {avatarState === 'talking' ? UI_TRANSLATIONS[selectedLanguage].speaking : avatarState === 'listening' ? UI_TRANSLATIONS[selectedLanguage].listening : UI_TRANSLATIONS[selectedLanguage].ready}
              </div>
            </div>

            {/* Chat Panel */}
            <div className="flex flex-col h-[70vh] bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4">
                <ChatMessages messages={messages as ChatMessage[]} isLoading={isLoading} language={selectedLanguage} />
              </div>

              {/* Chat Composer */}
              <div className="border-t border-border p-4">
                <ChatComposer
                  inputMessage={inputMessage}
                  setInputMessage={setInputMessage}
                  onKeyDown={handleKeyDown}
                  onSend={() => handleSendMessage()}
                  onClearConversation={handleClearConversation}
                  onEndConversation={handleEndConversation}
                  onToggleVoiceInput={toggleVoiceInput}
                  isListening={isListening}
                  isLoading={isLoading}
                  hasMessages={messages.length > 0}
                  language={selectedLanguage}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      </div>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Free AI Fashion Career Counsellor — OGIFT Bangalore</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>OGIFT's Free AI Fashion Career Counsellor is an interactive tool designed to help prospective students understand which fashion course or career path is right for them. Choosing the right programme is one of the most important decisions a fashion student makes — the wrong choice can mean wasted time and money, while the right choice can unlock a fulfilling creative and professional career. The OGIFT AI Counsellor asks about your background, interests, goals, and availability, then recommends the most suitable programme from OGIFT's range of short courses, vocational programmes, and diplomas.</p>
              <p>The AI Counsellor is completely free to use and requires no registration or personal details. It is available at any time, so you can explore your options at your own pace, revisit questions, and compare different career paths without any pressure. The counsellor covers all major areas of fashion education — design, pattern making, garment technology, styling, boutique management, portfolio development, and online learning. It also provides information about eligibility, course duration, fees structure, and placement outcomes for each programme, so you can make a fully informed decision before contacting the admissions team.</p>
              <h3 className="text-xl font-semibold text-foreground mt-2">Who Should Use the AI Counsellor?</h3>
              <p>The OGIFT AI Counsellor is ideal for school and college students exploring fashion as a career option, working professionals considering a career change into fashion design or garment technology, homemakers who want to build a skill and an income stream from their creativity, and parents researching educational options for their children. It is also a useful starting point for anyone who is already interested in a specific course but wants to understand how it fits into a broader career pathway before enrolling.</p>
              <h3 className="text-xl font-semibold text-foreground mt-2">Next Steps After Counselling</h3>
              <p>After using the AI Counsellor, prospective students are encouraged to book a free campus visit at the OGIFT institute in Vinayakanagar, Bengaluru, where they can meet the faculty, see the facilities, and ask any remaining questions in person. To book a visit or speak directly with the admissions team, call +91 90369 28799 or email admissions@ogiftbangalore.com. Admissions for 2026 are currently open.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Related Pages at OGIFT Bangalore</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 max-w-4xl mx-auto">
            <Link to="/admissions" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Admissions 2026</span></Link>
            <Link to="/videos" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Fashion Videos</span></Link>
            <Link to="/community" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Community</span></Link>
            <Link to="/faqavatar" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">FAQ Avatar</span></Link>
            <Link to="/verify" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Verify Certificate</span></Link>
            <Link to="/courses/fashup-free-taster-sessions" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">FASHUP Free Course</span></Link>
          </div>
        </div>
      </section>
    </>
  );
}
