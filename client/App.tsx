import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Welcome from "./pages/Welcome";
import NotFound from "./pages/NotFound";
import Scan from "./pages/Scan";
import Scan360 from "./pages/Scan360";
import ScanUpload from "./pages/ScanUpload";
import ScanOffline from "./pages/ScanOffline";
import Clinics from "./pages/Clinics";
import Teleconsult from "./pages/Teleconsult";
import Progress from "./pages/Progress";
import History from "./pages/History";
import Settings from "./pages/Settings";
import { useEffect } from "react";
import { usePersona } from "./hooks/usePersona";

const queryClient = new QueryClient();

const AppContent = () => {
  const { persona } = usePersona();

  useEffect(() => {
    // Initialize locale and persona on app load
    const stored = localStorage.getItem('arogya_language');
    const persona = localStorage.getItem('arogya_persona');
    
    if (!stored || !persona) {
      // First time user - show welcome
      if (window.location.pathname !== '/welcome') {
        window.location.pathname = '/welcome';
      }
    }
  }, []);

  return (
    <Routes>
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/" element={<Index />} />
      <Route path="/scan" element={<Scan />} />
      <Route path="/scan/360" element={<Scan360 />} />
      <Route path="/scan/upload" element={<ScanUpload />} />
      <Route path="/scan/offline" element={<ScanOffline />} />
      <Route path="/clinics" element={<Clinics />} />
      <Route path="/teleconsult" element={<Teleconsult />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="/history" element={<History />} />
      <Route path="/settings" element={<Settings />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
