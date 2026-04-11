import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Loader2, Sparkles, Blocks, LogIn, LogOut, Wallet, Palette, Link2, Award, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { PostCard } from '@/components/community/PostCard';
import { CreatePostForm } from '@/components/community/CreatePostForm';
import { DigitalAssetCard } from '@/components/community/DigitalAssetCard';
import { CreateAssetForm } from '@/components/community/CreateAssetForm';
import { shortenHash } from '@/lib/blockchain';
import { TrendingSidebar } from '@/components/community/TrendingSidebar';
import KnowYourRights from '@/components/community/KnowYourRights';

interface Post {
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
}

interface DigitalAsset {
  id: string;
  title: string;
  description: string | null;
  asset_url: string;
  asset_type: string;
  token_id: string | null;
  block_hash: string | null;
  block_number: number | null;
  created_at: string;
  owner_id: string;
}

interface BlockchainBlock {
  id: string;
  block_number: number;
  hash: string;
  previous_hash: string;
  timestamp: string;
  data: Record<string, unknown>;
}

const Community = () => {
  const { user, profile, isAuthenticated, loading: authLoading, signOut } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [assets, setAssets] = useState<DigitalAsset[]>([]);
  const [blocks, setBlocks] = useState<BlockchainBlock[]>([]);
  const [userLikes, setUserLikes] = useState<Set<string>>(new Set());
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingAssets, setLoadingAssets] = useState(true);
  const [activeTab, setActiveTab] = useState('feed');
  const [activeHashtag, setActiveHashtag] = useState<string | null>(null);
  const [prefillContent, setPrefillContent] = useState('');

  const fetchPosts = useCallback(async () => {
    setLoadingPosts(true);
    
    // First fetch posts
    const { data: postsData, error: postsError } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (postsError || !postsData) {
      setLoadingPosts(false);
      return;
    }

    // Get unique user IDs
    const userIds = [...new Set(postsData.map((p) => p.user_id))];
    
    // Fetch profiles for these users
    const { data: profilesData } = await supabase
      .from('profiles')
      .select('user_id, username, display_name, avatar_url')
      .in('user_id', userIds);

    // Create a map of user_id to profile
    const profileMap = new Map(profilesData?.map((p) => [p.user_id, p]) || []);

    // Transform posts with profiles
    const transformedPosts: Post[] = postsData.map((post) => {
      const profile = profileMap.get(post.user_id);
      return {
        id: post.id,
        content: post.content,
        media_urls: post.media_urls || [],
        likes_count: post.likes_count || 0,
        comments_count: post.comments_count || 0,
        block_hash: post.block_hash,
        block_number: post.block_number,
        created_at: post.created_at,
        user_id: post.user_id,
        profiles: profile ? {
          username: profile.username,
          display_name: profile.display_name,
          avatar_url: profile.avatar_url,
        } : undefined,
      };
    });
    
    setPosts(transformedPosts);
    setLoadingPosts(false);
  }, []);

  const fetchUserLikes = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from('post_likes')
      .select('post_id')
      .eq('user_id', user.id);
    
    if (data) {
      setUserLikes(new Set(data.map((l) => l.post_id)));
    }
  }, [user]);

  const fetchAssets = useCallback(async () => {
    setLoadingAssets(true);
    const { data, error } = await supabase
      .from('digital_assets')
      .select('*')
      .eq('is_public', true)
      .order('created_at', { ascending: false })
      .limit(20);

    if (!error && data) {
      setAssets(data);
    }
    setLoadingAssets(false);
  }, []);

  const fetchBlocks = useCallback(async () => {
    const { data, error } = await supabase
      .from('blockchain_blocks')
      .select('*')
      .order('block_number', { ascending: false })
      .limit(10);

    if (!error && data) {
      const transformedBlocks: BlockchainBlock[] = data.map((block) => ({
        id: block.id,
        block_number: block.block_number,
        hash: block.hash,
        previous_hash: block.previous_hash,
        timestamp: block.timestamp,
        data: (typeof block.data === 'object' && block.data !== null ? block.data : {}) as Record<string, unknown>,
      }));
      setBlocks(transformedBlocks);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
    fetchAssets();
    fetchBlocks();
  }, [fetchPosts, fetchAssets, fetchBlocks]);

  useEffect(() => {
    if (user) {
      fetchUserLikes();
    }
  }, [user, fetchUserLikes]);

  const handleSignOut = async () => {
    await signOut();
  };

  const initials = profile?.display_name?.slice(0, 2).toUpperCase() || 
                   profile?.username?.slice(0, 2).toUpperCase() || 'U';

  return (
    <main className="min-h-screen pt-24 pb-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar - Profile & Stats */}
          <aside className="lg:w-80 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">OGIFT Community</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  A blockchain-powered student network for fashion enthusiasts. Share your journey, showcase designs, and build your digital portfolio.
                </p>
              </CardContent>
            </Card>

            {isAuthenticated && profile ? (
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={profile.avatar_url || undefined} />
                      <AvatarFallback className="bg-primary/10 text-primary">{initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{profile.display_name || profile.username}</p>
                      <p className="text-sm text-muted-foreground truncate">@{profile.username}</p>
                    </div>
                  </div>

                  {profile.wallet_address && (
                    <div className="p-3 bg-muted rounded-lg mb-4">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                        <Wallet className="h-3 w-3" />
                        Your Wallet
                      </div>
                      <p className="font-mono text-xs truncate">{shortenHash(profile.wallet_address, 8)}</p>
                    </div>
                  )}

                  <Button variant="outline" asChild className="w-full mb-2">
                    <Link to={`/reputation?user=${user!.id}`}>
                      <Award className="h-4 w-4 mr-2" />
                      My Reputation
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="pt-4 text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    Sign in to post, like, and build your digital portfolio.
                  </p>
                  <Button asChild className="w-full">
                    <Link to="/community/auth">
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In / Sign Up
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Blockchain Stats */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Blocks className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Blockchain</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Blocks</span>
                  <span className="font-mono">{blocks.length > 0 ? blocks[0].block_number : 0}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Latest Hash</span>
                  <span className="font-mono text-xs">{blocks[0] ? shortenHash(blocks[0].hash, 4) : '...'}</span>
                </div>
                <Separator />
                <p className="text-xs text-muted-foreground">
                  Every post and digital asset is recorded on our educational blockchain.
                </p>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <div className="flex-1 max-w-2xl">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full mb-4">
                <TabsTrigger value="feed" className="flex-1">Feed</TabsTrigger>
                <TabsTrigger value="portfolio" className="flex-1">Portfolio</TabsTrigger>
                <TabsTrigger value="rights" className="flex-1">
                  <Shield className="h-4 w-4 mr-1" />
                  Your Rights
                </TabsTrigger>
                <TabsTrigger value="blockchain" className="flex-1">Blockchain</TabsTrigger>
              </TabsList>

              <TabsContent value="feed" className="space-y-4">
                {isAuthenticated && profile && (
                  <CreatePostForm 
                    userId={user!.id} 
                    profile={profile} 
                    onPostCreated={fetchPosts}
                    prefillContent={prefillContent}
                    onPrefillConsumed={() => setPrefillContent('')}
                  />
                )}

                {activeHashtag && (
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <Badge variant="secondary">{activeHashtag}</Badge>
                    <span className="text-sm text-muted-foreground">Filtering posts</span>
                    <Button variant="ghost" size="sm" className="ml-auto h-7 text-xs" onClick={() => setActiveHashtag(null)}>
                      Clear filter
                    </Button>
                  </div>
                )}

                {loadingPosts ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (() => {
                  const keyword = activeHashtag?.replace('#', '') || '';
                  // Split camelCase hashtag into individual words for broader matching
                  const words = keyword.split(/(?=[A-Z0-9])/).map((w) => w.toLowerCase()).filter(Boolean);
                  const filtered = activeHashtag
                    ? posts.filter((p) => {
                        const text = p.content.toLowerCase();
                        return text.includes(activeHashtag.toLowerCase()) || 
                               text.includes(keyword.toLowerCase()) ||
                               words.some((w) => w.length > 2 && text.includes(w));
                      })
                    : posts;
                  return filtered.length === 0 ? (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <p className="text-muted-foreground">
                          {activeHashtag ? `No posts found with ${activeHashtag}` : 'No posts yet. Be the first to share!'}
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    filtered.map((post) => (
                      <PostCard
                        key={post.id}
                        post={post}
                        currentUserId={user?.id}
                        hasLiked={userLikes.has(post.id)}
                        onLikeToggle={() => fetchUserLikes()}
                        onDelete={() => fetchPosts()}
                      />
                    ))
                  );
                })()}
              </TabsContent>

              <TabsContent value="portfolio" className="space-y-4">
                {isAuthenticated && user && (
                  <CreateAssetForm userId={user.id} onAssetCreated={fetchAssets} />
                )}

                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Digital Assets
                  </h2>
                </div>

                {loadingAssets ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : assets.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <p className="text-muted-foreground">No digital assets yet. Portfolio showcase coming soon!</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {assets.map((asset) => (
                      <DigitalAssetCard
                        key={asset.id}
                        asset={asset}
                        isOwner={user?.id === asset.owner_id}
                        onShareToFeed={(a) => {
                          const text = `🎨 Check out my digital asset: "${a.title}"\n${a.description || ''}\n\n${a.asset_url}`;
                          setPrefillContent(text.trim());
                          setActiveTab('feed');
                        }}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="rights">
                <KnowYourRights />
              </TabsContent>

              <TabsContent value="blockchain" className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Link2 className="h-5 w-5" />
                  <h2 className="text-xl font-semibold">Block Explorer</h2>
                </div>

                {blocks.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <p className="text-muted-foreground">Loading blockchain...</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {blocks.map((block, index) => (
                      <Card key={block.id} className={index === 0 ? 'border-primary' : ''}>
                        <CardContent className="py-4">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant={index === 0 ? 'default' : 'secondary'}>
                              Block #{block.block_number}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(block.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <div className="space-y-1 text-xs font-mono">
                            <div className="flex gap-2">
                              <span className="text-muted-foreground w-16">Hash:</span>
                              <span className="truncate">{block.hash}</span>
                            </div>
                            <div className="flex gap-2">
                              <span className="text-muted-foreground w-16">Prev:</span>
                              <span className="truncate">{block.previous_hash}</span>
                            </div>
                            <div className="flex gap-2">
                              <span className="text-muted-foreground w-16">Type:</span>
                              <Badge variant="outline" className="text-xs">
                                {(block.data as { type?: string }).type || 'unknown'}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar - Trending */}
          <TrendingSidebar
            activeTag={activeHashtag}
            onHashtagClick={(tag) => {
              setActiveHashtag((prev) => (prev === tag ? null : tag));
              setActiveTab('feed');
            }}
          />
        </div>
      </div>
    </main>
  );
};

export default Community;
