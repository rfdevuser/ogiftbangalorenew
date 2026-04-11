import { useState, useRef, useEffect } from 'react';
import { ImagePlus, Loader2, Send, X, Tag, ChevronDown, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { simpleHash } from '@/lib/blockchain';

const TAG_CATEGORIES: Record<string, string[]> = {
  'Technique': ['Embroidery', 'Draping', 'Pleating', 'Appliqué', 'Block Print', 'Tie-Dye', 'Batik', 'Crochet', 'Knitting', 'Screen Print'],
  'Fabric': ['Silk', 'Cotton', 'Chiffon', 'Georgette', 'Velvet', 'Denim', 'Linen', 'Organza', 'Satin', 'Khadi'],
  'Occasion': ['Bridal', 'Party', 'Casual', 'Festive', 'Office', 'Resort', 'Cocktail', 'Mehendi', 'Sangeet', 'Reception'],
  'Style': ['Indian Ethnic', 'Western', 'Fusion', 'Streetwear', 'Sustainable', 'Minimalist', 'Bohemian', 'Vintage'],
};

interface CreatePostFormProps {
  userId: string;
  profile: {
    username: string;
    display_name: string | null;
    avatar_url: string | null;
  } | null;
  onPostCreated?: () => void;
  prefillContent?: string;
  onPrefillConsumed?: () => void;
}

export function CreatePostForm({ userId, profile, onPostCreated, prefillContent, onPrefillConsumed }: CreatePostFormProps) {
  const { toast } = useToast();
  const [content, setContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagPopoverOpen, setTagPopoverOpen] = useState(false);
  const [originalityFlag, setOriginalityFlag] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle prefill from "Share to Feed"
  useEffect(() => {
    if (prefillContent) {
      setContent(prefillContent);
      onPrefillConsumed?.();
    }
  }, [prefillContent, onPrefillConsumed]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : prev.length < 5 ? [...prev, tag] : prev
    );
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files).slice(0, 4 - selectedImages.length); // Max 4 images
    
    // Validate file sizes (max 10MB each)
    const validFiles = newFiles.filter((file) => {
      if (file.size > 10 * 1024 * 1024) {
        toast({ title: 'File too large', description: `${file.name} exceeds 10MB limit.`, variant: 'destructive' });
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setSelectedImages((prev) => [...prev, ...validFiles]);

    // Create previews
    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews((prev) => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });

    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async (): Promise<string[]> => {
    if (selectedImages.length === 0) return [];

    setIsUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (const file of selectedImages) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('community-media')
          .upload(fileName, file);

        if (uploadError) {
          console.error('Upload error:', uploadError);
          throw uploadError;
        }

        const { data: publicUrl } = supabase.storage
          .from('community-media')
          .getPublicUrl(fileName);

        uploadedUrls.push(publicUrl.publicUrl);
      }

      return uploadedUrls;
    } catch (error) {
      console.error('Image upload failed:', error);
      toast({ title: 'Upload failed', description: 'Could not upload images. Please try again.', variant: 'destructive' });
      return [];
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim() && selectedImages.length === 0) {
      toast({ title: 'Empty post', description: 'Please write something or add media to share.', variant: 'destructive' });
      return;
    }

    if (content.length > 1000) {
      toast({ title: 'Post too long', description: 'Posts must be under 1000 characters.', variant: 'destructive' });
      return;
    }

    setIsPosting(true);
    setOriginalityFlag(null);

    try {
      // --- Originality check before posting ---
      setIsChecking(true);
      const imageBase64List: string[] = [];
      for (const file of selectedImages) {
        const base64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(file);
        });
        imageBase64List.push(base64);
      }

      const { data: checkResult, error: checkError } = await supabase.functions.invoke('check-originality', {
        body: { content: content.trim(), imageBase64List },
      });

      setIsChecking(false);

      if (checkError) {
        console.warn('Originality check failed, allowing post:', checkError);
      } else if (checkResult?.plagiarismDetected || checkResult?.aiImageDetected || checkResult?.stockImageDetected) {
        const messages: string[] = [];
        if (checkResult.plagiarismDetected) messages.push('Text content appears copied from an existing post.');
        if (checkResult.aiImageDetected) messages.push('One or more images appear to be AI-generated.');
        if (checkResult.stockImageDetected) messages.push('One or more images appear to be downloaded from the internet, not original work.');
        setOriginalityFlag(`⚠️ This work is not original. ${messages.join(' ')}`);
        if (checkResult.details?.length) {
          console.warn('Originality details:', checkResult.details);
        }
        setIsPosting(false);
        return;
      }

      // Upload images
      const mediaUrls = await uploadImages();
      
      if (selectedImages.length > 0 && mediaUrls.length === 0) {
        setIsPosting(false);
        return;
      }

      // Append tags as hashtags to content
      const tagHashtags = selectedTags.map((t) => `#${t.replace(/\s+/g, '')}`).join(' ');
      const fullContent = [content.trim(), tagHashtags].filter(Boolean).join('\n\n');

      // Create block data
      const blockData = {
        type: 'post' as const,
        id: crypto.randomUUID(),
        userId,
        content: content.slice(0, 100),
        hasMedia: mediaUrls.length > 0,
        timestamp: new Date().toISOString(),
      };

      // Generate block hash
      const blockHash = simpleHash(JSON.stringify({ blockData, nonce: 0 }));

      // Atomically create block on chain (prevents race conditions)
      const { data: blockResult, error: blockError } = await supabase
        .rpc('create_blockchain_block', {
          p_data: { ...blockData },
          p_hash: blockHash,
          p_nonce: 0,
        });

      const newBlockNumber = blockResult?.[0]?.block_number || null;

      // Create the post with blockchain reference
      const { error: postError } = await supabase
        .from('posts')
        .insert({
          user_id: userId,
          content: fullContent,
          media_urls: mediaUrls,
          block_hash: blockHash,
          block_number: newBlockNumber,
        })
        .select()
        .single();

      if (postError) throw postError;

      if (blockError) {
        console.warn('Block creation failed, post still created:', blockError);
      }

      setContent('');
      setSelectedImages([]);
      setImagePreviews([]);
      setSelectedTags([]);
      setOriginalityFlag(null);
      toast({ title: 'Posted!', description: `Your post has been recorded on block #${newBlockNumber}.` });
      onPostCreated?.();
    } catch (error) {
      console.error('Post error:', error);
      toast({ title: 'Error', description: 'Failed to create post. Please try again.', variant: 'destructive' });
    } finally {
      setIsPosting(false);
    }
  };

  const initials = profile?.display_name?.slice(0, 2).toUpperCase() || 
                   profile?.username?.slice(0, 2).toUpperCase() || 'U';

  const canAddMoreImages = selectedImages.length < 4;

  return (
    <Card>
      <CardContent className="pt-4">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={profile?.avatar_url || undefined} />
              <AvatarFallback className="bg-primary/10 text-primary">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3">
              <Textarea
                placeholder="Share your fashion journey, designs, or thoughts... ✍️ Type in English, हिन्दी, தமிழ், తెలుగు, or ಕನ್ನಡ"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[100px] resize-none"
                maxLength={1000}
              />
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-xs text-muted-foreground">
                  🌐 Vernacular support: English, Hindi, Tamil, Telugu, Kannada
                </p>
                <Popover open={tagPopoverOpen} onOpenChange={setTagPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button type="button" variant="outline" size="sm" className="h-7 text-xs gap-1">
                      <Tag className="h-3 w-3" />
                      Tags {selectedTags.length > 0 && `(${selectedTags.length}/5)`}
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-3" align="start">
                    <p className="text-sm font-medium mb-2">Tag your work (max 5)</p>
                    {Object.entries(TAG_CATEGORIES).map(([category, tags]) => (
                      <div key={category} className="mb-3">
                        <p className="text-xs font-semibold text-muted-foreground mb-1.5">{category}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                              className="cursor-pointer text-xs hover:bg-primary/20 transition-colors"
                              onClick={() => toggleTag(tag)}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </PopoverContent>
                </Popover>
              </div>

              {/* Selected tags display */}
              {selectedTags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {selectedTags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1 text-xs">
                      #{tag.replace(/\s+/g, '')}
                      <button type="button" onClick={() => toggleTag(tag)} className="ml-0.5 hover:text-destructive">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              {/* Originality flag */}
              {originalityFlag && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/30">
                  <ShieldAlert className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-destructive">This work is not original</p>
                    <p className="text-xs text-destructive/80 mt-1">{originalityFlag}</p>
                    <button
                      type="button"
                      onClick={() => setOriginalityFlag(null)}
                      className="text-xs text-muted-foreground underline mt-1"
                    >
                      Dismiss and edit
                    </button>
                  </div>
                </div>
              )}

              {/* Image previews */}
              {imagePreviews.length > 0 && (
                <div className={`grid gap-2 ${imagePreviews.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="rounded-lg w-full h-32 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 p-1 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    multiple
                    onChange={handleImageSelect}
                    className="hidden"
                    id="image-upload"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={!canAddMoreImages || isPosting}
                  >
                    <ImagePlus className="h-4 w-4 mr-1" />
                    Media {selectedImages.length > 0 && `(${selectedImages.length}/4)`}
                  </Button>
                  <span className="text-xs text-muted-foreground">
                    {content.length}/1000
                  </span>
                </div>
                <Button type="submit" disabled={isPosting || isUploading || (!content.trim() && selectedImages.length === 0)}>
                {(isPosting || isUploading || isChecking) ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4 mr-2" />
                  )}
                  {isChecking ? 'Checking...' : isUploading ? 'Uploading...' : 'Post'}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
