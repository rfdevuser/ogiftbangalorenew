import { Link2, ExternalLink, Award, Palette, Star, FileImage, Share2 } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { shortenHash, formatBlockTimestamp } from '@/lib/blockchain';

interface DigitalAssetCardProps {
  asset: {
    id: string;
    title: string;
    description: string | null;
    asset_url: string;
    asset_type: string;
    token_id: string | null;
    block_hash: string | null;
    block_number: number | null;
    created_at: string;
  };
  isOwner?: boolean;
}

const assetTypeConfig: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string; label: string }> = {
  design: { icon: Palette, color: 'bg-purple-500/10 text-purple-500', label: 'Design' },
  certificate: { icon: Award, color: 'bg-yellow-500/10 text-yellow-500', label: 'Certificate' },
  artwork: { icon: FileImage, color: 'bg-blue-500/10 text-blue-500', label: 'Artwork' },
  achievement: { icon: Star, color: 'bg-green-500/10 text-green-500', label: 'Achievement' },
};

export function DigitalAssetCard({ asset, isOwner }: DigitalAssetCardProps) {
  const { toast } = useToast();
  const config = assetTypeConfig[asset.asset_type] || assetTypeConfig.design;
  const Icon = config.icon;

  const handleShareVerified = async () => {
    const url = asset.block_hash
      ? `${window.location.origin}/verify?hash=${asset.block_hash}`
      : asset.token_id
        ? `${window.location.origin}/verify?token=${asset.token_id}`
        : null;
    if (!url) {
      toast({ title: 'Not yet verified', description: 'This asset is pending blockchain verification.' });
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      toast({ title: 'Verified link copied!', description: 'Anyone can verify this asset on the OGIFT blockchain.' });
    } catch {
      toast({ title: 'Error', description: 'Could not copy link.' });
    }
  };

  return (
    <Card className="overflow-hidden group">
      <div className="aspect-square relative bg-muted">
        <img
          src={asset.asset_url}
          alt={asset.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <Badge className={config.color}>
            <Icon className="h-3 w-3 mr-1" />
            {config.label}
          </Badge>
        </div>
        {isOwner && (
          <div className="absolute top-2 left-2">
            <Badge variant="secondary">Owned</Badge>
          </div>
        )}
      </div>

      <CardContent className="pt-4">
        <h3 className="font-semibold truncate">{asset.title}</h3>
        {asset.description && (
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{asset.description}</p>
        )}
        
        {asset.token_id && (
          <div className="mt-2">
            <Badge variant="outline" className="font-mono text-xs">
              {asset.token_id}
            </Badge>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0 pb-4 flex items-center justify-between">
        {asset.block_hash ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Link2 className="h-3 w-3" />
                Block #{asset.block_number}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-mono text-xs">{asset.block_hash}</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <span className="text-xs text-muted-foreground">Pending verification</span>
        )}
        
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={handleShareVerified} title="Copy verified link">
            <Share2 className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href={asset.asset_url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3 w-3" />
            </a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
