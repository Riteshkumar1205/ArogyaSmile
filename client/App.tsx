import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { usePersona } from "./hooks/usePersona";
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

export default function App() {
  const { persona } = usePersona();

  useEffect(() => {
    // Initialize locale and persona on app load
    const stored = localStorage.getItem("arogya_language");
    const storedPersona = localStorage.getItem("arogya_persona");

    // Redirect to welcome if first time user
    if ((!stored || !storedPersona) && window.location.pathname !== "/welcome") {
      window.location.pathname = "/welcome";
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
}
