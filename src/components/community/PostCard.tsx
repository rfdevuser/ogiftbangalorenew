import { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Link2, Trash2, Pencil } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { shortenHash, formatBlockTimestamp } from '@/lib/blockchain';
import { formatDistanceToNow } from 'date-fns';

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

  const isOwner = currentUserId === post.user_id;

  const handleDelete = async () => {
    if (!isOwner) return;
    
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', post.id);
      
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
        // Unlike
        await supabase
          .from('post_likes')
          .delete()
          .eq('post_id', post.id)
          .eq('user_id', currentUserId);
        setLocalLiked(false);
        setLocalLikesCount((c) => Math.max(0, c - 1));
      } else {
        // Like
        await supabase
          .from('post_likes')
          .insert({ post_id: post.id, user_id: currentUserId });
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
    const shareUrl = `${window.location.origin}/community?post=${post.id}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({ title: 'Link copied!', description: 'Post link copied to clipboard.' });
    } catch {
      toast({ title: 'Share', description: 'Could not copy link.' });
    }
  };

  const profile = post.profiles;
  const initials = profile?.display_name?.slice(0, 2).toUpperCase() || 
                   profile?.username?.slice(0, 2).toUpperCase() || 'U';

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={profile?.avatar_url || undefined} />
              <AvatarFallback className="bg-primary/10 text-primary">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">
                {profile?.display_name || profile?.username || 'Unknown User'}
              </p>
              <p className="text-xs text-muted-foreground">
                @{profile?.username || 'anonymous'} • {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
              </p>
            </div>
          </div>
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
      </CardHeader>

      <CardContent className="pt-0 pb-3">
        <p className="text-sm whitespace-pre-wrap">{post.content}</p>
        
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
          </div>
          <Button variant="ghost" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
