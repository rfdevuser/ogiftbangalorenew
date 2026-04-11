import * as React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, Play, Pause, Globe, Bot, Video, Sparkles, 
  GraduationCap, Mic, Award, Users, BookOpen, Loader2,
  Maximize, Minimize
} from "lucide-react";
import { getSignedVideoUrl } from "@/lib/video-token";

const { useState, useRef, useEffect, useCallback } = React;

// JSON-LD Structured Data for Course
const courseStructuredData = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "3-Month Online Fashion Design Certificate Course",
  "description": "India's first multi-lingual, AI-powered, and personalized online fashion training platform. Learn fashion designing with 40+ video modules, AI avatar guidance, and industry certification.",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "Onati Global Institute of Fashion Technology",
    "url": "https://ogiftbangalore.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bangalore",
      "addressRegion": "Karnataka",
      "addressCountry": "IN"
    }
  },
  "courseMode": "online",
  "timeToComplete": "P3M",
  "numberOfCredits": "1",
  "occupationalCredentialAwarded": "Fashion Design Certificate",
  "teaches": [
    "Pattern Making",
    "Garment Construction",
    "Fashion Illustration",
    "Boutique Management",
    "AI-Powered Fashion Design"
  ],
  "inLanguage": ["en", "hi", "kn", "te"],
  "offers": {
    "@type": "Offer",
    "category": "Online Course",
    "availability": "https://schema.org/InStock"
  },
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "online",
    "courseWorkload": "PT10H/Week"
  }
};

// JSON-LD for Video
const videoStructuredData = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "OGIFT 3-Month Online Fashion Course - Quick Tour",
  "description": "Watch how our AI-powered platform transforms fashion education. Discover multi-lingual learning, personalized AI guidance, and comprehensive video training.",
  "thumbnailUrl": "https://ogiftbangalore.com/og-quick-tour.jpg",
  "uploadDate": "2025-01-01",
  "duration": "PT3M",
  "contentUrl": "https://ogiftbangalore.com/videos/ogift-teaser",
  "embedUrl": "https://ogiftbangalore.com/quick-tour",
  "publisher": {
    "@type": "Organization",
    "name": "Onati Global Institute of Fashion Technology",
    "logo": {
      "@type": "ImageObject",
      "url": "https://ogiftbangalore.com/logo.png"
    }
  }
};

// Video path for the teaser (the edge function will build the full signed URL)
const VIDEO_PATH = "English/OGIFT-Teaser.mp4";

const features = [
  {
    icon: Globe,
    title: "Multi-Lingual",
    description: "Learn in Hindi, Kannada, Telugu, English & more"
  },
  {
    icon: Bot,
    title: "AI-Powered",
    description: "Personalized guidance from your AI fashion advisor"
  },
  {
    icon: Video,
    title: "Video Training",
    description: "Comprehensive video library for hands-on learning"
  },
  {
    icon: GraduationCap,
    title: "Certificate Course",
    description: "3-month program with industry-recognized certification"
  }
];

const highlights = [
  { icon: Users, text: "1000+ Students Trained" },
  { icon: Award, text: "Industry Certification" },
  { icon: BookOpen, text: "40+ Training Modules" },
  { icon: Mic, text: "Voice-Enabled AI" }
];

export default function QuickTour() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isIOSTheaterMode, setIsIOSTheaterMode] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Fetch signed video URL on mount
  useEffect(() => {
    const fetchUrl = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const url = await getSignedVideoUrl(VIDEO_PATH);
        setVideoUrl(url);
      } catch (err) {
        console.error('[QuickTour] Failed to get video URL:', err);
        setError('Unable to load video. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUrl();
  }, []);

  // Track fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    
    // iOS video fullscreen end event
    const video = videoRef.current;
    const handleIOSFullscreenEnd = () => {
      setIsFullscreen(false);
      setIsIOSTheaterMode(false);
    };
    if (video) {
      video.addEventListener('webkitendfullscreen', handleIOSFullscreenEnd);
    }
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      if (video) {
        video.removeEventListener('webkitendfullscreen', handleIOSFullscreenEnd);
      }
    };
  }, [videoUrl]);

  // Update progress bar
  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      const { currentTime, duration } = videoRef.current;
      if (duration > 0) {
        setProgress((currentTime / duration) * 100);
      }
    }
  }, []);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  const handleVideoPlay = () => {
    setIsPlaying(true);
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = clickX / rect.width;
      videoRef.current.currentTime = percentage * videoRef.current.duration;
    }
  };

  // Detect iOS
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

  const toggleFullscreen = async () => {
    const video = videoRef.current;
    const container = containerRef.current;
    
    if (!video || !container) return;
    
    try {
      // iOS: Use native video fullscreen or theater mode
      if (isIOS) {
        if (!isFullscreen && !isIOSTheaterMode) {
          // Try native iOS video fullscreen first
          if ((video as any).webkitEnterFullscreen) {
            (video as any).webkitEnterFullscreen();
            setIsFullscreen(true);
          } else {
            // Fallback: theater mode (rotate and scale)
            setIsIOSTheaterMode(true);
            setIsFullscreen(true);
          }
        } else {
          // Exit fullscreen
          if ((video as any).webkitExitFullscreen) {
            (video as any).webkitExitFullscreen();
          }
          setIsIOSTheaterMode(false);
          setIsFullscreen(false);
        }
        return;
      }
      
      // Standard Fullscreen API for other browsers
      if (!document.fullscreenElement) {
        await container.requestFullscreen();
        // Try to lock to landscape on mobile
        if (screen.orientation && 'lock' in screen.orientation) {
          try {
            await (screen.orientation as any).lock('landscape');
          } catch (e) {
            // Orientation lock not supported or denied
          }
        }
      } else {
        await document.exitFullscreen();
        if (screen.orientation && 'unlock' in screen.orientation) {
          try {
            (screen.orientation as any).unlock();
          } catch (e) {
            // Orientation unlock not supported
          }
        }
      }
    } catch (err) {
      console.error('[QuickTour] Fullscreen error:', err);
    }
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Best Online Fashion Design Course India 2026 | OGIFT | AI-Powered 3 Month Tour</title>
        <meta
          name="description"
          content="India's best AI-powered online fashion design course at OGIFT — 3-month certificate, 40+ video modules, multi-lingual (Hindi, Kannada, Telugu, English). 4.9★ rated. Admissions 2026 open. Enroll now!"
        />
        <meta
          name="keywords"
          content="best online fashion design course india 2026, AI powered fashion course india, multi-lingual fashion course hindi kannada, online fashion certificate course, 3 month fashion design course, OGIFT online course bangalore, Onati Global fashion online, fashion design online india, learn fashion design online, fashion admissions 2026"
        />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://www.ogiftbangalore.com/quicktour" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ogiftbangalore.com/quicktour" />
        <meta property="og:title" content="3-Month Online Fashion Design Course | AI-Powered Multi-Lingual Training" />
        <meta
          property="og:description"
          content="India's first AI-powered, multi-lingual online fashion design certificate course. Learn in Hindi, Kannada, Telugu & English with personalized AI guidance. 40+ video modules, industry certification."
        />
        <meta property="og:image" content="https://www.ogiftbangalore.com/og-quick-tour.jpg" />
        <meta property="og:image:alt" content="OGIFT 3-Month Online Fashion Design Course" />
        <meta property="og:site_name" content="Onati Global Institute of Fashion Technology" />
        <meta property="og:locale" content="en_IN" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.ogiftbangalore.com/quicktour" />
        <meta name="twitter:title" content="3-Month Online Fashion Course | AI-Powered Training" />
        <meta
          name="twitter:description"
          content="India's first multi-lingual, AI-powered online fashion design course. Learn in 4 languages with personalized AI guidance. Enroll now!"
        />
        <meta name="twitter:image" content="https://www.ogiftbangalore.com/og-quick-tour.jpg" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Onati Global Institute of Fashion Technology" />
        <meta name="geo.region" content="IN-KA" />
        <meta name="geo.placename" content="Bangalore" />
        <meta name="geo.position" content="12.9716;77.5946" />
        <meta name="ICBM" content="12.9716, 77.5946" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(courseStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(videoStructuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          {/* TOP HALF: Course Introduction */}
          <section className="mb-12">
            {/* Hero Badge */}
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide mb-6">
                <Sparkles className="h-4 w-4" />
                One-of-a-Kind Online Training
              </span>
              
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                3-Month Online Certificate Course
                <span className="block text-primary mt-2">in Fashion Designing</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                India's first <strong className="text-foreground">multi-lingual</strong>, <strong className="text-foreground">AI-powered</strong>, and <strong className="text-foreground">personalized</strong> online fashion training platform. 
                Learn at your own pace with our intelligent avatar assistant guiding you every step of the way.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {/* {features.map((feature, index) => (
                <div 
                  key={feature.title}
                  className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 text-center hover:shadow-lg hover:border-primary/30 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))} */}
            </div>

            {/* Highlights Strip */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {/* {highlights.map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-muted-foreground">
                  <item.icon className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))} */}
            </div>
          </section>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-12" />

          {/* BOTTOM HALF: Video Player */}
          <section className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                Watch the Quick Tour
              </h2>
              <p className="text-muted-foreground">
                See how our AI-powered platform transforms fashion education
              </p>
            </div>

            {/* Video Container */}
            <div 
              ref={containerRef}
              className={`relative bg-black rounded-2xl overflow-hidden shadow-2xl group ${
                isIOSTheaterMode 
                  ? 'fixed inset-0 z-50 rounded-none flex items-center justify-center' 
                  : 'aspect-video'
              }`}
              style={isIOSTheaterMode ? { backgroundColor: '#000' } : undefined}
            >
              {/* Loading State */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black">
                  <Loader2 className="h-12 w-12 text-primary animate-spin" />
                </div>
              )}

              {/* Error State */}
              {error && !isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                  <p className="text-white/80 text-center px-4">{error}</p>
                </div>
              )}

              {/* Video Element */}
              {videoUrl && !isLoading && (
                <video
                  ref={videoRef}
                  src={videoUrl}
                  className={`object-contain ${
                    isIOSTheaterMode 
                      ? 'w-full h-full max-w-full max-h-full' 
                      : 'w-full h-full'
                  }`}
                  playsInline
                  webkit-playsinline="true"
                  onEnded={handleVideoEnded}
                  onPlay={handleVideoPlay}
                  onPause={handleVideoPause}
                  onTimeUpdate={handleTimeUpdate}
                />
              )}

              {/* Play Overlay - shows when not playing */}
              {!isPlaying && !isLoading && videoUrl && (
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer transition-all duration-300 hover:bg-black/30"
                  onClick={handlePlayPause}
                >
                  <div className="relative">
                    {/* Pulse animation */}
                    <div className="absolute inset-0 bg-primary/30 rounded-full animate-ping" />
                    <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse scale-125" />
                    
                    {/* Play button */}
                    <button
                      className="relative w-20 h-20 md:w-24 md:h-24 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300"
                      aria-label="Play video"
                    >
                      <Play className="h-8 w-8 md:h-10 md:w-10 ml-1" fill="currentColor" />
                    </button>
                  </div>
                  
                  {/* Click to play text */}
                  <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm font-medium">
                    Click to Play
                  </span>
                </div>
              )}

              {/* Video Controls Bar - always visible when video loaded */}
              {videoUrl && !isLoading && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 md:p-4 z-20">
                  {/* Progress Bar */}
                  <div 
                    className="w-full h-2 bg-white/20 rounded-full cursor-pointer mb-3 overflow-hidden"
                    onClick={handleProgressClick}
                  >
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-150"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  
                  {/* Control Buttons */}
                  <div className="flex items-center justify-between">
                    {/* Play/Pause */}
                    <button
                      onClick={handlePlayPause}
                      className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                      aria-label={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? (
                        <Pause className="h-5 w-5 md:h-6 md:w-6" />
                      ) : (
                        <Play className="h-5 w-5 md:h-6 md:w-6 ml-0.5" fill="currentColor" />
                      )}
                    </button>

                    {/* Fullscreen */}
                    <button
                      onClick={toggleFullscreen}
                      className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                      aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                    >
                      {isFullscreen ? (
                        <Minimize className="h-5 w-5 md:h-6 md:w-6" />
                      ) : (
                        <Maximize className="h-5 w-5 md:h-6 md:w-6" />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* CTA below video */}
            <div className="text-center mt-8">
              <p className="text-muted-foreground mb-4">
                Ready to start your fashion design journey?
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/admissions"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <Bot className="h-5 w-5" />
                  Start Training
                </Link>
                <Link
                  to="/videos"
                  className="inline-flex items-center gap-2 bg-secondary text-foreground px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <Video className="h-5 w-5" />
                  Browse Videos
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
