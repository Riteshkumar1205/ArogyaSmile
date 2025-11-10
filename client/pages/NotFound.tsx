import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePersona } from '@/hooks/usePersona';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();
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
    <div className={`min-h-screen ${getGradient(persona)} transition-colors duration-500 flex items-center justify-center p-4 safe-inset`}>
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center space-y-6">
          <div className="w-20 h-20 bg-destructive/20 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle className="w-10 h-10 text-destructive" />
          </div>

          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">404</h1>
            <p className="text-lg font-semibold text-foreground mb-2">
              पेज नहीं मिला
            </p>
            <p className="text-sm text-muted-foreground">
              आप जिस पेज को खोज रहे हैं, वह अभी उपलब्ध नहीं है।
            </p>
          </div>

          <Button
            onClick={() => navigate('/')}
            variant="primary"
            size="lg"
            fullWidth
          >
            होम पर जाएं
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
