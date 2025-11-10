import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { MicFab } from '@/components/MicFab';
import { Mascot } from '@/components/Mascot';
import { usePersona } from '@/hooks/usePersona';
import { Video, Image, Smartphone, ArrowLeft } from 'lucide-react';

export default function Scan() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { persona } = usePersona();

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
    if (lower.includes('360') || lower.includes('video')) {
      navigate('/scan/360');
    } else if (lower.includes('image') || lower.includes('upload')) {
      navigate('/scan/upload');
    } else if (lower.includes('offline')) {
      navigate('/scan/offline');
    }
  };

  return (
    <div className={`min-h-screen ${getGradient(persona)} transition-colors duration-500 safe-inset`}>
      {/* Header */}
      <div className="bg-card/50 backdrop-blur-sm border-b border-border/50 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="md"
            onClick={() => navigate('/')}
            icon={<ArrowLeft className="w-5 h-5" />}
          />
          <h1 className="text-2xl font-bold text-foreground flex-1">
            {t.scan.selectMode}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Mascot */}
        <div className="flex justify-center mb-10 animate-fade-in">
          <Mascot
            persona={persona}
            mood="thinking"
            message="अपनी स्कैन की विधि चुनें"
            size="md"
          />
        </div>

        {/* Scan Mode Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-in">
          {/* 360° Guided Scan */}
          <button
            onClick={() => navigate('/scan/360')}
            className="group"
          >
            <Card className="h-full hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-primary/50">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Video className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">
                  360° गाइडेड स्कैन
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  वीडियो के साथ अपने पूरे मुँह का विस्तृत स्कैन करें।
                </p>
                <ul className="text-xs text-muted-foreground space-y-2">
                  <li>✓ विस्तृत विश्लेषण</li>
                  <li>✓ वॉइस गाइडेंस</li>
                  <li>✓ रीयल-टाइम फीडबैक</li>
                </ul>
                <Button
                  size="md"
                  variant="primary"
                  fullWidth
                  className="mt-4"
                >
                  शुरू करें →
                </Button>
              </CardContent>
            </Card>
          </button>

          {/* Image Upload */}
          <button
            onClick={() => navigate('/scan/upload')}
            className="group"
          >
            <Card className="h-full hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-secondary/50">
              <CardHeader>
                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Image className="w-8 h-8 text-secondary" />
                </div>
                <CardTitle className="text-xl">
                  तस्वीर अपलोड करें
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  अपने डिवाइस से एक या अधिक तस्वीरें अपलोड करें।
                </p>
                <ul className="text-xs text-muted-foreground space-y-2">
                  <li>✓ एक ही स्कैन में कई तस्वीरें</li>
                  <li>✓ पुरानी तस्वीरें अपलोड करें</li>
                  <li>✓ तुरंत विश्लेषण</li>
                </ul>
                <Button
                  size="md"
                  variant="primary"
                  fullWidth
                  className="mt-4"
                >
                  चुनें →
                </Button>
              </CardContent>
            </Card>
          </button>

          {/* Offline Quick Scan */}
          <button
            onClick={() => navigate('/scan/offline')}
            className="group"
          >
            <Card className="h-full hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-accent/50">
              <CardHeader>
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Smartphone className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-xl">
                  तेज़ ऑफलाइन स्कैन
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  इंटरनेट के बिना तुरंत प्राथमिक विश्लेषण पाएं।
                </p>
                <ul className="text-xs text-muted-foreground space-y-2">
                  <li>✓ इंटरनेट की जरूरत नहीं</li>
                  <li>✓ तुरंत परिणाम</li>
                  <li>✓ बाद में अपलोड करें</li>
                </ul>
                <Button
                  size="md"
                  variant="primary"
                  fullWidth
                  className="mt-4"
                >
                  शुरू करें →
                </Button>
              </CardContent>
            </Card>
          </button>
        </div>

        {/* Info Box */}
        <Card className="bg-primary/5 border-primary/20 animate-fade-in">
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-3">💡 सुझाव:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• अच्छी रोशनी वाली जगह पर स्कैन करें</li>
              <li>• तस्वीर साफ और फोकस में हो</li>
              <li>• दोनों तरफ के दांत दिखाएं</li>
              <li>• एक से अधिक कोण से तस्वीरें लें</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Floating Mic Button */}
      <MicFab onTranscript={handleVoiceCommand} />
    </div>
  );
}
