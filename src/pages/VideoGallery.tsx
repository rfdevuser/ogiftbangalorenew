import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

interface VideoLanguage {
  language: string;
  url: string;
}

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  languages: VideoLanguage[];
}

const videos: VideoItem[] = [
  {
    id: '1',
    title: 'Introduction to Fashion Design',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=225&fit=crop',
    languages: [
      { language: 'English', url: 'https://www.newogwebsite.com/OGIFTVideos/EngVideoSmall.mp4' },
      { language: 'Hindi', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { language: 'Kannada', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    ],
  },
  {
    id: '2',
    title: 'Pattern Making Basics',
    thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=225&fit=crop',
    languages: [
      { language: 'English', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { language: 'Hindi', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { language: 'Kannada', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    ],
  },
  {
    id: '3',
    title: 'Textile Science Overview',
    thumbnail: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=225&fit=crop',
    languages: [
      { language: 'English', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { language: 'Hindi', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { language: 'Kannada', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    ],
  },
];

const VideoGallery = () => {
  const navigate = useNavigate();

  const handlePlayVideo = (url: string, title: string, language: string) => {
    navigate('/video', { state: { videoUrl: url, title, language } });
  };

  return (
    <main className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
          Video Library
        </h1>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Select a video and choose your preferred language to start learning.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-video">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Play className="w-12 h-12 text-white" />
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg text-foreground mb-4">{video.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {video.languages.map((lang) => (
                    <Button
                      key={lang.language}
                      variant="outline"
                      size="sm"
                      onClick={() => handlePlayVideo(lang.url, video.title, lang.language)}
                      className="flex items-center gap-1"
                    >
                      <Play className="w-3 h-3" />
                      {lang.language}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
};

export default VideoGallery;
