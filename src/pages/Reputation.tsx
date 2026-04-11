import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Star, Heart, MessageCircle, FileText, Palette, Share2, Copy, 
  Award, TrendingUp, Loader2, ArrowLeft, CheckCircle2 
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface ReputationData {
  total_likes_received: number;
  total_comments_received: number;
  total_posts: number;
  total_assets: number;
  reputation_score: number;
  reputation_level: string;
}

interface ProfileData {
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  wallet_address: string | null;
  bio: string | null;
}

const LEVEL_CONFIG: Record<string, { color: string; icon: string; nextLevel: string; nextThreshold: number }> = {
  'Explorer': { color: 'bg-muted text-muted-foreground', icon: '🌱', nextLevel: 'Newcomer', nextThreshold: 10 },
  'Newcomer': { color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300', icon: '⭐', nextLevel: 'Rising Star', nextThreshold: 50 },
  'Rising Star': { color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300', icon: '🌟', nextLevel: 'Trendsetter', nextThreshold: 100 },
  'Trendsetter': { color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300', icon: '🔥', nextLevel: 'Style Maven', nextThreshold: 200 },
  'Style Maven': { color: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300', icon: '👑', nextLevel: 'Fashion Legend', nextThreshold: 500 },
  'Fashion Legend': { color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300', icon: '🏆', nextLevel: '', nextThreshold: 999 },
};

const Reputation = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { toast } = useToast();

  const walletParam = searchParams.get('wallet');
  const userIdParam = searchParams.get('user');

  const [reputation, setReputation] = useState<ReputationData | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [targetUserId, setTargetUserId] = useState<string | null>(null);

  // Determine which user to show
  useEffect(() => {
    const resolveUser = async () => {
      setLoading(true);

      let userId: string | null = null;

      if (userIdParam) {
        userId = userIdParam;
      } else if (walletParam) {
        const { data } = await supabase
          .from('profiles')
          .select('user_id')
          .eq('wallet_address', walletParam)
          .single();
        userId = data?.user_id || null;
      } else if (user) {
        userId = user.id;
      }

      if (!userId) {
        setLoading(false);
        return;
      }

      setTargetUserId(userId);

      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('username, display_name, avatar_url, wallet_address, bio')
        .eq('user_id', userId)
        .single();

      if (profileData) setProfile(profileData);

      // Fetch reputation
      const { data: repData, error } = await supabase.rpc('get_user_reputation', {
        p_user_id: userId,
      });

      if (!error && repData && repData.length > 0) {
        setReputation(repData[0]);
      }

      setLoading(false);
    };

    resolveUser();
  }, [userIdParam, walletParam, user]);

  const handleShare = async () => {
    if (!profile?.wallet_address) return;
    const url = `${window.location.origin}/reputation?wallet=${profile.wallet_address}`;
    try {
      await navigator.clipboard.writeText(url);
      toast({ title: 'Link copied!', description: 'Share your reputation card with anyone.' });
    } catch {
      toast({ title: 'Error', description: 'Could not copy link.' });
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen pt-24 pb-12 bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </main>
    );
  }

  if (!profile || !reputation) {
    return (
      <main className="min-h-screen pt-24 pb-12 bg-background">
        <div className="container mx-auto px-4 max-w-lg text-center">
          <Card>
            <CardContent className="py-12">
              <p className="text-muted-foreground mb-4">
                {!user ? 'Sign in to see your reputation score.' : 'Profile not found.'}
              </p>
              <Button asChild>
                <Link to="/community/auth">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Go to Community
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  const levelConfig = LEVEL_CONFIG[reputation.reputation_level] || LEVEL_CONFIG['Explorer'];
  const progressToNext = levelConfig.nextThreshold > 0
    ? Math.min(100, (reputation.reputation_score / levelConfig.nextThreshold) * 100)
    : 100;

  const isOwnProfile = user?.id === targetUserId;
  const initials = profile.display_name?.slice(0, 2).toUpperCase() || profile.username.slice(0, 2).toUpperCase();

  return (
    <main className="min-h-screen pt-24 pb-12 bg-background">
      <div className="container mx-auto px-4 max-w-lg space-y-4">
        {/* Main Reputation Card */}
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-background p-6 text-center">
            <Avatar className="h-20 w-20 mx-auto mb-3 ring-4 ring-background shadow-lg">
              <AvatarImage src={profile.avatar_url || undefined} />
              <AvatarFallback className="bg-primary text-primary-foreground text-xl">{initials}</AvatarFallback>
            </Avatar>
            <h1 className="text-xl font-bold">{profile.display_name || profile.username}</h1>
            <p className="text-sm text-muted-foreground">@{profile.username}</p>
            {profile.bio && <p className="text-sm mt-2 text-muted-foreground">{profile.bio}</p>}
          </div>

          <CardContent className="pt-6">
            {/* Score */}
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-primary mb-1">{reputation.reputation_score}</div>
              <Badge className={`text-sm px-3 py-1 ${levelConfig.color}`}>
                {levelConfig.icon} {reputation.reputation_level}
              </Badge>
            </div>

            {/* Progress to next level */}
            {levelConfig.nextLevel && (
              <div className="mb-6">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>{reputation.reputation_level}</span>
                  <span>{levelConfig.nextLevel}</span>
                </div>
                <Progress value={progressToNext} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1 text-center">
                  {levelConfig.nextThreshold - reputation.reputation_score} points to {levelConfig.nextLevel}
                </p>
              </div>
            )}

            <Separator className="my-4" />

            {/* Breakdown */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Heart className="h-5 w-5 text-red-500 shrink-0" />
                <div>
                  <p className="text-lg font-semibold">{reputation.total_likes_received}</p>
                  <p className="text-xs text-muted-foreground">Likes Received</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <MessageCircle className="h-5 w-5 text-blue-500 shrink-0" />
                <div>
                  <p className="text-lg font-semibold">{reputation.total_comments_received}</p>
                  <p className="text-xs text-muted-foreground">Comments Received</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <FileText className="h-5 w-5 text-green-500 shrink-0" />
                <div>
                  <p className="text-lg font-semibold">{reputation.total_posts}</p>
                  <p className="text-xs text-muted-foreground">Posts Created</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Palette className="h-5 w-5 text-purple-500 shrink-0" />
                <div>
                  <p className="text-lg font-semibold">{reputation.total_assets}</p>
                  <p className="text-xs text-muted-foreground">Assets Minted</p>
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Scoring formula */}
            <div className="text-xs text-muted-foreground space-y-1 mb-4">
              <p className="font-medium text-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> How scores work
              </p>
              <p>❤️ Each like = 1 pt · 💬 Each comment = 2 pts · 📝 Each post = 5 pts · 🎨 Each asset = 10 pts</p>
            </div>

            {/* Verification badge */}
            {profile.wallet_address && (
              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg text-xs">
                <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Blockchain Verified</p>
                  <p className="font-mono text-muted-foreground truncate">{profile.wallet_address}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Share Actions */}
        <div className="flex gap-2">
          {profile.wallet_address && (
            <Button onClick={handleShare} className="flex-1">
              <Share2 className="h-4 w-4 mr-2" />
              Share Reputation Card
            </Button>
          )}
          <Button variant="outline" asChild className="flex-1">
            <Link to="/community">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Community
            </Link>
          </Button>
        </div>

        {/* OGIFT branding */}
        <p className="text-center text-xs text-muted-foreground">
          Reputation powered by OGIFT Blockchain · Onati Global Institute of Fashion Technology
        </p>
      </div>
    </main>
  );
};

export default Reputation;
