import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getSignedVideoUrl, clearUrlCache } from "@/lib/video-token";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { NeocortexAvatar } from "@/components/NeocortexAvatar";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import {
  Play,
  Pause,
  Square,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  ArrowLeft,
  GripVertical,
  Maximize2,
  Minimize2,
  Loader2,
} from "lucide-react";
import type { AvatarRef, AvatarState } from "@/types/avatar";

const { useCallback, useEffect, useRef, useState } = React;

interface LocationState {
  videoUrl?: string;
  title?: string;
  language?: string;
  credits?: number;
}

const AVATAR_SIZE_CONFIG = {
  small: { width: 120, height: 160 },
  medium: { width: 160, height: 210 },
  large: { width: 200, height: 270 },
};

const STORAGE_KEY = 'avatar_student_info';

const VideoPlayer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const avatarContainerRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<AvatarRef>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [avatarState, setAvatarState] = useState<AvatarState>("idle");
  const [showControls, setShowControls] = useState(true);

  // Avatar draggable/resizable state
  const [avatarSize, setAvatarSize] = useState<"small" | "medium" | "large">("medium");
  const [avatarPosition, setAvatarPosition] = useState({ x: -1, y: -1 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Video URL state - loaded asynchronously
  const videoPath = state?.videoUrl || "";
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [isLoadingUrl, setIsLoadingUrl] = useState(true);
  const videoTitle = state?.title || "Video Player";
  const videoLanguage = state?.language || "";
  const videoCredits = state?.credits || 0;

  // Track if credits have been deducted for this session
  const creditsDeductedRef = useRef(false);
  
  // Store videoCredits in a ref to avoid re-creating deductCredits callback
  const videoCreditsRef = useRef(videoCredits);
  videoCreditsRef.current = videoCredits;

  // Token refresh interval: 4 minutes (before 5-minute expiry)
  const TOKEN_REFRESH_INTERVAL_MS = 4 * 60 * 1000;

  // Function to deduct credits when video starts playing (stable reference)
  const deductCredits = useCallback(async () => {
    const creditsToDeduct = videoCreditsRef.current;
    
    if (creditsDeductedRef.current || creditsToDeduct <= 0) {
      return; // Already deducted or no credits to deduct
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        console.error("[VideoPlayer] No student info found for credit deduction");
        return;
      }

      const studentInfo = JSON.parse(stored);
      const studentId = studentInfo.studentId;

      if (!studentId) {
        console.error("[VideoPlayer] No student ID found");
        return;
      }

      // First, check current credits balance
      console.log(`[VideoPlayer] Checking credits balance for student ${studentId}`);
      const checkResponse = await fetch('https://azfyktcspmhcaqbhozuw.supabase.co/functions/v1/verify-student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: studentId,
          action: 'get_credits',
        }),
      });

      const checkResult = await checkResponse.json();
      console.log("[VideoPlayer] Credits check response:", checkResult);

      if (!checkResult.success) {
        console.error("[VideoPlayer] Failed to check credits balance");
        toast.error("Failed to verify credits balance. Please try again.");
        return;
      }

      const currentCredits = parseInt(checkResult.credits, 10) || 0;
      console.log(`[VideoPlayer] Current credits: ${currentCredits}, Credits to deduct: ${creditsToDeduct}`);

      // Check if sufficient credits
      if (currentCredits < creditsToDeduct) {
        console.error("[VideoPlayer] Insufficient credits");
        toast.error(`Insufficient credits! You have ${currentCredits} credits but need ${creditsToDeduct} to watch this video.`);
        // Pause the video
        videoRef.current?.pause();
        return;
      }

      // Check if credits would go negative
      const remainingCredits = currentCredits - creditsToDeduct;
      if (remainingCredits < 0) {
        console.error("[VideoPlayer] Credits would go negative");
        toast.error("Cannot play video - insufficient credits.");
        videoRef.current?.pause();
        return;
      }

      console.log(`[VideoPlayer] Deducting ${creditsToDeduct} credits for student ${studentId}`);

      // Proceed with deduction
      const response = await fetch('https://azfyktcspmhcaqbhozuw.supabase.co/functions/v1/verify-student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: studentId,
          action: 'deduct_credits',
          credits: creditsToDeduct,
        }),
      });

      const result = await response.json();
      console.log("[VideoPlayer] Credit deduction response:", result);

      if (result.success) {
        creditsDeductedRef.current = true;
        console.log("[VideoPlayer] Credits successfully deducted");
        
        // Check if remaining credits are low (25 or below)
        if (remainingCredits <= 25) {
          toast.warning(
            `⚠️ Low credits! You have only ${remainingCredits} credits remaining. Please buy more credits to continue watching videos.`,
            {
              duration: 8000,
              action: {
                label: "Buy Credits",
                onClick: () => window.open("/#/credit-packages", "_blank"),
              },
            }
          );
        }
      } else {
        console.error("[VideoPlayer] Credit deduction failed:", result.message);
        toast.error("Failed to deduct credits. Please try again.");
      }
    } catch (error) {
      console.error("[VideoPlayer] Error deducting credits:", error);
      toast.error("Error processing credits. Please try again.");
    }
  }, []); // Empty deps - uses refs for stable reference

  // Load initial video URL
  useEffect(() => {
    if (!videoPath) {
      setIsLoadingUrl(false);
      return;
    }

    const loadUrl = async () => {
      try {
        const url = await getSignedVideoUrl(videoPath);
        setVideoUrl(url);
      } catch (error) {
        console.error("[VideoPlayer] Failed to get signed URL:", error);
      } finally {
        setIsLoadingUrl(false);
      }
    };

    loadUrl();
  }, [videoPath]);

  // Periodic token refresh to prevent expiry during long sessions
  useEffect(() => {
    if (!videoPath) return;

    const refreshVideoToken = async () => {
      const video = videoRef.current;
      if (!video) return;

      // Store current playback state
      const wasPlaying = !video.paused;
      const currentPosition = video.currentTime;

      // Clear cache and get fresh URL
      clearUrlCache();

      try {
        const newUrl = await getSignedVideoUrl(videoPath);
        console.log("[VideoPlayer] Refreshing video token for continued playback");

        // Update video source with new token
        setVideoUrl(newUrl);

        // Restore playback state after source change
        const handleCanPlay = () => {
          video.currentTime = currentPosition;
          if (wasPlaying) {
            video.play().catch(console.error);
          }
          video.removeEventListener("canplay", handleCanPlay);
        };
        video.addEventListener("canplay", handleCanPlay);
      } catch (error) {
        console.error("[VideoPlayer] Token refresh failed:", error);
      }
    };

    // Set up periodic refresh
    const intervalId = setInterval(refreshVideoToken, TOKEN_REFRESH_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [videoPath]);

  useEffect(() => {
    document.title = `${videoTitle} | Onati Global`;
  }, [videoTitle]);

  // Initialize avatar position
  useEffect(() => {
    if (avatarPosition.x === -1 && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const { width, height } = AVATAR_SIZE_CONFIG[avatarSize];
      setAvatarPosition({
        x: rect.width - width - 16,
        y: rect.height - height - 80,
      });
    }
  }, [avatarSize, avatarPosition.x]);

  // Store duration in a ref for stable access (duration can be Infinity with some streams)
  const durationRef = useRef<number>(0);
  useEffect(() => {
    durationRef.current = duration;
  }, [duration]);

  // Lip-sync loop so the avatar keeps moving even when duration is unknown/Infinity
  const lipSyncLoopRef = useRef<number | null>(null);

  const generateLipSyncText = useCallback((seconds: number): string => {
    const safeSeconds = Number.isFinite(seconds) && seconds > 0 ? Math.min(seconds, 30) : 8;
    const words = Math.max(1, Math.floor(safeSeconds * 1.5));
    return Array(words).fill("speaking").join(" ");
  }, []);

  const stopLipSync = useCallback(() => {
    if (lipSyncLoopRef.current !== null) {
      window.clearInterval(lipSyncLoopRef.current);
      lipSyncLoopRef.current = null;
    }
    avatarRef.current?.stopTalking();
  }, []);

  const startLipSyncLoop = useCallback(() => {
    // restart loop
    if (lipSyncLoopRef.current !== null) {
      window.clearInterval(lipSyncLoopRef.current);
      lipSyncLoopRef.current = null;
    }

    const tick = () => {
      const video = videoRef.current;
      const avatar = avatarRef.current;
      if (!video || !avatar || video.paused) return;

      const dur = durationRef.current;
      const remaining = Number.isFinite(dur) && dur > 0 ? Math.max(0, dur - video.currentTime) : 8;
      const sliceSeconds = Number.isFinite(remaining) && remaining > 0 ? Math.min(8, remaining) : 8;

      const text = generateLipSyncText(sliceSeconds);
      avatar.startTalking(text, sliceSeconds);
    };

    // kick once immediately, then keep it alive
    tick();
    lipSyncLoopRef.current = window.setInterval(tick, 7000);
  }, [generateLipSyncText]);

  // Video event handlers (attach once the video element exists; re-attach when src changes)
  useEffect(() => {
    if (!videoUrl) return;

    const video = videoRef.current;
    if (!video) return;

    const syncPlayingState = () => setIsPlaying(!video.paused && !video.ended);

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => {
      const d = video.duration;
      setDuration(d);
      durationRef.current = d;
      syncPlayingState();
    };
    const handlePlay = () => {
      syncPlayingState();
      startLipSyncLoop();
      // Deduct credits when video starts playing
      deductCredits();
    };
    const handlePlaying = () => {
      syncPlayingState();
      startLipSyncLoop();
    };
    const handlePause = () => {
      syncPlayingState();
      stopLipSync();
    };
    const handleEnded = () => {
      syncPlayingState();
      stopLipSync();
    };
    const handleSeeked = () => {
      setCurrentTime(video.currentTime);
      if (!video.paused) startLipSyncLoop();
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("play", handlePlay);
    video.addEventListener("playing", handlePlaying);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("seeked", handleSeeked);

    // Initial sync for cases where metadata/play happen before handlers attach
    syncPlayingState();

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("seeked", handleSeeked);
      stopLipSync();
    };
  }, [videoUrl, startLipSyncLoop, stopLipSync]); // deductCredits has stable reference via refs

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    // Use the real element state to avoid React state desync
    if (video.paused) {
      video.play().catch((err) => console.error("[VideoPlayer] Play failed:", err));
    } else {
      video.pause();
    }
  }, []);

  const stopVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(0);
    avatarRef.current?.stopTalking();
  }, []);

  const handleSeek = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  }, [isMuted]);

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = value[0] / 100;
    setVolume(value[0]);
    setIsMuted(value[0] === 0);
  };

  const toggleFullscreen = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    if (document.fullscreenElement) {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    } else {
      container.requestFullscreen().then(() => setIsFullscreen(true)).catch(console.error);
    }
  }, []);

  const cycleAvatarSize = useCallback(() => {
    setAvatarSize((prev) => {
      const newSize = prev === "small" ? "medium" : prev === "medium" ? "large" : "small";
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const { width, height } = AVATAR_SIZE_CONFIG[newSize];
        setAvatarPosition((pos) => ({
          x: Math.min(pos.x, rect.width - width - 8),
          y: Math.min(pos.y, rect.height - height - 8),
        }));
      }
      return newSize;
    });
  }, []);

  // Avatar drag handlers
  const handleAvatarMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button")) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    const rect = avatarContainerRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const { width, height } = AVATAR_SIZE_CONFIG[avatarSize];

      const newX = Math.max(8, Math.min(containerRect.width - width - 8, e.clientX - containerRect.left - dragOffset.x));
      const newY = Math.max(8, Math.min(containerRect.height - height - 8, e.clientY - containerRect.top - dragOffset.y));

      setAvatarPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset, avatarSize]);

  // Touch handlers for mobile
  const handleAvatarTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button")) return;
    const touch = e.touches[0];
    setIsDragging(true);
    const rect = avatarContainerRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      });
    }
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const handleTouchMove = (e: TouchEvent) => {
      if (!containerRef.current) return;
      const touch = e.touches[0];
      const containerRect = containerRef.current.getBoundingClientRect();
      const { width, height } = AVATAR_SIZE_CONFIG[avatarSize];

      const newX = Math.max(8, Math.min(containerRect.width - width - 8, touch.clientX - containerRect.left - dragOffset.x));
      const newY = Math.max(8, Math.min(containerRect.height - height - 8, touch.clientY - containerRect.top - dragOffset.y));

      setAvatarPosition({ x: newX, y: newY });
    };

    const handleTouchEnd = () => setIsDragging(false);

    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, dragOffset, avatarSize]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const { width: avatarWidth, height: avatarHeight } = AVATAR_SIZE_CONFIG[avatarSize];

  // Loading state
  if (isLoadingUrl) {
    return (
      <main className="min-h-screen bg-background pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Loading video...</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate("/videos")}
            className="mb-4 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Training Sessions
          </Button>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 text-center">
            {videoTitle}
          </h1>
          {videoLanguage && (
            <p className="text-muted-foreground text-center mb-6">
              Language: {videoLanguage}
            </p>
          )}

          {/* Video Container with Avatar */}
          <div
            ref={containerRef}
            className="relative bg-black rounded-lg overflow-hidden shadow-xl group select-none"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
            onContextMenu={(e) => e.preventDefault()}
          >
            <video
              ref={videoRef}
              src={videoUrl}
              className="w-full aspect-video"
              onClick={togglePlay}
              controlsList="nodownload noplaybackrate"
              disablePictureInPicture
              onContextMenu={(e) => e.preventDefault()}
            />

            {/* Draggable & Resizable Avatar Overlay */}
            <div
              ref={avatarContainerRef}
              className="absolute z-20 rounded-lg overflow-hidden shadow-2xl border border-white/30 bg-black/40 backdrop-blur-sm transition-shadow"
              style={{
                width: avatarWidth,
                height: avatarHeight,
                left: avatarPosition.x >= 0 ? avatarPosition.x : undefined,
                top: avatarPosition.y >= 0 ? avatarPosition.y : undefined,
                right: avatarPosition.x < 0 ? 16 : undefined,
                bottom: avatarPosition.y < 0 ? 80 : undefined,
                cursor: isDragging ? "grabbing" : "grab",
                boxShadow: isDragging ? "0 0 20px rgba(255,255,255,0.3)" : undefined,
              }}
              onMouseDown={handleAvatarMouseDown}
              onTouchStart={handleAvatarTouchStart}
            >
              {/* Avatar Header with controls */}
              <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-1.5 py-1 bg-gradient-to-b from-black/70 to-transparent">
                <div className="flex items-center gap-1">
                  <GripVertical className="w-3 h-3 text-white/70" />
                  <span className="text-[10px] font-medium text-white/90 truncate max-w-[80px]">
                    Trainer
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 text-white/80 hover:bg-white/20 hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    cycleAvatarSize();
                  }}
                >
                  {avatarSize === "large" ? (
                    <Minimize2 className="w-3 h-3" />
                  ) : (
                    <Maximize2 className="w-3 h-3" />
                  )}
                </Button>
              </div>

              {/* Avatar Canvas */}
              <Canvas
                camera={{ position: [0.1, 0.2, 1.0], fov: 28 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: "transparent" }}
              >
                <ambientLight intensity={0.6} />
                <directionalLight position={[2, 3, 2]} intensity={0.8} />
                <directionalLight position={[-2, 2, -1]} intensity={0.3} />
                <Environment preset="studio" />
                <NeocortexAvatar
                  ref={avatarRef}
                  onStateChange={setAvatarState}
                  lipSyncStyle="calm"
                  position={[0, -1.3, 0]}
                  scale={0.95}
                />
              </Canvas>

              {/* Speaking indicator */}
              {avatarState === "talking" && (
                <div className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 bg-primary/80 rounded text-[9px] text-white font-medium">
                  Speaking...
                </div>
              )}
            </div>

            {/* Play button overlay when paused */}
            {!isPlaying && (
              <div
                className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
                onClick={togglePlay}
              >
                <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
              </div>
            )}

            {/* Custom Controls */}
            <div
              className={`absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
                showControls || !isPlaying ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Progress Slider */}
              <div className="mb-4">
                <Slider
                  value={[currentTime]}
                  max={duration || 100}
                  step={0.1}
                  onValueChange={handleSeek}
                  className="cursor-pointer"
                />
                <div className="flex justify-between text-xs text-white/80 mt-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  {/* Play/Pause Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={togglePlay}
                    className="text-white hover:bg-white/20"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5" />
                    )}
                  </Button>

                  {/* Stop Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={stopVideo}
                    className="text-white hover:bg-white/20"
                  >
                    <Square className="w-4 h-4" />
                  </Button>

                  {/* Volume Controls */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMute}
                    className="text-white hover:bg-white/20"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </Button>
                  <div className="w-24">
                    <Slider
                      value={[isMuted ? 0 : volume]}
                      max={100}
                      step={1}
                      onValueChange={handleVolumeChange}
                      className="cursor-pointer"
                    />
                  </div>
                </div>

                {/* Right side controls */}
                <div className="flex items-center gap-2">
                  {/* Fullscreen Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleFullscreen}
                    className="text-white hover:bg-white/20"
                  >
                    {isFullscreen ? (
                      <Minimize className="w-5 h-5" />
                    ) : (
                      <Maximize className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Video Description */}
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h2 className="text-lg font-semibold text-foreground mb-2">
              About This Session
            </h2>
            <p className="text-muted-foreground">
              This fashion training session is presented by your AI trainer who will guide you
              through the concepts. The trainer's movements are synchronized with the video
              content for an immersive learning experience.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default VideoPlayer;
