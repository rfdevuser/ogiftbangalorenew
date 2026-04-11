import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { TrendingUp, Flame, Heart, Zap, Loader2, MessageCircle, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';

interface TrendingPost {
  id: string;
  content: string;
  likes_count: number;
  comments_count: number;
  created_at: string;
  user_id: string;
  username?: string;
}

const FASHION_TOPICS = [
  { tag: '#SustainableFashion', count: 'Trending' },
  { tag: '#IndianEthnic', count: 'Hot' },
  { tag: '#StreetStyle2026', count: 'Rising' },
  { tag: '#HandloomRevival', count: 'Popular' },
  { tag: '#DigitalFashion', count: 'New' },
];

interface TrendingSidebarProps {
  onHashtagClick?: (tag: string) => void;
  activeTag?: string | null;
}

export function TrendingSidebar({ onHashtagClick, activeTag }: TrendingSidebarProps) {
  const [topPosts, setTopPosts] = useState<TrendingPost[]>([]);
  const [recentActivity, setRecentActivity] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<TrendingPost | null>(null);

  const fetchTrending = async () => {
    // Top posts by engagement (likes + comments) from last 7 days
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const { data: postsData } = await supabase
      .from('posts')
      .select('id, content, likes_count, comments_count, created_at, user_id')
      .gte('created_at', weekAgo)
      .order('likes_count', { ascending: false })
      .limit(5);

    if (postsData && postsData.length > 0) {
      const userIds = [...new Set(postsData.map((p) => p.user_id))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, username')
        .in('user_id', userIds);

      const profileMap = new Map(profiles?.map((p) => [p.user_id, p.username]) || []);

      setTopPosts(
        postsData.map((p) => ({
          id: p.id,
          content: p.content,
          likes_count: p.likes_count || 0,
          comments_count: p.comments_count || 0,
          created_at: p.created_at,
          user_id: p.user_id,
          username: profileMap.get(p.user_id) || 'anonymous',
        }))
      );
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchTrending();

    // Subscribe to realtime post changes
    const channel = supabase
      .channel('trending-posts')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'posts' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newPost = payload.new as any;
            const preview = newPost.content?.slice(0, 40) || 'New post';
            setRecentActivity((prev) => [
              `🆕 ${preview}${newPost.content?.length > 40 ? '…' : ''}`,
              ...prev.slice(0, 4),
            ]);
          } else if (payload.eventType === 'UPDATE') {
            // Refresh trending when likes change
            fetchTrending();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <aside className="hidden xl:block w-64 space-y-4">
      {/* Trending Topics */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Flame className="h-5 w-5 text-destructive" />
            Trending Now
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {FASHION_TOPICS.map((topic, i) => (
            <button
              key={i}
              onClick={() => onHashtagClick?.(topic.tag)}
              className={`flex items-center justify-between w-full text-left rounded-md px-2 py-1.5 transition-colors hover:bg-muted ${
                activeTag === topic.tag ? 'bg-primary/10 ring-1 ring-primary/30' : ''
              }`}
            >
              <span className="text-sm font-medium text-primary">{topic.tag}</span>
              <Badge
                variant={topic.count === 'Hot' ? 'destructive' : 'secondary'}
                className="text-xs"
              >
                {topic.count}
              </Badge>
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Live Activity Feed */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Zap className="h-4 w-4 text-accent" />
            Live Activity
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentActivity.length > 0 ? (
            <ul className="space-y-2">
              {recentActivity.map((item, i) => (
                <li key={i} className="text-xs text-muted-foreground border-l-2 border-primary/30 pl-2">
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-muted-foreground">Watching for new activity…</p>
          )}
        </CardContent>
      </Card>

      {/* Top Posts This Week */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            Top Posts This Week
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-4">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </div>
          ) : topPosts.length === 0 ? (
            <p className="text-xs text-muted-foreground">No trending posts yet. Start sharing!</p>
          ) : (
            <ul className="space-y-3">
              {topPosts.map((post, i) => (
                <li
                  key={post.id}
                  className="cursor-pointer rounded-md p-1.5 -mx-1.5 transition-colors hover:bg-muted"
                  onClick={() => setSelectedPost(post)}
                >
                  <p className="text-xs leading-relaxed line-clamp-2">
                    {post.content}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <span>@{post.username}</span>
                    <span className="flex items-center gap-0.5">
                      <Heart className="h-3 w-3" /> {post.likes_count}
                    </span>
                  </div>
                  {i < topPosts.length - 1 && <Separator className="mt-2" />}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Post Detail Dialog */}
      <Dialog open={!!selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)}>
        <DialogContent className="sm:max-w-lg">
          {selectedPost && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {selectedPost.username?.slice(0, 2).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold">@{selectedPost.username}</p>
                    <p className="text-xs font-normal text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDistanceToNow(new Date(selectedPost.created_at), { addSuffix: true })}
                    </p>
                  </div>
                </DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{selectedPost.content}</p>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground border-t pt-3">
                <span className="flex items-center gap-1.5">
                  <Heart className="h-4 w-4" /> {selectedPost.likes_count} likes
                </span>
                <span className="flex items-center gap-1.5">
                  <MessageCircle className="h-4 w-4" /> {selectedPost.comments_count} comments
                </span>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </aside>
  );
}
