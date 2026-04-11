import { Helmet } from 'react-helmet-async';
import * as React from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { NeocortexAvatar } from "@/components/NeocortexAvatar";
import { useNeocortexChat } from "@/hooks/useNeocortexChat";
import { useIsMobile } from "@/hooks/use-mobile";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Play, Pause, Volume2, VolumeX,
  Send, Loader2, RotateCcw
} from "lucide-react";
import { toast } from "sonner";
import type { AvatarRef, AvatarState } from "@/types/avatar";
import { getSignedVideoUrl } from "@/lib/video-token";

const { useCallback, useEffect, useRef, useState } = React;

// Fixed camera that looks at a target point (same as AI Avatar Assistant)
function FixedCamera({ 
  position = [0.2, 1.3, 1.3] as [number, number, number], 
  target = [0, 0.85, 0] as [number, number, number] 
}): null {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(position[0], position[1], position[2]);
    camera.lookAt(target[0], target[1], target[2]);
    camera.updateProjectionMatrix();
  }, [camera, position, target]);
  return null;
}
const NEOCORTEX_PROJECT_ID = "cm9kl235c0001lh037im65ack";
const VIDEO_PATH = "English/FashionFundamentalsPart1Comp.mp4";
const AVATAR_SUPABASE_URL = 'https://azfyktcspmhcaqbhozuw.supabase.co';
const AVATAR_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6ZnlrdGNzcG1oY2FxYmhvenV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxNTg4NDIsImV4cCI6MjA4MTczNDg0Mn0.qvGq90_IQxWjNjKTdqRzFO63DIuSUMCPCiFcA7qG7fM';

type SessionMode = "lecture" | "question";

interface QAEntry {
  role: "student" | "avatar";
  text: string;
}

export default function InteractiveTraining(): React.JSX.Element {
  const isMobile = useIsMobile();
  const avatarRef = useRef<AvatarRef>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Video state
  const [videoUrl, setVideoUrl] = useState("");
  const [loadingVideo, setLoadingVideo] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [avatarState, setAvatarState] = useState<AvatarState>("idle");

  // Session state
  const [mode, setMode] = useState<SessionMode>("lecture");
  const [question, setQuestion] = useState("");
  const [qaHistory, setQaHistory] = useState<QAEntry[]>([]);
  const [pausedAt, setPausedAt] = useState(0);

  const { sendMessage, isLoading: chatLoading } = useNeocortexChat();

  // Persistent audio element for iOS compatibility
  useEffect(() => {
    const audio = new Audio();
    audio.preload = "auto";
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Cleanup lip-sync interval on unmount
  useEffect(() => {
    return () => {
      if (lipSyncIntervalRef.current) clearInterval(lipSyncIntervalRef.current);
    };
  }, []);

  // Play audio from base64
  const playAudioResponse = useCallback((base64Audio: string) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    const audioUrl = `data:audio/mpeg;base64,${base64Audio}`;
    audio.src = audioUrl;
    audio.play().catch((err) => {
      console.warn("Audio playback failed:", err);
    });
  }, []);

  // Load signed video URL
  useEffect(() => {
    (async () => {
      try {
        const url = await getSignedVideoUrl(VIDEO_PATH);
        setVideoUrl(url);
      } catch {
        toast.error("Failed to load video");
      } finally {
        setLoadingVideo(false);
      }
    })();
  }, []);

  // Lip-sync loop for video lecture — refreshes every few seconds for natural movement
  const lipSyncIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const LECTURE_PHRASES = [
    "Fashion design is about understanding the fundamentals of color and fabric.",
    "Today we will explore the principles of pattern making and draping techniques.",
    "Let us look at how different textures complement each other beautifully.",
    "The key to great design is understanding proportion and silhouette clearly.",
    "Notice how the construction details affect the overall garment structure.",
    "Color theory plays an essential role in creating harmonious combinations.",
    "Understanding body measurements is crucial for creating well-fitted garments.",
    "Let me explain the importance of fabric selection in fashion design process.",
  ];

  const startLipSync = useCallback(() => {
    if (!videoRef.current || !avatarRef.current) return;
    // Stop any existing loop
    if (lipSyncIntervalRef.current) {
      clearInterval(lipSyncIntervalRef.current);
    }

    // Start immediate lip-sync
    const phrase = LECTURE_PHRASES[Math.floor(Math.random() * LECTURE_PHRASES.length)];
    const estSeconds = Math.max(3, phrase.split(" ").length / 2.5);
    avatarRef.current.startTalking(phrase, estSeconds);

    // Refresh lip-sync every 4 seconds with a new phrase
    lipSyncIntervalRef.current = setInterval(() => {
      if (!videoRef.current || videoRef.current.paused || !avatarRef.current) {
        if (lipSyncIntervalRef.current) clearInterval(lipSyncIntervalRef.current);
        return;
      }
      const nextPhrase = LECTURE_PHRASES[Math.floor(Math.random() * LECTURE_PHRASES.length)];
      const nextEst = Math.max(3, nextPhrase.split(" ").length / 2.5);
      avatarRef.current.startTalking(nextPhrase, nextEst);
    }, 4000);
  }, []);

  const stopLipSync = useCallback(() => {
    if (lipSyncIntervalRef.current) {
      clearInterval(lipSyncIntervalRef.current);
      lipSyncIntervalRef.current = null;
    }
    avatarRef.current?.stopTalking();
  }, []);

  // Video event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onMeta = () => setDuration(video.duration);
    const onTime = () => setCurrentTime(video.currentTime);
    const onPlay = () => { setIsPlaying(true); startLipSync(); };
    const onPause = () => { setIsPlaying(false); stopLipSync(); };
    const onEnded = () => { setIsPlaying(false); stopLipSync(); };
    const onSeeked = () => { if (!video.paused) { stopLipSync(); startLipSync(); } };

    video.addEventListener("loadedmetadata", onMeta);
    video.addEventListener("timeupdate", onTime);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("ended", onEnded);
    video.addEventListener("seeked", onSeeked);
    return () => {
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("timeupdate", onTime);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("seeked", onSeeked);
    };
  }, [loadingVideo, videoUrl, startLipSync, stopLipSync]);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      if (mode === "question") {
        setMode("lecture");
        v.currentTime = pausedAt;
      }
      v.play().catch(console.error);
    } else {
      v.pause();
      setPausedAt(v.currentTime);
      setMode("question");
      stopLipSync();
      toast("Lecture paused — ask your question!", { icon: "⏸️" });
    }
  }, [mode, pausedAt, stopLipSync]);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(!isMuted);
  }, [isMuted]);

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    v.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
  }, [duration]);

  // Resume lecture
  const handleResume = useCallback(() => {
    setMode("lecture");
    // Stop any playing answer audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
    stopLipSync();
    const v = videoRef.current;
    if (v) {
      v.currentTime = pausedAt;
      v.play().catch(console.error);
    }
  }, [pausedAt, stopLipSync]);

  const handleAskQuestion = useCallback(async () => {
    if (!question.trim()) return;
    const q = question.trim();
    setQuestion("");
    setQaHistory((prev) => [...prev, { role: "student", text: q }]);

    try {
      const resp = await sendMessage(
        `You are a fashion training instructor. The student paused the lecture at ${formatTime(pausedAt)} to ask a question. Answer concisely and helpfully.\n\nStudent question: ${q}`,
        NEOCORTEX_PROJECT_ID,
        undefined,
        q
      );
      const answer = resp.text || "I'm not sure, let me think...";
      setQaHistory((prev) => [...prev, { role: "avatar", text: answer }]);

      // Play audio answer if available
      if (resp.audio) {
        playAudioResponse(resp.audio);
      } else {
        // Fallback: generate TTS audio via edge function
        try {
          const ttsResp = await fetch(`${AVATAR_SUPABASE_URL}/functions/v1/neocortex-chat`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${AVATAR_SUPABASE_KEY}`,
              'apikey': AVATAR_SUPABASE_KEY,
            },
            body: JSON.stringify({
              message: answer,
              ttsOnly: true,
              projectId: NEOCORTEX_PROJECT_ID,
            }),
          });
          if (ttsResp.ok) {
            const ttsData = await ttsResp.json();
            if (ttsData.audio) {
              playAudioResponse(ttsData.audio);
            }
          }
        } catch (ttsErr) {
          console.warn("TTS fallback failed:", ttsErr);
        }
      }

      // Lip-sync the answer
      if (avatarRef.current && resp.visemes?.length) {
        avatarRef.current.startTalking(resp.visemes);
      } else if (avatarRef.current) {
        const words = answer.split(" ").length;
        const estSeconds = Math.max(3, words / 2.5);
        avatarRef.current.startTalking(answer, estSeconds);
      }
    } catch {
      toast.error("Failed to get answer");
    }
  }, [question, pausedAt, sendMessage, playAudioResponse]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (loadingVideo) {
    return (
      <div className="min-h-screen bg-background">
       
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Interactive Fashion Training | OGIFT Bangalore | AI-Powered 2026</title>
        <meta name="description" content="Experience interactive AI-powered fashion design training at OGIFT Bangalore. Learn pattern making, garment construction & styling with immersive 3D training at Bangalore's 4.9★ best fashion institute." />
        <meta name="keywords" content="interactive fashion training bangalore, AI fashion learning, 3D fashion training, OGIFT interactive training, Onati Global training, fashion design AI bangalore 2026" />
        <link rel="canonical" href="https://www.ogiftbangalore.com/interactive-training" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <main className="container mx-auto px-4 pt-20 pb-8">
        {/* Title bar */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl md:text-2xl font-bold text-foreground">
            Interactive Training: Fashion Fundamentals
          </h1>
          {mode === "question" && (
            <Button onClick={handleResume} className="gap-2">
              <RotateCcw className="w-4 h-4" /> Resume Lecture
            </Button>
          )}
        </div>

        {/* Main layout: video large + avatar panel */}
        <div className={`flex ${isMobile ? "flex-col" : "flex-row"} gap-4`}>
          {/* ---- VIDEO (large) ---- */}
          <div className="flex-1 min-w-0">
            <div className="relative bg-black rounded-xl overflow-hidden">
              <video
                ref={videoRef}
                src={videoUrl}
                className="w-full aspect-video object-contain"
                playsInline
                onClick={togglePlay}
              />

              {/* Paused overlay in question mode */}
              {mode === "question" && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10 pointer-events-none">
                  <div className="text-center text-white">
                    <Pause className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-lg font-semibold">Lecture Paused</p>
                    <p className="text-sm text-white/70">Ask your question in the sidebar</p>
                  </div>
                </div>
              )}

              {/* Play overlay */}
              {!isPlaying && mode === "lecture" && (
                <div
                  className="absolute inset-0 bottom-16 flex items-center justify-center cursor-pointer z-10"
                  onClick={togglePlay}
                >
                  <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                    <Play className="w-7 h-7 text-primary-foreground ml-0.5" />
                  </div>
                </div>
              )}

              {/* Controls */}
              <div className="absolute bottom-0 left-0 right-0 z-30 px-4 py-2.5 bg-gradient-to-t from-black/90 to-transparent"
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <div
                  className="group/progress w-full py-2 mb-2 cursor-pointer relative flex items-center"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const bar = e.currentTarget;
                    const seek = (ev: MouseEvent) => {
                      const rect = bar.getBoundingClientRect();
                      const pct = Math.max(0, Math.min(1, (ev.clientX - rect.left) / rect.width));
                      if (videoRef.current && duration) {
                        videoRef.current.currentTime = pct * duration;
                        setCurrentTime(pct * duration);
                      }
                    };
                    seek(e.nativeEvent);
                    const up = () => { window.removeEventListener("mousemove", seek); window.removeEventListener("mouseup", up); };
                    window.addEventListener("mousemove", seek);
                    window.addEventListener("mouseup", up);
                  }}
                  onTouchStart={(e) => {
                    e.stopPropagation();
                    const bar = e.currentTarget;
                    const seek = (ev: TouchEvent) => {
                      const rect = bar.getBoundingClientRect();
                      const pct = Math.max(0, Math.min(1, (ev.touches[0].clientX - rect.left) / rect.width));
                      if (videoRef.current && duration) {
                        videoRef.current.currentTime = pct * duration;
                        setCurrentTime(pct * duration);
                      }
                    };
                    seek(e.nativeEvent);
                    const up = () => { window.removeEventListener("touchmove", seek); window.removeEventListener("touchend", up); };
                    window.addEventListener("touchmove", seek);
                    window.addEventListener("touchend", up);
                  }}
                >
                  <div className="w-full h-1.5 bg-white/30 rounded-full relative">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }} />
                  </div>
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md border-2 border-primary -translate-x-1/2 pointer-events-none"
                    style={{ left: `${progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-white text-sm">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20" onClick={togglePlay}>
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20" onClick={toggleMute}>
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </Button>
                    <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ---- AVATAR + Q&A SIDEBAR ---- */}
          <div className={`${isMobile ? "w-full" : "w-80"} flex flex-col gap-3`}>
            {/* Avatar - camera focused on face and upper torso */}
            <div className="rounded-xl overflow-hidden border border-border bg-card shadow-md"
              style={{ height: isMobile ? 200 : 260 }}
            >
              <Canvas
                camera={{ position: [0.2, 1.3, 1.3], fov: 28, near: 0.1, far: 50 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: "transparent" }}
              >
                <FixedCamera position={[0.2, 1.3, 1.3]} target={[0, 0.85, 0]} />
                <ambientLight intensity={0.75} />
                <directionalLight position={[2, 3, 2]} intensity={0.8} castShadow />
                <spotLight position={[-3, 3, 3]} angle={0.4} penumbra={1} intensity={0.6} />
                <pointLight position={[0, 2, 2]} intensity={0.35} />
                <Environment preset="apartment" />
                <NeocortexAvatar
                  ref={avatarRef}
                  onStateChange={setAvatarState}
                  lipSyncStyle="calm"
                  position={[0, -0.5, 0]}
                  rotation={[0, 0.15, 0]}
                  scale={1}
                />
              </Canvas>
            </div>

            {/* Status badge */}
            <div className="flex items-center justify-center gap-2 text-xs">
              <span className={`inline-block w-2 h-2 rounded-full ${
                avatarState === "talking" ? "bg-green-500 animate-pulse" :
                mode === "question" ? "bg-amber-500" : "bg-muted-foreground/50"
              }`} />
              <span className="text-muted-foreground">
                {avatarState === "talking" ? "Speaking..." :
                 mode === "question" ? "Waiting for your question" : "Lecturing"}
              </span>
            </div>

            {/* Q&A Panel (visible in question mode) */}
            {mode === "question" && (
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex justify-end">
                  <Button variant="outline" size="sm" className="gap-1" onClick={handleResume}>
                    <RotateCcw className="w-3.5 h-3.5" /> Resume
                  </Button>
                </div>

                {/* Chat history */}
                <ScrollArea className="flex-1 min-h-[120px] max-h-[200px] rounded-lg border border-border bg-muted/30 p-2">
                  {qaHistory.length === 0 && (
                    <p className="text-xs text-muted-foreground text-center py-4">
                      Ask anything about the lecture...
                    </p>
                  )}
                  {qaHistory.map((entry, i) => (
                    <div key={i} className={`mb-2 text-sm ${
                      entry.role === "student" ? "text-right" : "text-left"
                    }`}>
                      <span className={`inline-block px-3 py-1.5 rounded-lg max-w-[90%] ${
                        entry.role === "student"
                          ? "bg-primary text-primary-foreground"
                          : "bg-card border border-border text-foreground"
                      }`}>
                        {entry.text}
                      </span>
                    </div>
                  ))}
                </ScrollArea>

                {/* Question input */}
                <div className="flex gap-2">
                  <Textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Type your question..."
                    className="min-h-[40px] max-h-[80px] text-sm resize-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleAskQuestion();
                      }
                    }}
                  />
                  <Button
                    size="icon"
                    onClick={handleAskQuestion}
                    disabled={!question.trim() || chatLoading}
                  >
                    {chatLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            )}

            {/* Info text when in lecture mode */}
            {mode === "lecture" && (
              <p className="text-xs text-muted-foreground text-center">
                Pause the video to ask a question
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
