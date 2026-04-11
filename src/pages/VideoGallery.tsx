import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, MessageCircle } from 'lucide-react';
import { useEffect } from 'react';

interface VideoLanguage {
  language: string;
  url: string;
}

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  languages: VideoLanguage[];
  credits: number;
}

const videos: VideoItem[] = [
  {
    id: '1',
    title: 'Introduction to Fashion Design Part 1',
    thumbnail: '/images/courses/IntroToFD.png',
    languages: [
      { language: 'English', url: 'English/IntroductionToFashionDesigningPart1Comp.mp4' },
      { language: 'Hindi', url: 'Hindi/IntroductionToFashionDesigningHindiPart1Comp.mp4' },
      { language: 'Kannada', url: 'Kannada/IntroductionToFashionDesigningKannadaPART1Comp.mp4' },
    ],
    credits: 5,
  },
  {
    id: '1',
    title: 'Introduction to Fashion Design Part 2',
    thumbnail: '/images/courses/IntroToFD.png',
    languages: [
      { language: 'English', url: 'English/IntroductionToFashionDesigningPart2Comp.mp4' },
      { language: 'Hindi', url: 'Hindi/IntroductionToFashionDesigningHindiPart2Comp.mp4' },
      { language: 'Kannada', url: 'Kannada/IntroductionToFashionDesigningKannadaPART2Comp.mp4' },
    ],
    credits: 5,
  },
  {
    id: '1',
    title: 'Introduction to Fashion Design Part 3',
    thumbnail: '/images/courses/IntroToFD.png',
    languages: [
      { language: 'English', url: 'English/IntroductionToFashionDesigningPart3Comp.mp4' },
      { language: 'Hindi', url: 'Hindi/IntroductionToFashionDesigningHindiPart3Comp.mp4' },
      { language: 'Kannada', url: 'Kannada/IntroductionToFashionDesigningKannadaPART3Comp.mp4' },
    ],
    credits: 5,
  },
  {
    id: '2',
    title: 'Fashion Terminologies Part 1',
    thumbnail: '/images/courses/fashion-terminologies.jpg',
    languages: [
      { language: 'English', url: 'English/FashionTerminologiesEnglishPart1Comp.mp4' },
      { language: 'Hindi', url: 'Hindi/FashionTerminologiesHindiPart1Comp.mp4' },
      { language: 'Kannada', url: 'Kannada/FashionTerminologiesKannadaPart1Comp.mp4' },
    ],
    credits: 5,
  },
  {
    id: '2',
    title: 'Fashion Terminologies Part 2',
    thumbnail: '/images/courses/fashion-terminologies.jpg',
    languages: [
      { language: 'English', url: 'English/FashionTerminologiesPart2Comp.mp4' },
      { language: 'Hindi', url: 'Hindi/FashionTerminologiesHindiPart2Comp.mp4' },
      { language: 'Kannada', url: 'Kannada/FashionTerminologiesKannadaPart2Comp.mp4' },
    ],
    credits: 5,
  },
  {
    id: '3',
    title: 'Fashion Fundamentals Part 1',
    thumbnail: '/images/courses/fashion-fundamentals.jpg',
    languages: [
      { language: 'English', url: 'English/FashionFundamentalsPart1Comp.mp4' },
      { language: 'Hindi', url: 'Hindi/FashionFundamentalsHindiPart1Comp.mp4' },
      { language: 'Kannada', url: 'Kannada/FashionFundamentalsKannadaPart1Comp.mp4' },
    ],
    credits: 5,
  },
  {
    id: '3',
    title: 'Fashion Fundamentals Part 2',
    thumbnail: '/images/courses/fashion-fundamentals.jpg',
    languages: [
      { language: 'English', url: 'English/FashionFundamentalsPart2Comp.mp4' },
      { language: 'Hindi', url: 'Hindi/FashionFundamentalsHindiPart2Comp.mp4' },
      { language: 'Kannada', url: 'Kannada/FashionFundamentalsKannadaPart2Comp.mp4' },
    ],
    credits: 5,
  },
  {
    id: '3',
    title: 'Fashion Fundamentals Part 3',
    thumbnail: '/images/courses/fashion-fundamentals.jpg',
    languages: [
      { language: 'English', url: 'English/FashionFundamentalsPart3Comp.mp4' },
      { language: 'Hindi', url: 'Hindi/FashionFundamentalsHindiPart3Comp.mp4' },
      { language: 'Kannada', url: 'Kannada/FashionFundamentalsKannadaPart3Comp.mp4' },
    ],
    credits: 5,
  },
  {
    id: '3',
    title: 'Fashion Fundamentals Part 4',
    thumbnail: '/images/courses/fashion-fundamentals.jpg',
    languages: [
      { language: 'English', url: 'English/FashionFundamentalsPart4Comp.mp4' },
      { language: 'Hindi', url: 'Hindi/FashionFundamentalsHindiPart4Comp.mp4' },
      { language: 'Kannada', url: 'Kannada/FashionFundamentalsKannadaPart4Comp.mp4' },
    ],
    credits: 5,
  },
  {
    id: '4',
    title: 'Basic Pattern Making - A Line Frock Pattern Measurement',
    thumbnail: '/images/courses/pattern-making.jpg',
    languages: [
      { language: 'English', url: 'English/measurewithcaptionscompressedenglish.mp4' },
      { language: 'Hindi', url: 'Hindi/measurewithcaptionscompressedhindi.mp4' },
     
      // { language: 'Kannada', url: 'Kannada/FashionFundamentalsKannadaPart4Comp.mp4' },
    ],
    credits: 5,
  },
  {
    id: '4',
    title: 'Basic Pattern Making - A Line Frock Pattern Making',
    thumbnail: '/images/courses/pattern-making.jpg',
    languages: [
      { language: 'English', url: 'English/patternalinefrockwithcaptionsenglishcompressed.mp4' },
      { language: 'Hindi', url: 'Hindi/patternalinefrockwithcaptionsHindicompressed.mp4' },
      // { language: 'Kannada', url: 'Kannada/FashionFundamentalsKannadaPart4Comp.mp4' },
    ],
    credits: 5,
  },
{
    id: '5',
    title: 'Basic Pattern Making - A Line Frock Sleeve Measurement',
    thumbnail: '/images/courses/pattern-making.jpg',
    languages: [
      { language: 'English', url: 'English/sleevemeasurementenglishwithcaptionscompressed.mp4' },
      { language: 'Hindi', url: 'Hindi/sleevemeasurementhindiwithcaptionscompressed.mp4' },
     
      // { language: 'Kannada', url: 'Kannada/FashionFundamentalsKannadaPart4Comp.mp4' },
    ],
    credits: 5,
  },
  {
    id: '5',
    title: 'Basic Pattern Making - A Line Frock Sleeve Pattern Making',
    thumbnail: '/images/courses/pattern-making.jpg',
    languages: [
      { language: 'English', url: 'English/sleevepatternenglishwithcaptionscompressed.mp4' },
      { language: 'Hindi', url: 'Hindi/sleevepatternhindiwithcaptionscompressed.mp4' },
      // { language: 'Kannada', url: 'Kannada/FashionFundamentalsKannadaPart4Comp.mp4' },
    ],
    credits: 5,
  },

  
];

const VideoGallery = () => {
  const navigate = useNavigate();

  const handlePlayVideo = (url: string, title: string, language: string, credits: number) => {
    navigate('/video', { state: { videoUrl: url, title, language, credits } });
  };

  const STORAGE_KEY = 'avatar_student_info';
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        alert("Please log in and return.");
        navigate('/ai-avatar');
      }
    } catch {
      // Ignore parse errors
    }
  }, [navigate]);

  return (
    <main className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
          Courses Library
        </h1>
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full"
            asChild
          >
            <Link to="/ai-avatar-chat">
              <MessageCircle className="w-4 h-4 mr-2" />
              Return to Dashboard
            </Link>
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full"
            asChild
          >
            <Link to="/faqavatar">
              Have a technical query
            </Link>
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full"
            asChild
          >
            <Link to="https://www.newogwebsite.com/AssetGallery" target="_blank">
              Visit The Assets Gallery
            </Link>
          </Button>
          
        </div>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Select a video and choose your preferred language to start learning.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <Card key={`${video.id}-${video.title}-${index}`} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-video">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <p style={{ fontWeight: 'bold' }}>Credits Required : {video.credits} per session</p>
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
                      onClick={() => handlePlayVideo(lang.url, video.title, lang.language, video.credits)}
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
