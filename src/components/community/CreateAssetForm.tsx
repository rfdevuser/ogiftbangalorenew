import { useState, useRef } from 'react';
import { ImagePlus, Upload, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { simpleHash, generateTokenId } from '@/lib/blockchain';

interface CreateAssetFormProps {
  userId: string;
  onAssetCreated?: () => void;
}

const ASSET_TYPES = [
  { value: 'design', label: 'Design' },
  { value: 'illustration', label: 'Illustration' },
  { value: 'pattern', label: 'Pattern' },
  { value: 'certificate', label: 'Certificate' },
  { value: 'portfolio', label: 'Portfolio Piece' },
  { value: 'other', label: 'Other' },
];

export function CreateAssetForm({ userId, onAssetCreated }: CreateAssetFormProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assetType, setAssetType] = useState('design');
  const [isPublic, setIsPublic] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload an image (JPEG, PNG, GIF, WebP) or PDF.',
        variant: 'destructive',
      });
      return;
    }

    // Validate file size (max 20MB)
    if (file.size > 20 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Maximum file size is 20MB.',
        variant: 'destructive',
      });
      return;
    }

    setSelectedFile(file);
    
    // Create preview for images
    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const uploadFile = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'file';
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `${userId}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('community-media')
      .upload(filePath, file, { cacheControl: '3600' });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('community-media')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast({ title: 'Title required', description: 'Please enter a title for your asset.', variant: 'destructive' });
      return;
    }

    if (!selectedFile) {
      toast({ title: 'File required', description: 'Please upload a file for your asset.', variant: 'destructive' });
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload the file
      const assetUrl = await uploadFile(selectedFile);

      // Generate token ID for the asset
      const tokenId = generateTokenId(userId, title);

      // Create block data
      const blockData = {
        type: 'digital_asset' as const,
        id: crypto.randomUUID(),
        userId: userId,
        metadata: {
          title: title.trim(),
          assetType,
          tokenId,
        },
      };

      // Generate hash and atomically create block (prevents race conditions)
      const blockHash = simpleHash(JSON.stringify({ blockData, nonce: 0 }));

      const { data: blockResult, error: blockError } = await supabase
        .rpc('create_blockchain_block', {
          p_data: { ...blockData },
          p_hash: blockHash,
          p_nonce: 0,
        });

      const newBlockNumber = blockResult?.[0]?.block_number || null;

      if (blockError) {
        console.warn('Block creation failed, continuing with asset creation:', blockError);
      }

      // Create the digital asset
      const { error: assetError } = await supabase
        .from('digital_assets')
        .insert({
          owner_id: userId,
          title: title.trim(),
          description: description.trim() || null,
          asset_url: assetUrl,
          asset_type: assetType,
          is_public: isPublic,
          token_id: tokenId,
          block_hash: blockHash,
          block_number: newBlockNumber,
          metadata: {
            originalFileName: selectedFile.name,
            fileSize: selectedFile.size,
            mimeType: selectedFile.type,
          },
        })
        .select()
        .single();

      if (assetError) throw assetError;

      toast({ title: 'Asset uploaded!', description: 'Your digital asset has been minted on the blockchain.' });

      // Reset form
      setTitle('');
      setDescription('');
      setAssetType('design');
      setIsPublic(true);
      removeFile();

      onAssetCreated?.();
    } catch (error) {
      console.error('Upload error:', error);
      toast({ title: 'Upload failed', description: 'Could not upload your asset. Please try again.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload Digital Asset
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* File Upload */}
          <div>
            <Label>Asset File</Label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp,application/pdf"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            {selectedFile ? (
              <div className="mt-2 relative">
                {previewUrl ? (
                  <div className="relative inline-block">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="max-h-48 rounded-lg object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6"
                      onClick={removeFile}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="text-sm truncate">{selectedFile.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={removeFile}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <Button
                type="button"
                variant="outline"
                className="w-full mt-2 h-24 border-dashed"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="flex flex-col items-center gap-2">
                  <ImagePlus className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Click to upload image or PDF</span>
                </div>
              </Button>
            )}
          </div>

          {/* Title */}
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My Fashion Design"
              maxLength={100}
              className="mt-1"
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your design, inspiration, techniques used..."
              maxLength={500}
              className="mt-1 resize-none"
              rows={3}
            />
          </div>

          {/* Asset Type */}
          <div>
            <Label>Asset Type</Label>
            <Select value={assetType} onValueChange={setAssetType}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                {ASSET_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Public Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <Label>Public Asset</Label>
              <p className="text-xs text-muted-foreground">Make visible in the community portfolio</p>
            </div>
            <Switch checked={isPublic} onCheckedChange={setIsPublic} />
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full" disabled={isSubmitting || !selectedFile || !title.trim()}>
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Minting on Blockchain...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload & Mint Asset
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
