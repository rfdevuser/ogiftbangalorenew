import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Upload, Image, Loader2, Sparkles, MousePointerClick } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import demoSketch from '@/assets/demo-sketch-gown.jpg';
import demoMoodBoard from '@/assets/demo-mood-board.jpg';
import demoIllustration from '@/assets/demo-illustration.jpg';

interface PortfolioItem {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  category: string;
  ai_critique: any;
  critique_summary: string | null;
  scores: any;
  is_public: boolean;
  created_at: string;
  contributor_name?: string | null;
  contributor_city?: string | null;
}

interface UploadSectionProps {
  userId: string;
  onCritiqueComplete: (item?: PortfolioItem) => void;
}

const categories = [
  { value: 'sketch', label: 'Design Sketch' },
  { value: 'mood-board', label: 'Mood Board' },
  { value: 'illustration', label: 'Fashion Illustration' },
  { value: 'pattern', label: 'Pattern / Technical Drawing' },
  { value: 'finished', label: 'Finished Piece / Photo' },
  { value: 'collection', label: 'Collection Board' },
  { value: 'textile', label: 'Textile / Fabric Design' },
  { value: 'draping', label: 'Draping / 3D Work' },
];

const demoDesigns = [
  {
    src: demoSketch,
    title: 'Elegant Evening Gown Sketch',
    category: 'sketch',
    description: 'A pencil sketch of a mermaid-silhouette evening gown with sweetheart neckline.',
    label: 'Design Sketch',
  },
  {
    src: demoMoodBoard,
    title: 'Spring Collection Mood Board',
    category: 'mood-board',
    description: 'Spring-inspired mood board with pastel fabric swatches and color palette.',
    label: 'Mood Board',
  },
  {
    src: demoIllustration,
    title: 'Streetwear Illustration',
    category: 'illustration',
    description: 'Watercolor illustration of a trendy streetwear outfit with oversized jacket.',
    label: 'Illustration',
  },
];

const UploadSection = ({ userId, onCritiqueComplete }: UploadSectionProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [contributorName, setContributorName] = useState('');
  const [contributorCity, setContributorCity] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('sketch');
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleDemoClick = async (demo: typeof demoDesigns[0]) => {
    // Fetch the demo image and convert to File
    const response = await fetch(demo.src);
    const blob = await response.blob();
    const demoFile = new File([blob], `demo-${demo.category}.jpg`, { type: 'image/jpeg' });

    setFile(demoFile);
    setPreview(demo.src);
    setTitle(demo.title);
    setDescription(demo.description);
    setCategory(demo.category);
    setContributorName('Demo User');
    setContributorCity('Bangalore');

    toast({ title: 'Demo design loaded!', description: 'Click "Get AI Critique" to see the tool in action.' });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith('image/')) {
      toast({ title: 'Invalid file', description: 'Please upload an image file.', variant: 'destructive' });
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      toast({ title: 'File too large', description: 'Max file size is 10MB.', variant: 'destructive' });
      return;
    }

    setFile(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = async () => {
    if (!file || !title.trim() || !contributorName.trim() || !contributorCity.trim()) {
      toast({ title: 'Missing info', description: 'Please fill in your name, city, title and upload an image.', variant: 'destructive' });
      return;
    }

    setIsUploading(true);

    try {
      // Upload image to storage
      const fileExt = file.name.split('.').pop();
      const filePath = `${userId}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-uploads')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('portfolio-uploads')
        .getPublicUrl(filePath);

      const imageUrl = urlData.publicUrl;

      setIsUploading(false);
      setIsAnalyzing(true);

      // Get AI critique
      const { data: critiqueData, error: critiqueError } = await supabase.functions.invoke('portfolio-critique', {
        body: { imageUrl, title: title.trim(), category, description: description.trim() },
      });

      if (critiqueError) throw critiqueError;

      const critique = critiqueData?.critique;

      // Save to database so it appears in the gallery
      const { data: savedItem, error: insertError } = await supabase
        .from('portfolio_items' as any)
        .insert({
          user_id: userId,
          title: title.trim(),
          description: description.trim() || null,
          image_url: imageUrl,
          category,
          ai_critique: critique,
          critique_summary: critique?.summary || null,
          scores: critique?.scores || null,
          is_public: true,
          contributor_name: contributorName.trim(),
          contributor_city: contributorCity.trim(),
        })
        .select()
        .single();

      if (insertError) {
        console.error('Failed to save portfolio item:', insertError);
      }

      const portfolioItem: PortfolioItem = savedItem
        ? (savedItem as unknown as PortfolioItem)
        : {
            id: crypto.randomUUID(),
            title: title.trim(),
            description: description.trim() || null,
            image_url: imageUrl,
            category,
            ai_critique: critique,
            critique_summary: critique?.summary || null,
            scores: critique?.scores || null,
            is_public: true,
            created_at: new Date().toISOString(),
          };

      toast({ title: 'Portfolio piece analyzed! ✨', description: 'Your AI critique is ready to view.' });

      // Reset form
      setFile(null);
      setPreview(null);
      setTitle('');
      setContributorName('');
      setContributorCity('');
      setDescription('');
      setCategory('sketch');
      if (fileInputRef.current) fileInputRef.current.value = '';

      onCritiqueComplete(portfolioItem);
    } catch (error: any) {
      console.error('Upload/critique error:', error);
      toast({ title: 'Error', description: error.message || 'Something went wrong.', variant: 'destructive' });
    } finally {
      setIsUploading(false);
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="border-2 border-dashed border-primary/30 hover:border-primary/50 transition-colors">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Upload & Get AI Critique
        </CardTitle>
        <CardDescription>
          Upload your design work and receive instant professional-level feedback on proportion, color theory, trend alignment, and more.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Demo Designs Section */}
        {!file && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <MousePointerClick className="h-4 w-4" />
              Try with a demo design
            </div>
            <div className="grid grid-cols-3 gap-3">
              {demoDesigns.map((demo) => (
                <button
                  key={demo.category}
                  onClick={() => handleDemoClick(demo)}
                  className="group relative rounded-xl overflow-hidden border-2 border-border hover:border-primary/50 transition-all hover:shadow-md"
                >
                  <img
                    src={demo.src}
                    alt={demo.title}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute bottom-1.5 left-1.5 right-1.5 text-[11px] font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity text-center">
                    {demo.label}
                  </span>
                </button>
              ))}
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">or upload your own</span>
              </div>
            </div>
          </div>
        )}
        <div
          className="relative border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary/40 transition-colors bg-muted/30"
          onClick={() => fileInputRef.current?.click()}
        >
          {preview ? (
            <div className="relative">
              <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded-lg object-contain" />
              <p className="text-sm text-muted-foreground mt-2">Click to change image</p>
            </div>
          ) : (
            <div className="py-8">
              <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
              <p className="text-sm font-medium">Drop your design here or click to upload</p>
              <p className="text-xs text-muted-foreground mt-1">Supports JPG, PNG, WebP • Max 10MB</p>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Contributor Info */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="contributorName">Your Name *</Label>
            <Input
              id="contributorName"
              placeholder="e.g., Priya Sharma"
              value={contributorName}
              onChange={(e) => setContributorName(e.target.value)}
              maxLength={100}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contributorCity">City *</Label>
            <Input
              id="contributorCity"
              placeholder="e.g., Bangalore"
              value={contributorCity}
              onChange={(e) => setContributorCity(e.target.value)}
              maxLength={100}
            />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            placeholder="e.g., Spring Collection Sketch #3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Notes for the AI (optional)</Label>
          <Textarea
            id="description"
            placeholder="Add context: target audience, inspiration, techniques used, specific areas you want feedback on..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
            rows={3}
          />
        </div>

        {/* Submit */}
        <Button
          onClick={handleSubmit}
          disabled={!file || !title.trim() || !contributorName.trim() || !contributorCity.trim() || isUploading || isAnalyzing}
          className="w-full"
          size="lg"
        >
          {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isAnalyzing && <Sparkles className="mr-2 h-4 w-4 animate-pulse" />}
          {isUploading ? 'Uploading...' : isAnalyzing ? 'AI is analyzing your design...' : 'Get AI Critique'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default UploadSection;
