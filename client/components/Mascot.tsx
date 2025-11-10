import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Persona } from '@shared/i18n';

interface MascotProps {
  mood?: 'happy' | 'neutral' | 'concerned' | 'proud' | 'thinking';
  persona: Persona;
  message?: string;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const getMascotExpression = (mood: string, persona: Persona) => {
  const expressions = {
    happy: {
      rural: '😊',
      senior: '😊',
      urban: '😄',
      child: '🎉',
    },
    neutral: {
      rural: '😐',
      senior: '😐',
      urban: '😊',
      child: '🙂',
    },
    concerned: {
      rural: '😟',
      senior: '😟',
      urban: '😕',
      child: '😕',
    },
    proud: {
      rural: '😄',
      senior: '😊',
      urban: '🤩',
      child: '🌟',
    },
    thinking: {
      rural: '🤔',
      senior: '🤔',
      urban: '💭',
      child: '🤔',
    },
  };

  return expressions[mood as keyof typeof expressions]?.[persona] || '😊';
};

const sizeMap = {
  sm: 'w-16 h-16 text-4xl',
  md: 'w-24 h-24 text-6xl',
  lg: 'w-32 h-32 text-8xl',
};

export const Mascot: React.FC<MascotProps> = ({
  mood = 'neutral',
  persona,
  message,
  animated = true,
  size = 'md',
}) => {
  const [isAnimating, setIsAnimating] = useState(animated);

  useEffect(() => {
    if (animated && message) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [message, animated]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className={cn(
          'flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-100 to-orange-100 shadow-lg',
          sizeMap[size],
          isAnimating && 'animate-bounce-subtle'
        )}
        role="img"
        aria-label={`Mascot feeling ${mood}`}
      >
        <span className="inline-block">{getMascotExpression(mood, persona)}</span>
      </div>

      {message && (
        <div
          className={cn(
            'text-center font-medium text-sm md:text-base max-w-xs',
            'bg-primary/10 text-primary px-4 py-2 rounded-lg',
            isAnimating && 'animate-fade-in'
          )}
        >
          {message}
        </div>
      )}
    </div>
  );
};
