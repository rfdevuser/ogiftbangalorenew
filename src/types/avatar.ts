// Avatar and chat related types

export interface Viseme {
  viseme: string;
  time: number;
  duration: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  visemes?: Viseme[];
}

export interface NeocortexAction {
  type: string;
  url?: string;
  intent?: {
    [key: string]: unknown;
  };
}

export interface ChatResponse {
  text: string;
  visemes?: Viseme[];
  audio?: string;
  action?: string | NeocortexAction;
}

export type LanguageCode = 'en' | 'hi' | 'kn';

export interface LanguageConfig {
  code: LanguageCode;
  name: string;
  nativeName: string;
  projectId: string;
  speechLang: string;
}

export interface StudentProgress {
  video_id: string;
  video_title: string;
  progress_percent: number;
  completed: boolean | number;
  last_watched_at: string;
}

export interface StudentContext {
  name: string;
  email?: string;
  phone?: string;
  studentId?: string;
  progress?: StudentProgress[];
  totalVideos?: number;
  completedVideos?: number;
}

export interface NeocortexChatResult {
  sendMessage: (message: string, projectId?: string, studentContext?: StudentContext, displayMessage?: string) => Promise<ChatResponse>;
  clearConversation: () => void;
  isLoading: boolean;
  error: string | null;
  messages: ChatMessage[];
  conversationId: string | null;
}

export interface AvatarRef {
  startTalking: (visemesOrText: Viseme[] | string, estimatedSeconds?: number) => void;
  stopTalking: () => void;
  setListening: () => void;
}

export type AvatarState = 'idle' | 'listening' | 'talking';

// Web Speech API types
interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
  readonly message: string;
}

interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: ((this: SpeechRecognition, ev: Event) => void) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => void) | null;
  onend: ((this: SpeechRecognition, ev: Event) => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

// Extend Window for React deduplication check and Web Speech API
declare global {
  interface Window {
    __LOVABLE_REACT__?: typeof import('react');
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}
