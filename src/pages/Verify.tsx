import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Shield, ShieldCheck, ShieldX, Search, Blocks, Link2, Clock, FileImage, ArrowLeft, Loader2, Hash } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { shortenHash } from '@/lib/blockchain';

interface BlockResult {
  block_number: number;
  hash: string;
  previous_hash: string;
  timestamp: string;
  data: Record<string, unknown>;
  nonce: number | null;
}

interface AssetResult {
  id: string;
  title: string;
  asset_type: string;
  asset_url: string;
  description: string | null;
  created_at: string;
  token_id: string | null;
  block_hash: string | null;
  block_number: number | null;
}

interface PostResult {
  id: string;
  content: string;
  media_urls: string[] | null;
  created_at: string;
  block_hash: string | null;
  block_number: number | null;
}

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('hash') || searchParams.get('token') || searchParams.get('block') || '');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [block, setBlock] = useState<BlockResult | null>(null);
  const [asset, setAsset] = useState<AssetResult | null>(null);
  const [post, setPost] = useState<PostResult | null>(null);
  const [chainValid, setChainValid] = useState<boolean | null>(null);
  const [stats, setStats] = useState<{ total_blocks: number; total_assets: number; total_posts: number } | null>(null);

  useEffect(() => {
    fetchStats();
    const hash = searchParams.get('hash');
    const token = searchParams.get('token');
    const blockNum = searchParams.get('block');
    if (hash || token || blockNum) {
      setQuery(hash || token || blockNum || '');
      handleLookup(hash || token || blockNum || '');
    }
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await supabase.functions.invoke('verify-chain', {
        body: null,
        method: 'GET',
      });
      // Use query params approach instead
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-chain?action=stats`,
        { headers: { 'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY } }
      );
      const result = await response.json();
      if (result.stats) setStats(result.stats);
    } catch (e) {
      console.error('Stats fetch error:', e);
    }
  };

  const handleLookup = async (searchQuery?: string) => {
    const q = (searchQuery || query).trim();
    if (!q) return;

    setLoading(true);
    setSearched(true);
    setBlock(null);
    setAsset(null);
    setPost(null);
    setChainValid(null);

    try {
      const baseUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-chain`;
      const headers = { 'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY };

      // Determine search type
      const isBlockNumber = /^\d+$/.test(q);
      const isTokenId = q.startsWith('OGIFT-') || q.startsWith('ogift-');

      let lookupUrl: string;
      if (isBlockNumber) {
        lookupUrl = `${baseUrl}?action=lookup&block=${q}`;
      } else if (isTokenId) {
        lookupUrl = `${baseUrl}?action=lookup&token=${q}&hash=${q}`;
      } else {
        lookupUrl = `${baseUrl}?action=lookup&hash=${q}`;
      }

      const lookupRes = await fetch(lookupUrl, { headers });
      const lookupData = await lookupRes.json();

      if (lookupData.status === 'found' && lookupData.block) {
        setBlock(lookupData.block);
        if (lookupData.asset) setAsset(lookupData.asset);

        // Check if the block data references a post or asset
        const blockData = lookupData.block.data as Record<string, unknown>;
        if (blockData?.type === 'post' && blockData?.post_id) {
          const { data: postData } = await supabase
            .from('posts')
            .select('id, content, media_urls, created_at, block_hash, block_number')
            .eq('id', blockData.post_id as string)
            .limit(1)
            .single();
          if (postData) setPost(postData);
        }
        if (blockData?.type === 'digital_asset' && blockData?.asset_id) {
          const { data: assetData } = await supabase
            .from('digital_assets')
            .select('id, title, asset_type, asset_url, description, created_at, token_id, block_hash, block_number')
            .eq('id', blockData.asset_id as string)
            .limit(1)
            .single();
          if (assetData) setAsset(assetData);
        }
      }

      // If it looks like a token, also search assets directly
      if (isTokenId && !asset) {
        const { data: assetData } = await supabase
          .from('digital_assets')
          .select('id, title, asset_type, asset_url, description, created_at, token_id, block_hash, block_number')
          .eq('token_id', q)
          .limit(1)
          .single();
        if (assetData) {
          setAsset(assetData);
          // Also fetch the block for this asset
          if (assetData.block_hash) {
            const blockRes = await fetch(`${baseUrl}?action=lookup&hash=${assetData.block_hash}`, { headers });
            const blockData = await blockRes.json();
            if (blockData.status === 'found') setBlock(blockData.block);
          }
        }
      }

      // Also search by block hash in posts/assets if no block found
      if (!lookupData.block || lookupData.status === 'not_found') {
        // Try finding an asset with this hash
        const { data: assetByHash } = await supabase
          .from('digital_assets')
          .select('id, title, asset_type, asset_url, description, created_at, token_id, block_hash, block_number')
          .eq('block_hash', q)
          .limit(1)
          .single();
        if (assetByHash) setAsset(assetByHash);

        // Try finding a post with this hash
        const { data: postByHash } = await supabase
          .from('posts')
          .select('id, content, media_urls, created_at, block_hash, block_number')
          .eq('block_hash', q)
          .limit(1)
          .single();
        if (postByHash) setPost(postByHash);
      }

      // Verify chain integrity
      const verifyRes = await fetch(`${baseUrl}?action=verify`, { headers });
      const verifyData = await verifyRes.json();
      if (verifyData.chain) {
        setChainValid(verifyData.chain.is_valid);
      }
    } catch (error) {
      console.error('Lookup error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    // Update URL params
    if (/^\d+$/.test(q)) {
      setSearchParams({ block: q });
    } else if (q.startsWith('OGIFT-') || q.startsWith('ogift-')) {
      setSearchParams({ token: q });
    } else {
      setSearchParams({ hash: q });
    }
    handleLookup();
  };

  const hasResults = block || asset || post;

  return (
    <main className="min-h-screen pt-24 pb-12 bg-background">
      <Helmet>
        <title>Verify Fashion Design Certificate | OGIFT Bangalore | Blockchain Verified</title>
        <meta name="description" content="Verify OGIFT Bangalore fashion design certificates & digital assets on blockchain. Authenticate student credentials from Bangalore's 4.9★ best fashion institute." />
        <meta name="keywords" content="verify fashion certificate bangalore, OGIFT certificate verification, fashion design certificate verify, blockchain certificate fashion, Onati Global credentials" />
        <link rel="canonical" href="https://www.ogiftbangalore.com/verify" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">OGIFT Blockchain Verifier</h1>
          </div>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Verify the authenticity and provenance of any student work, digital asset, or community post on the OGIFT educational blockchain.
          </p>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                placeholder="Enter block hash, token ID (OGIFT-xxx), or block number..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="font-mono text-sm"
              />
              <Button type="submit" disabled={loading || !query.trim()}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Chain Status */}
        {stats && (
          <div className="grid grid-cols-3 gap-3 mb-6">
            <Card>
              <CardContent className="pt-4 pb-4 text-center">
                <p className="text-2xl font-bold font-mono">{stats.total_blocks}</p>
                <p className="text-xs text-muted-foreground">Total Blocks</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 pb-4 text-center">
                <p className="text-2xl font-bold font-mono">{stats.total_assets}</p>
                <p className="text-xs text-muted-foreground">Digital Assets</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 pb-4 text-center">
                <p className="text-2xl font-bold font-mono">{stats.total_posts}</p>
                <p className="text-xs text-muted-foreground">Community Posts</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Results */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {searched && !loading && !hasResults && (
          <Card>
            <CardContent className="py-12 text-center">
              <ShieldX className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-lg font-semibold">No Record Found</p>
              <p className="text-sm text-muted-foreground mt-1">
                The hash, token, or block number you entered was not found on the OGIFT blockchain.
              </p>
            </CardContent>
          </Card>
        )}

        {!loading && hasResults && (
          <div className="space-y-4">
            {/* Verification Status */}
            <Card className={chainValid ? 'border-primary/50' : 'border-muted-foreground/50'}>
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center gap-3">
                  {chainValid ? (
                    <ShieldCheck className="h-6 w-6 text-primary" />
                  ) : (
                    <ShieldX className="h-6 w-6 text-muted-foreground" />
                  )}
                  <div>
                    <p className="font-semibold">
                      {chainValid ? 'Blockchain Verified ✓' : 'Verification Pending'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {chainValid
                        ? 'The entire OGIFT chain is intact. This record is authentic.'
                        : 'Chain integrity could not be fully confirmed.'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Block Details */}
            {block && (
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Blocks className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Block #{block.block_number}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-3">
                      <span className="text-muted-foreground w-24 shrink-0">Hash</span>
                      <span className="font-mono text-xs break-all">{block.hash}</span>
                    </div>
                    <Separator />
                    <div className="flex items-start gap-3">
                      <span className="text-muted-foreground w-24 shrink-0">Previous Hash</span>
                      <span className="font-mono text-xs break-all">{block.previous_hash}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground w-24 shrink-0">Timestamp</span>
                      <span className="text-xs flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(block.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground w-24 shrink-0">Type</span>
                      <Badge variant="outline">
                        {(block.data as { type?: string }).type || 'unknown'}
                      </Badge>
                    </div>
                    {block.nonce !== null && (
                      <>
                        <Separator />
                        <div className="flex items-center gap-3">
                          <span className="text-muted-foreground w-24 shrink-0">Nonce</span>
                          <span className="font-mono text-xs">{block.nonce}</span>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Asset Details */}
            {asset && (
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <FileImage className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Digital Asset</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <img
                      src={asset.asset_url}
                      alt={asset.title}
                      className="w-24 h-24 rounded-lg object-cover shrink-0"
                    />
                    <div className="space-y-2 min-w-0">
                      <h3 className="font-semibold">{asset.title}</h3>
                      {asset.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">{asset.description}</p>
                      )}
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">{asset.asset_type}</Badge>
                        {asset.token_id && (
                          <Badge variant="outline" className="font-mono text-xs">
                            <Hash className="h-3 w-3 mr-1" />
                            {asset.token_id}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Created: {new Date(asset.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Post Details */}
            {post && (
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Link2 className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Community Post</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm whitespace-pre-wrap mb-3">{post.content}</p>
                  {post.media_urls && post.media_urls.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {post.media_urls.map((url, i) => (
                        <img key={i} src={url} alt={`Media ${i + 1}`} className="h-20 rounded-lg object-cover" />
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    Posted: {new Date(post.created_at).toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Button variant="ghost" asChild>
            <Link to="/community">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Community
            </Link>
          </Button>
        </div>
      </div>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Verify Your OGIFT Fashion Design Certificate</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>OGIFT's Certificate Verification tool allows employers, educational institutions, and anyone else to verify the authenticity of a fashion design certificate or diploma issued by Onati Global Institute of Fashion Technology (OGIFT) in Bangalore. Certificate verification is an important step in confirming that a candidate's qualification is genuine and was awarded by OGIFT for the completion of a recognised programme. OGIFT is committed to the integrity of its qualifications and provides this verification service to support the hiring decisions of employers across the Indian fashion industry.</p>
              <p>To verify a certificate, enter the certificate number printed on the OGIFT certificate or diploma document. The system will confirm whether the certificate is authentic, which programme it was awarded for, and the date of completion. Employers are encouraged to verify certificates as part of their standard recruitment process. OGIFT certificates are awarded only on successful completion of the full programme, passing required assessments, and meeting attendance requirements — so a verified certificate is a reliable indicator of the skills and knowledge claimed.</p>
              <h3 className="text-xl font-semibold text-foreground mt-2">For Employers and Hiring Managers</h3>
              <p>OGIFT provides verification as a free service to all employers considering candidates who hold OGIFT qualifications. If you are reviewing a candidate who holds an OGIFT certificate or diploma and need confirmation of its authenticity, simply enter the certificate number in the verification tool above. Results are provided instantly. For certificates issued before 2020, or if you have any concerns about the result, contact the OGIFT registrar directly at admissions@ogiftbangalore.com or call +91 90369 28799.</p>
              <h3 className="text-xl font-semibold text-foreground mt-2">About OGIFT Qualifications</h3>
              <p>OGIFT (Onati Global Institute of Fashion Technology) is Bangalore's highest-rated fashion institute, founded in 2010, with a 4.9-star rating based on 250+ Google reviews. The institute awards certificates and diplomas across a comprehensive range of fashion programmes — from 1-month Express Mastery courses to 6-month and 1-year diploma programmes. All OGIFT qualifications are recognised across the Indian fashion industry and are accepted by employers including Fabindia, Raymond, Myntra, Lifestyle, Zara, H&M, and leading boutique design studios across Bangalore and Karnataka.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Related Pages at OGIFT Bangalore</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 max-w-4xl mx-auto">
            <Link to="/admissions" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Admissions 2026</span></Link>
            <Link to="/counsellor" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Free AI Counsellor</span></Link>
            <Link to="/videos" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Fashion Videos</span></Link>
            <Link to="/community" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Community</span></Link>
            <Link to="/faqavatar" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">FAQ Avatar</span></Link>
            <Link to="/courses/fashup-free-taster-sessions" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">FASHUP Free Course</span></Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Verify;
