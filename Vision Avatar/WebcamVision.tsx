import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Camera, X, Loader2, Eye, Send } from 'lucide-react';
import { toast } from 'sonner';

const { useState, useRef, useEffect, useCallback } = React;

// Hardcoded Supabase credentials for vision feature
const SUPABASE_URL = 'https://azfyktcspmhcaqbhozuw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6ZnlrdGNzcG1oY2FxYmhvenV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxNTg4NDIsImV4cCI6MjA4MTczNDg0Mn0.qvGq90_IQxWjNjKTdqRzFO63DIuSUMCPCiFcA7qG7fM';

interface WebcamVisionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** If provided, auto-captures and returns analysis via this callback, then closes */
  onAnalysisComplete?: (analysis: string) => void;
  /** Custom prompt for the vision analysis */
  analysisPrompt?: string;
  /** Auto-capture mode - automatically captures after camera starts */
  autoCapture?: boolean;
}

export async function analyzeImageWithVision(imageData: string, prompt?: string): Promise<string> {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/vision-analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'apikey': SUPABASE_ANON_KEY,
    },
    body: JSON.stringify({
      image: imageData,
      prompt: prompt || 'Analyze this person. Describe what you see: their appearance, clothing, style, and any fashion observations. Be friendly and conversational, as if you are an AI fashion advisor meeting them for the first time.'
    }),
  });

  if (!response.ok) {
    throw new Error(`Analysis failed: ${response.status}`);
  }

  const data = await response.json();
  return data.analysis || 'No analysis available.';
}

export default function WebcamVision({ 
  open, 
  onOpenChange, 
  onAnalysisComplete,
  analysisPrompt,
  autoCapture = false 
}: WebcamVisionProps): React.JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const autoCaptureTriggeredRef = useRef<boolean>(false);
  
  const [isStreaming, setIsStreaming] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('Starting camera...');

  // Start webcam
  const startWebcam = useCallback(async () => {
    try {
      setStatusMessage('Requesting camera access...');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsStreaming(true);
        setStatusMessage('Camera ready');
      }
    } catch (err) {
      console.error('Webcam error:', err);
      toast.error('Could not access camera. Please check permissions.');
      setStatusMessage('Camera access denied');
    }
  }, []);

  // Stop webcam
  const stopWebcam = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
  }, []);

  // Capture frame and analyze
  const captureAndAnalyze = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw current frame
    ctx.drawImage(video, 0, 0);
    
    // Convert to base64
    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    setCapturedImage(imageData);
    setIsAnalyzing(true);
    setAnalysis(null);
    setStatusMessage('Analyzing your appearance...');

    try {
      const result = await analyzeImageWithVision(imageData, analysisPrompt);
      
      // If callback mode, return result and close
      // IMPORTANT: Call onAnalysisComplete BEFORE closing to avoid stale closure issues
      if (onAnalysisComplete) {
        stopWebcam();
        // Call the callback first, THEN close the dialog
        onAnalysisComplete(result);
        onOpenChange(false);
        return;
      }
      
      // Otherwise show in dialog
      setAnalysis(result);
      setStatusMessage('Analysis complete');
    } catch (err) {
      console.error('Vision analysis error:', err);
      toast.error('Failed to analyze image. Please try again.');
      setAnalysis(null);
      setStatusMessage('Analysis failed');
    } finally {
      setIsAnalyzing(false);
    }
  }, [analysisPrompt, onAnalysisComplete, onOpenChange, stopWebcam]);

  // Start webcam when dialog opens
  useEffect(() => {
    if (open) {
      autoCaptureTriggeredRef.current = false;
      startWebcam();
    } else {
      stopWebcam();
      setAnalysis(null);
      setCapturedImage(null);
      setStatusMessage('Starting camera...');
    }
    
    return () => {
      stopWebcam();
    };
  }, [open, startWebcam, stopWebcam]);

  // Auto-capture when streaming starts (if autoCapture mode)
  useEffect(() => {
    if (autoCapture && isStreaming && !autoCaptureTriggeredRef.current) {
      autoCaptureTriggeredRef.current = true;
      // Small delay to ensure video frame is ready
      const timer = setTimeout(() => {
        captureAndAnalyze();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [autoCapture, isStreaming, captureAndAnalyze]);

  const handleClose = () => {
    stopWebcam();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            {autoCapture ? 'Capturing Your Image...' : 'AI Vision Mode'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Webcam Feed */}
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover ${capturedImage ? 'hidden' : 'block'}`}
            />
            
            {/* Show captured image when analyzing */}
            {capturedImage && (
              <img
                src={capturedImage}
                alt="Captured frame"
                className="w-full h-full object-cover"
              />
            )}
            
            {/* Loading overlay */}
            {isAnalyzing && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center text-white">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                  <p className="text-sm">{statusMessage}</p>
                </div>
              </div>
            )}

            {/* Camera not ready */}
            {!isStreaming && !capturedImage && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Camera className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>{statusMessage}</p>
                </div>
              </div>
            )}
          </div>

          {/* Hidden canvas for capture */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Analysis Result (only in manual mode) */}
          {analysis && !onAnalysisComplete && (
            <div className="p-4 bg-secondary/30 rounded-lg border border-primary/20">
              <h4 className="font-medium text-primary mb-2 flex items-center gap-2">
                <Eye className="h-4 w-4" />
                AI Analysis
              </h4>
              <p className="text-sm text-foreground leading-relaxed">{analysis}</p>
            </div>
          )}

          {/* Actions (only in manual mode) */}
          {!autoCapture && (
            <div className="flex gap-3">
              <Button
                onClick={captureAndAnalyze}
                disabled={!isStreaming || isAnalyzing}
                className="flex-1"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Capture & Analyze
                  </>
                )}
              </Button>
              
              <Button variant="outline" onClick={handleClose}>
                <X className="mr-2 h-4 w-4" />
                Close
              </Button>
            </div>
          )}

          {autoCapture && (
            <div className="flex justify-center">
              <Button variant="outline" onClick={handleClose}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>
          )}

          <p className="text-xs text-muted-foreground text-center">
            Your camera feed is processed securely and not stored.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
