import { Helmet } from 'react-helmet-async';
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
      <Helmet>
        <title>Fashion Design Video Lessons Bangalore | OGIFT | Free Learning 2026</title>
        <meta name="description" content="Watch fashion design video lessons at OGIFT Bangalore — pattern making, garment construction, styling & more in English, Hindi & Kannada. 4.9★ rated best fashion institute. Admissions 2026 open!" />
        <meta name="keywords" content="fashion design video lessons bangalore, free fashion design videos, pattern making video course, fashion tutorial hindi kannada, OGIFT videos, Onati Global video gallery, online fashion learning 2026, fashion design tutorial bangalore" />
        <link rel="canonical" href="https://www.ogiftbangalore.com/videos" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Fashion Design Video Lessons | OGIFT Bangalore" />
        <meta property="og:description" content="Free fashion design video tutorials at OGIFT Bangalore in English, Hindi & Kannada. Pattern making, garment construction, styling & more." />
        <meta property="og:url" content="https://www.ogiftbangalore.com/videos" />
        <meta property="og:type" content="website" />
      </Helmet>
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

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Fashion Design Video Lessons — OGIFT Bangalore</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>OGIFT's Fashion Design Video Gallery is a free resource of fashion education video lessons covering key topics from across OGIFT's course curriculum — available to current students, graduates, and anyone curious about fashion design. The videos cover fashion illustration techniques, pattern making demonstrations, draping and fabric manipulation, garment construction methods, styling tips, and faculty insights from OGIFT's experienced teaching team. Each video is produced at the OGIFT campus in Vinayakanagar, Bengaluru, giving viewers an authentic look at what learning fashion design at OGIFT is really like.</p>
              <p>The video library is regularly updated with new content from OGIFT faculty across all course specialisations. Short tutorial videos make it easy to learn a specific skill quickly — how to draft a basic bodice block, how to sketch a fashion figure in the correct proportions, how to identify fabric types by hand feel, or how to create a mood board for a collection. Longer documentary-style videos give an inside view of OGIFT's teaching philosophy, campus culture, and graduate success stories. All videos are in English, Hindi, and Kannada.</p>
              <h3 className="text-xl font-semibold text-foreground mt-2">Who Should Watch?</h3>
              <p>The OGIFT video library is valuable for prospective students who want to experience OGIFT's teaching style before enrolling, current students who want to review class content or catch up on a missed topic, graduates who want to refresh a skill, and anyone learning fashion independently who wants structured, expert-guided instruction. The videos are completely free and require no registration to watch. New videos are added regularly, so return often to find new content.</p>
              <h3 className="text-xl font-semibold text-foreground mt-2">Take Your Learning Further</h3>
              <p>If you enjoy the video content and want a structured, faculty-guided fashion education, OGIFT's full range of courses — from the free FASHUP 10-day taster to diploma programmes — is available at the campus in Vinayakanagar, Bengaluru. You can also enrol in OGIFT's 3-month online fashion course, which brings structured curriculum and live faculty access to students anywhere in India. To learn more or book a campus visit, contact the OGIFT admissions team at +91 90369 28799 or email admissions@ogiftbangalore.com.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Related Digital Learning Resources at OGIFT</h2>
          <p className="text-muted-foreground leading-relaxed">
            OGIFT's video library complements several other digital learning resources. Students who want a structured preview of OGIFT's online curriculum can take the free <Link to="/quicktour" className="text-primary underline hover:no-underline font-medium">Quick Tour</Link> — a 20-minute AI-powered introduction to the 3-month online course. The full <Link to="/courses/onlinecourse" className="text-primary underline hover:no-underline font-medium">3-Month Online Fashion Design course</Link> provides a complete structured curriculum with live faculty sessions. The <Link to="/interactive-training" className="text-primary underline hover:no-underline font-medium">Interactive Fashion Training platform</Link> offers AI-driven adaptive lessons on specific fashion design topics, available any time.
          </p>
        </div>
      </section>
    </main>
  );
};

export default VideoGallery;
