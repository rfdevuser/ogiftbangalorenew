
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route,useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseCategory from "./pages/CourseCategory";
import About from "./pages/About";
import Placements from "./pages/Placements";
import Admissions from "./pages/Admissions"
import NotFound from "./pages/NotFound";
import Makeapayment from "./pages/NewPayment";
import RegistrationPage from "./pages/components/RegistrationPage";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import StructuredData from "./components/StructuredData";
import FloatingAssistant from "./components/FloatingAssistant";
import { ApolloProvider } from "@apollo/client/react";
import { apolloClient } from "@/lib/apolloClient";
import VideoGallery from "./pages/VideoGallery";
import VideoPlayer from "./pages/VideoPlayer";
import AIAvatar from "./pages/AIAvatar"
import AIAvatarLogin from "./pages/AIAvatarLogin";
import FAQAvatar from "./pages/FAQAvatar";
import TermsAndConditions from "./pages/TermsAndConditions";
import CreditPackages from "./pages/CreditPackages";
import { HelmetProvider } from "react-helmet-async";
import Dashboard from "./pages/Dashboard";
import QuickTour from "./pages/QuickTour";
import MetaPixel from "./components/MetaPixel";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToTop from "./components/ScrollToTop";
import FashupCourse from "./pages/courses/FashupCourse";
import FashionIllustrationCourse from "./pages/courses/FashionIllustrationCourse";
import PatternMakingBasicCourse from "./pages/courses/PatternMakingBasicCourse";
import PatternMakingBlousesAdvancedCourse from "./pages/courses/PatternMakingBlousesAdvancedCourse";
import PatternMakingWesternAdvancedCourse from "./pages/courses/PatternMakingWesternAdvancedCourse";
import ArtOfGarmentFoundationCourse from "./pages/courses/ArtOfGarmentFoundationCourse";
import FabricKnowledgeTextileDesigningCourse from "./pages/courses/FabricKnowledgeTextileDesigningCourse";
import DrapingTechnologyCourse from "./pages/courses/DrapingTechnologyCourse";
import DigitalPortfolioMakingCourse from "./pages/courses/DigitalPortfolioMakingCourse";
import GraphicDesigningForFashionCourse from "./pages/courses/GraphicDesigningForFashionCourse";
import FashionDesigningBoutiqueManagementCourse from "./pages/courses/FashionDesigningBoutiqueManagementCourse";
import FashionStylingCourse from "./pages/courses/FashionStylingCourse";
import PatternMakingKidsClothingCourse from "./pages/courses/PatternMakingKidsClothingCourse";
import PatternMakingBoutiqueManagement3MonthsCourse from "./pages/courses/PatternMakingBoutiqueManagement3MonthsCourse";
import DesignProcessPatternMaking3MonthsCourse from "./pages/courses/DesignProcessPatternMaking3MonthsCourse";
import DesignPatternMakingPortfolio3MonthsCourse from "./pages/courses/DesignPatternMakingPortfolio3MonthsCourse";
import SixMonthsDiplomaFashionDesigning from "./pages/courses/SixMonthsDiplomaFashionDesigning";
import OneYearAdvancedDiplomaFashionDesigning from "./pages/courses/OneYearAdvancedDiplomaFashionDesigning";
import ThreeMonthsOnlineFashionCourse from "./pages/courses/ThreeMonthsOnlineFashionCourse";
import Counsellor from "./pages/Counsellor";
import PortfolioBuilder from "./pages/PortfolioBuilder";
import Community from "./pages/community/Index";
import CommunityAuth from "./pages/community/Auth";
import WorkFromHome from "./pages/careers/WorkFromHome";

import WfhTerms from "./pages/careers/WfhTerms";
import WfhDashboard from "./pages/careers/WfhDashboard";
import FabricSimulation from "./pages/FabricSimulation";
import InteractiveTraining from "./pages/InteractiveTraining";
import Verify from "./pages/Verify";
import Reputation from "./pages/Reputation";

const queryClient = new QueryClient();

const RouteTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
   (window as any).gtag?.('config', 'G-HCQVM0WPYP', {
  page_path: location.pathname + location.search,
});
  }, [location]);
  
  return null;
};



const App = () => {
  
  useEffect(() => {
    // This fires after React has fully mounted and hydrated
    document.getElementById('root')?.classList.add('hydrated')
  }, [])
  
  return (
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
  <ApolloProvider client={apolloClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <StructuredData />
      
      <WhatsAppButton />
      {/* <FloatingAssistant /> */}
      <BrowserRouter>
      <MetaPixel />
      <RouteTracker/>
      <ScrollToTop />
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/category/:categoryId" element={<CourseCategory />} />
          <Route path="/courses/fashup-free-taster-sessions" element={<FashupCourse />} />
          <Route path="/courses/fashion-illustration" element={<FashionIllustrationCourse />} />
          <Route path="/courses/pattern-making-basic" element={<PatternMakingBasicCourse />} />
          <Route path="/courses/pattern-making-blouses-advanced" element={<PatternMakingBlousesAdvancedCourse />} />
          <Route path="/courses/pattern-making-western-advanced" element={<PatternMakingWesternAdvancedCourse />} />
          <Route path="/courses/art-of-garment-foundation" element={<ArtOfGarmentFoundationCourse />} />
          <Route path="/courses/fabric-knowledge-textile-designing" element={<FabricKnowledgeTextileDesigningCourse />} />
          <Route path="/courses/draping-technology" element={<DrapingTechnologyCourse />} />
          <Route path="/courses/digital-portfolio-making" element={<DigitalPortfolioMakingCourse />} />
          <Route path="/courses/graphic-designing-for-fashion" element={<GraphicDesigningForFashionCourse />} />
          <Route path="/courses/fashion-designing-boutique-management" element={<FashionDesigningBoutiqueManagementCourse />} />
          <Route path="/courses/fashion-styling" element={<FashionStylingCourse />} />
          <Route path="/courses/pattern-making-kids-clothing" element={<PatternMakingKidsClothingCourse />} />
          <Route path="/courses/pattern-making-boutique-management-3months" element={<PatternMakingBoutiqueManagement3MonthsCourse />} />
          <Route path="/courses/design-process-pattern-making-3months" element={<DesignProcessPatternMaking3MonthsCourse />} />
          <Route path="/courses/design-pattern-making-portfolio-3months" element={<DesignPatternMakingPortfolio3MonthsCourse />} />
          <Route path="/courses/six-months-diploma-fashion-designing" element={<SixMonthsDiplomaFashionDesigning />} />
          <Route path="/courses/one-year-advanced-diploma-fashion-designing" element={<OneYearAdvancedDiplomaFashionDesigning />} />
          <Route path="/courses/onlinecourse" element={<ThreeMonthsOnlineFashionCourse />} />
          <Route path="/about" element={<About />} />
          <Route path="/placements" element={<Placements />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/payment" element={<Makeapayment />} />
          <Route path="/videos" element={<VideoGallery />} />
          <Route path="/video" element={<VideoPlayer />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/ai-avatar" element={<AIAvatarLogin />} />
          <Route path="/ai-avatar-chat" element={<AIAvatar />} />
          <Route path="/faqavatar" element={<FAQAvatar />} />
          <Route path="/termsandconditions" element={<TermsAndConditions />} />
          <Route path="/creditpackages" element={<CreditPackages />} />
          <Route path="/progresschart" element={<Dashboard />} />
          <Route path="/quicktour" element={<QuickTour />} />
          <Route path="/counsellor" element={<Counsellor />} />
          <Route path="/portfolio" element={<PortfolioBuilder />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/auth" element={<CommunityAuth />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/reputation" element={<Reputation />} />
          <Route path="/careers/work-from-home" element={<WorkFromHome />} />
          <Route path="/careers/work-from-home/terms" element={<WfhTerms />} />
          <Route path="/careers/work-from-home/dashboard" element={<WfhDashboard />} />
          <Route path="/fabric-sim" element={<FabricSimulation />} />
          <Route path="/interactive-training" element={<InteractiveTraining />} />

        
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
    </ApolloProvider>
  </QueryClientProvider>
  </HelmetProvider>
  )
};

export default App;
