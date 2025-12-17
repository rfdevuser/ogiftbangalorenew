import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import About from "./pages/About";
import Placements from "./pages/Placements";
import Admissions from "./pages/Admissions"
import NotFound from "./pages/NotFound";
import Makeapayment from "./pages/NewPayment";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import StructuredData from "./components/StructuredData";
import FloatingAssistant from "./components/FloatingAssistant";
import { ApolloProvider } from "@apollo/client/react";
import { apolloClient } from "@/lib/apolloClient";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
  <ApolloProvider client={apolloClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <StructuredData />
      <FloatingAssistant />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/about" element={<About />} />
          <Route path="/placements" element={<Placements />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/payment" element={<Makeapayment />} />
         
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
    </ApolloProvider>
  </QueryClientProvider>
);

export default App;
