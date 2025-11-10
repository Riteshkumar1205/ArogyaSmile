import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { MicFab } from '@/components/MicFab';
import { usePersona } from '@/hooks/usePersona';
import { ArrowLeft, Lightbulb } from 'lucide-react';

interface PlaceholderProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  suggestion?: string;
}

export const Placeholder: React.FC<PlaceholderProps> = ({
  title,
  description,
  icon,
  suggestion,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
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

  return (
    <div className={`min-h-screen ${getGradient(persona)} transition-colors duration-500 safe-inset`}>
      {/* Header */}
      <div className="bg-card/50 backdrop-blur-sm border-b border-border/50 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="md"
            onClick={() => navigate(-1)}
            icon={<ArrowLeft className="w-5 h-5" />}
          />
          <h1 className="text-2xl font-bold text-foreground flex-1">{title}</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12 flex items-center justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center pt-12">
            {icon && <div className="text-6xl mb-6 text-center">{icon}</div>}
            <CardTitle className="text-3xl">{title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pb-12">
            <p className="text-lg text-muted-foreground text-center">{description}</p>

            <div className="bg-muted/30 rounded-lg p-6 border border-border">
              <div className="flex gap-3">
                <Lightbulb className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    पेज पूरा करने के लिए:
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {suggestion ||
                      `इस पेज "${title}" को पूरा करने के लिए, अपनी आवश्यकताओ�� के साथ संवाद जारी रखें। आपकी प्रतिक्रिया के आधार पर, हम इस फीचर को विकसित करेंगे।`}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => navigate('/')}
                variant="primary"
                fullWidth
                size="lg"
              >
                होम पेज पर जाएं
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Floating Mic Button */}
      <MicFab />
    </div>
  );
};

export default Placeholder;
