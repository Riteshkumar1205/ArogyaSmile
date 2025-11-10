import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { usePersona } from '@/hooks/usePersona';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { MicFab } from '@/components/MicFab';
import { Mascot } from '@/components/Mascot';
import { Activity, MapPin, Video, Settings, BarChart3, History } from 'lucide-react';

export default function Index() {
  const navigate = useNavigate();
  const { language, changeLanguage, t } = useTranslation();
  const { persona } = usePersona();
  const [transcript, setTranscript] = React.useState<string>('');

  const getGradient = (p: string) => {
    const gradients: Record<string, string> = {
      rural: 'gradient-rural',
      senior: 'gradient-senior',
      urban: 'gradient-urban',
      child: 'gradient-child',
    };
    return gradients[p] || 'gradient-urban';
  };

  const handleVoiceCommand = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes('scan') || lower.includes('स्कैन')) {
      navigate('/scan');
    } else if (lower.includes('clinic') || lower.includes('dentist') || lower.includes('क्लिनिक')) {
      navigate('/clinics');
    } else if (lower.includes('consult') || lower.includes('doctor') || lower.includes('सलाह')) {
      navigate('/teleconsult');
    } else if (lower.includes('progress') || lower.includes('प्रगति')) {
      navigate('/progress');
    } else if (lower.includes('history') || lower.includes('इतिहास')) {
      navigate('/history');
    }
  };

  return (
    <div className={`min-h-screen ${getGradient(persona)} transition-colors duration-500 safe-inset`}>
      {/* Header */}
      <div className="bg-card/50 backdrop-blur-sm border-b border-border/50 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              आरोग्यस्मिट
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground">
              {t.home.subtitle}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="md"
              onClick={() => navigate('/progress')}
              title={t.progress.title}
              icon={<BarChart3 className="w-5 h-5" />}
            />
            <Button
              variant="ghost"
              size="md"
              onClick={() => navigate('/settings')}
              title={t.common.settings}
              icon={<Settings className="w-5 h-5" />}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-6">
            <Mascot persona={persona} mood="happy" size="lg" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            स्वागत है!
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-2">
            अपने दांतों की सेहत की जांच करें और स्वस्थ रहें।
          </p>
          <p className="text-sm text-muted-foreground">
            नीचे के किसी भी विकल्प को चुनें या माइक्रोफोन बटन से बोलें
          </p>
        </div>

        {/* Three Main Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fade-in">
          {/* Scan Button */}
          <div
            onClick={() => navigate('/scan')}
            className="group relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                navigate('/scan');
              }
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 group-hover:from-primary/30 group-hover:to-primary/10 transition-all" />
            <Card className="h-full border-0 shadow-none bg-gradient-to-br from-primary/5 to-transparent cursor-pointer">
              <CardContent className="h-full flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Activity className="w-8 h-8 text-primary" />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {t.home.scanButton}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t.home.scanDescription}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Clinic Finder Button */}
          <div
            onClick={() => navigate('/clinics')}
            className="group relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                navigate('/clinics');
              }
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-secondary/5 group-hover:from-secondary/30 group-hover:to-secondary/10 transition-all" />
            <Card className="h-full border-0 shadow-none bg-gradient-to-br from-secondary/5 to-transparent cursor-pointer">
              <CardContent className="h-full flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin className="w-8 h-8 text-secondary" />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {t.home.clinicsButton}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t.home.clinicsDescription}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Teleconsult Button */}
          <div
            onClick={() => navigate('/teleconsult')}
            className="group relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                navigate('/teleconsult');
              }
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 group-hover:from-accent/30 group-hover:to-accent/10 transition-all" />
            <Card className="h-full border-0 shadow-none bg-gradient-to-br from-accent/5 to-transparent cursor-pointer">
              <CardContent className="h-full flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Video className="w-8 h-8 text-accent" />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {t.home.teleconsultButton}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t.home.teleconsultDescription}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 animate-fade-in">
          <div
            onClick={() => navigate('/history')}
            className="group cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                navigate('/history');
              }
            }}
          >
            <Card className="h-full hover:shadow-lg transition-all duration-200 hover:border-primary/50 cursor-pointer">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <History className="w-6 h-6 text-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">स्कैन का इतिहास</h4>
                  <p className="text-sm text-muted-foreground">अपने पिछले परिणाम देखें</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div
            onClick={() => navigate('/progress')}
            className="group cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                navigate('/progress');
              }
            }}
          >
            <Card className="h-full hover:shadow-lg transition-all duration-200 hover:border-primary/50 cursor-pointer">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <BarChart3 className="w-6 h-6 text-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">मेरी प्रगति</h4>
                  <p className="text-sm text-muted-foreground">स्कोर और सिक्के देखें</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Voice Tip */}
        <div className="bg-accent/10 border border-accent/20 rounded-xl p-6 text-center animate-fade-in">
          <p className="text-sm font-medium text-foreground mb-2">
            💡 आप कह सकते हैं:
          </p>
          <p className="text-xs text-muted-foreground space-y-1">
            "मेरा दाँत स्कैन करो" • "पास की क्लिनिक दिखाओ" • "डॉक्टर से बात करो"
          </p>
        </div>
      </div>

      {/* Floating Mic Button */}
      <MicFab onTranscript={handleVoiceCommand} />
    </div>
  );
}
