
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

const queryClient = new QueryClient();

// Title mapping for different routes
const pageTitles: Record<string, string> = {
  "/": "Sukhrob Tokhirov | Home",
  "/about": "Sukhrob Tokhirov | About",
  "/projects": "Sukhrob Tokhirov | Projects",
  "/contact": "Sukhrob Tokhirov | Contact",
};

// Component to handle title updates
const TitleUpdater = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Get the title for the current path, or use a default
    const title = pageTitles[location.pathname] || "Sukhrob Tokhirov | Portfolio";
    document.title = title;
  }, [location.pathname]);
  
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <TitleUpdater />
        <AnimatePresence mode="wait">
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
