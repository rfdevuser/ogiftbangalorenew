import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Share2, MoreHorizontal, Link2, Trash2, Languages, Loader2, Sparkles, Star, ChevronDown, ChevronUp, GraduationCap, ArrowRight } from 'lucide-react';
import { ReputationBadge } from '@/components/community/ReputationBadge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { shortenHash } from '@/lib/blockchain';
import { formatDistanceToNow } from 'date-fns';
import { getAllCourses } from '@/data/courseCategories';

interface PostCardProps {
  post: {
    id: string;
    content: string;
    media_urls: string[];
    likes_count: number;
    comments_count: number;
    block_hash: string | null;
    block_number: number | null;
    created_at: string;
    user_id: string;
    profiles?: {
      username: string;
      display_name: string | null;
      avatar_url: string | null;
    };
  };
  currentUserId?: string;
  hasLiked?: boolean;
  onLikeToggle?: () => void;
  onCommentClick?: () => void;
  onDelete?: (postId: string) => void;
}

const LANGUAGE_LABELS: Record<string, string> = {
  hi: 'हिन्दी',
  ta: 'தமிழ்',
  te: 'తెలుగు',
  kn: 'ಕನ್ನಡ',
};

export function PostCard({ 
  post, 
  currentUserId, 
  hasLiked = false, 
  onLikeToggle,
  onCommentClick,
  onDelete
}: PostCardProps) {
  const { toast } = useToast();
  const [isLiking, setIsLiking] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [localLiked, setLocalLiked] = useState(hasLiked);
  const [localLikesCount, setLocalLikesCount] = useState(post.likes_count);

  // Translation state
  const [detectedLang, setDetectedLang] = useState<string | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  // AI Critique state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [critique, setCritique] = useState<any>(null);
  const [critiqueExpanded, setCritiqueExpanded] = useState(false);

  const isOwner = currentUserId === post.user_id;

  // Detect language on mount
  useEffect(() => {
    const detectLanguage = async () => {
      if (!post.content || post.content.trim().length < 3) return;
      
      // Quick heuristic: check for non-Latin characters
      const hasNonLatin = /[^\u0000-\u007F]/.test(post.content);
      if (!hasNonLatin) {
        setDetectedLang('en');
        return;
      }

      setIsDetecting(true);
      try {
        const { data, error } = await supabase.functions.invoke('translate-text', {
          body: { text: post.content.slice(0, 200), action: 'detect' },
        });
        if (!error && data?.language) {
          setDetectedLang(data.language);
        }
      } catch (err) {
        console.error('Language detection failed:', err);
      } finally {
        setIsDetecting(false);
      }
    };

    detectLanguage();
  }, [post.content]);

  const handleTranslate = async () => {
    if (translatedText) {
      setShowTranslation(!showTranslation);
      return;
    }

    setIsTranslating(true);
    try {
      const { data, error } = await supabase.functions.invoke('translate-text', {
        body: { text: post.content, action: 'translate' },
      });
      if (error) throw error;
      setTranslatedText(data.translated_text);
      setShowTranslation(true);
    } catch (err) {
      console.error('Translation failed:', err);
      toast({ title: 'Translation failed', description: 'Could not translate the post.', variant: 'destructive' });
    } finally {
      setIsTranslating(false);
    }
  };

  const handleDelete = async () => {
    if (!isOwner) return;
    setIsDeleting(true);
    try {
      const { error } = await supabase.from('posts').delete().eq('id', post.id);
      if (error) throw error;
      toast({ title: 'Post deleted', description: 'Your post has been removed.' });
      onDelete?.(post.id);
    } catch (error) {
      console.error('Delete error:', error);
      toast({ title: 'Error', description: 'Could not delete post.', variant: 'destructive' });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleLike = async () => {
    if (!currentUserId) {
      toast({ title: 'Sign in required', description: 'Please sign in to like posts.', variant: 'destructive' });
      return;
    }
    setIsLiking(true);
    try {
      if (localLiked) {
        await supabase.from('post_likes').delete().eq('post_id', post.id).eq('user_id', currentUserId);
        setLocalLiked(false);
        setLocalLikesCount((c) => Math.max(0, c - 1));
      } else {
        await supabase.from('post_likes').insert({ post_id: post.id, user_id: currentUserId });
        setLocalLiked(true);
        setLocalLikesCount((c) => c + 1);
      }
      onLikeToggle?.();
    } catch (error) {
      console.error('Like error:', error);
    } finally {
      setIsLiking(false);
    }
  };

  const handleShare = async () => {
    const shareUrl = post.block_hash
      ? `${window.location.origin}/verify?hash=${post.block_hash}`
      : `${window.location.origin}/community?post=${post.id}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({ 
        title: post.block_hash ? 'Verified link copied!' : 'Link copied!', 
        description: post.block_hash 
          ? 'Anyone can verify this post on the OGIFT blockchain.' 
          : 'Post link copied to clipboard.' 
      });
    } catch {
      toast({ title: 'Share', description: 'Could not copy link.' });
    }
  };

  const hasImages = post.media_urls && post.media_urls.length > 0;

  const handleAnalyzeDesign = async () => {
    if (!hasImages) return;
    setIsAnalyzing(true);
    try {
      const imageUrl = post.media_urls[0];
      const { data, error } = await supabase.functions.invoke('portfolio-critique', {
        body: {
          imageUrl,
          title: `Design from ${post.profiles?.display_name || post.profiles?.username || 'community'}`,
          category: 'fashion design',
          description: post.content.slice(0, 200),
        },
      });
      if (error) throw error;
      if (data?.critique) {
        setCritique(data.critique);
        setCritiqueExpanded(true);
      }
    } catch (err: any) {
      console.error('Analysis failed:', err);
      toast({ title: 'Analysis failed', description: err.message || 'Please try again.', variant: 'destructive' });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const scores = critique?.scores;
  const scoreLabels: Record<string, string> = {
    proportion: 'Proportion', colorTheory: 'Color', technicalExecution: 'Technique',
    trendAlignment: 'Trends', commercialViability: 'Commercial', creativity: 'Creativity',
    presentationQuality: 'Presentation',
  };

  const profileData = post.profiles;
  const initials = profileData?.display_name?.slice(0, 2).toUpperCase() || 
                   profileData?.username?.slice(0, 2).toUpperCase() || 'U';

  const isNonEnglish = detectedLang && detectedLang !== 'en';
  const langLabel = detectedLang ? LANGUAGE_LABELS[detectedLang] : null;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={profileData?.avatar_url || undefined} />
              <AvatarFallback className="bg-primary/10 text-primary">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-sm">
                  {profileData?.display_name || profileData?.username || 'Unknown User'}
                </p>
                <ReputationBadge userId={post.user_id} />
              </div>
              <p className="text-xs text-muted-foreground">
                @{profileData?.username || 'anonymous'} • {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {langLabel && (
              <Badge variant="secondary" className="text-xs">
                {langLabel}
              </Badge>
            )}
            {isOwner && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-popover">
                  <DropdownMenuItem 
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    {isDeleting ? 'Deleting...' : 'Delete post'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 pb-3">
        <p className="text-sm whitespace-pre-wrap">{post.content}</p>
        
        {/* Translation section */}
        {isNonEnglish && (
          <div className="mt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleTranslate}
              disabled={isTranslating}
              className="text-xs text-primary hover:text-primary/80 px-2 h-7 gap-1"
            >
              {isTranslating ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <Languages className="h-3 w-3" />
              )}
              {showTranslation ? 'Show original' : 'Translate to English'}
            </Button>
            {showTranslation && translatedText && (
              <div className="mt-2 p-3 rounded-md bg-muted/50 border border-border">
                <p className="text-xs text-muted-foreground mb-1 font-medium">English translation</p>
                <p className="text-sm whitespace-pre-wrap">{translatedText}</p>
              </div>
            )}
          </div>
        )}

        {post.media_urls && post.media_urls.length > 0 && (
          <div className={`mt-3 grid gap-2 ${post.media_urls.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {post.media_urls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Post media ${index + 1}`}
                className="rounded-lg w-full object-cover max-h-80"
              />
            ))}
          </div>
        )}

        {/* AI Critique Results */}
        {critique && (
          <div className="mt-3 border border-primary/20 rounded-lg p-3 bg-primary/5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold">AI Design Analysis</span>
              </div>
              {scores?.overall && (
                <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full">
                  <Star className="h-3 w-3 text-primary fill-primary" />
                  <span className="text-sm font-bold text-primary">{scores.overall}/10</span>
                </div>
              )}
            </div>

            {critique.summary && (
              <p className="text-sm text-muted-foreground">{critique.summary}</p>
            )}

            {/* Score bars */}
            {scores && (
              <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                {Object.entries(scoreLabels).map(([key, label]) => {
                  const score = scores[key];
                  if (!score) return null;
                  const color = score >= 8 ? 'bg-green-500' : score >= 6 ? 'bg-yellow-500' : 'bg-orange-500';
                  return (
                    <div key={key} className="space-y-0.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">{label}</span>
                        <span className="font-medium">{score}</span>
                      </div>
                      <div className="h-1 bg-muted rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${color}`} style={{ width: `${score * 10}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {critiqueExpanded && (
              <div className="space-y-3 pt-1">
                <Separator />
                {critique.strengths?.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold mb-1">✨ Strengths</p>
                    <ul className="space-y-0.5">
                      {critique.strengths.map((s: string, i: number) => (
                        <li key={i} className="text-xs text-muted-foreground">• {s}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {critique.improvements?.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold mb-1">📈 Improve</p>
                    <ul className="space-y-0.5">
                      {critique.improvements.map((s: string, i: number) => (
                        <li key={i} className="text-xs text-muted-foreground">• {s}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {critique.actionableNextSteps?.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold mb-1">💡 Next Steps</p>
                    <ol className="space-y-0.5">
                      {critique.actionableNextSteps.map((s: string, i: number) => (
                        <li key={i} className="text-xs text-muted-foreground">{i + 1}. {s}</li>
                      ))}
                    </ol>
                  </div>
                )}
                {/* Recommended Courses */}
                {critique.recommendedCourses?.length > 0 && (
                  <div>
                    <Separator className="my-1" />
                    <p className="text-xs font-semibold flex items-center gap-1 mb-2">
                      <GraduationCap className="h-3 w-3 text-primary" /> Recommended Courses
                    </p>
                    <div className="space-y-2">
                      {critique.recommendedCourses.map((rec: { slug: string; reason: string }, i: number) => {
                        const course = getAllCourses().find(c => c.slug === rec.slug);
                        if (!course) return null;
                        return (
                          <div key={i} className="flex items-start gap-2 bg-background rounded-md p-2 border">
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium">{course.title}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">{rec.reason}</p>
                            </div>
                            <Button asChild size="sm" variant="outline" className="shrink-0 h-7 text-xs">
                              <Link to={`/courses/${rec.slug}`}>
                                Explore <ArrowRight className="ml-1 h-3 w-3" />
                              </Link>
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCritiqueExpanded(!critiqueExpanded)}
              className="text-xs w-full"
            >
              {critiqueExpanded ? <ChevronUp className="h-3 w-3 mr-1" /> : <ChevronDown className="h-3 w-3 mr-1" />}
              {critiqueExpanded ? 'Show Less' : 'Full Analysis'}
            </Button>
          </div>
        )}

        {post.block_hash && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="mt-3 flex items-center gap-2">
                <Badge variant="outline" className="text-xs font-mono gap-1">
                  <Link2 className="h-3 w-3" />
                  Block #{post.block_number}
                </Badge>
                <span className="text-xs text-muted-foreground font-mono">
                  {shortenHash(post.block_hash, 4)}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-mono text-xs">{post.block_hash}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </CardContent>

      <CardFooter className="border-t pt-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              disabled={isLiking}
              className={localLiked ? 'text-red-500 hover:text-red-600' : ''}
            >
              <Heart className={`h-4 w-4 mr-1 ${localLiked ? 'fill-current' : ''}`} />
              {localLikesCount}
            </Button>
            <Button variant="ghost" size="sm" onClick={onCommentClick}>
              <MessageCircle className="h-4 w-4 mr-1" />
              {post.comments_count}
            </Button>
            {hasImages && !critique && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleAnalyzeDesign}
                disabled={isAnalyzing}
                className="text-primary hover:text-primary/80"
              >
                {isAnalyzing ? (
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4 mr-1" />
                )}
                {isAnalyzing ? 'Analyzing...' : 'Analyze'}
              </Button>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
