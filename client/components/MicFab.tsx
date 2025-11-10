import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';

interface MicFabProps {
  onTranscript?: (text: string) => void;
  onError?: (error: string) => void;
  isListening?: boolean;
}

export const MicFab: React.FC<MicFabProps> = ({
  onTranscript,
  onError,
  isListening: externalListening = false,
}) => {
  const [listening, setListening] = useState(false);
  const [permission, setPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const { t } = useTranslation();
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    // Initialize Web Speech API
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const instance = new SpeechRecognition();
      instance.continuous = false;
      instance.interimResults = true;
      instance.lang = 'hi-IN';

      instance.onstart = () => {
        setListening(true);
      };

      instance.onend = () => {
        setListening(false);
      };

      instance.onerror = (event: any) => {
        setListening(false);
        if (onError) {
          onError(event.error === 'no-speech' ? t.voice.notUnderstood : t.common.error);
        }
      };

      instance.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (event.isFinal && onTranscript) {
          onTranscript(transcript);
        }
      };

      setRecognition(instance);
    }

    // Check microphone permission
    navigator.permissions.query({ name: 'microphone' }).then((result) => {
      setPermission(result.state as any);
    });
  }, [onTranscript, onError, t]);

  const handleToggleMic = () => {
    if (!recognition) {
      if (onError) onError('Speech recognition not supported');
      return;
    }

    if (listening) {
      recognition.stop();
      setListening(false);
    } else {
      if (permission === 'denied') {
        if (onError) onError(t.voice.micPermission);
        return;
      }
      recognition.start();
    }
  };

  const isActive = listening || externalListening;

  return (
    <div className="mic-fab">
      <Button
        onClick={handleToggleMic}
        size="lg"
        variant={isActive ? 'accent' : 'primary'}
        className={cn(
          'rounded-full shadow-lg hover:shadow-xl',
          isActive && 'animate-pulse-ring',
          'min-h-16 min-w-16 p-0'
        )}
        title={t.voice.tapMic}
        aria-label={t.voice.tapMic}
      >
        {isActive ? (
          <Volume2 className="w-8 h-8" />
        ) : (
          <Mic className="w-8 h-8" />
        )}
      </Button>
      {isActive && (
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="text-xs font-medium text-muted-foreground bg-popover px-3 py-1 rounded-full shadow-md">
            {t.voice.listening}
          </span>
        </div>
      )}
    </div>
  );
};
