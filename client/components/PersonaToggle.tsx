import React from 'react';
import { Persona, getPersonaInfo } from '@shared/i18n';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface PersonaToggleProps {
  selectedPersona: Persona;
  onPersonaChange: (persona: Persona) => void;
  variant?: 'inline' | 'grid' | 'cards';
}

const personas: Persona[] = ['rural', 'senior', 'urban', 'child'];

const getPersonaEmoji = (persona: Persona) => {
  const emojis = {
    rural: '👨‍🌾',
    senior: '👴',
    urban: '👨‍💻',
    child: '👧',
  };
  return emojis[persona];
};

export const PersonaToggle: React.FC<PersonaToggleProps> = ({
  selectedPersona,
  onPersonaChange,
  variant = 'cards',
}) => {
  if (variant === 'inline') {
    return (
      <div className="flex gap-2 flex-wrap">
        {personas.map((persona) => {
          const info = getPersonaInfo(persona);
          return (
            <button
              key={persona}
              onClick={() => onPersonaChange(persona)}
              className={cn(
                'px-4 py-2 rounded-lg font-medium transition-all duration-200',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                selectedPersona === persona
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
            >
              {getPersonaEmoji(persona)} {info.label}
            </button>
          );
        })}
      </div>
    );
  }

  if (variant === 'grid') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {personas.map((persona) => {
          const info = getPersonaInfo(persona);
          return (
            <button
              key={persona}
              onClick={() => onPersonaChange(persona)}
              className={cn(
                'p-4 rounded-lg border-2 transition-all duration-200 text-center',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                selectedPersona === persona
                  ? 'border-primary bg-primary/10 shadow-md'
                  : 'border-border hover:border-primary/50'
              )}
            >
              <div className="text-4xl mb-2">{getPersonaEmoji(persona)}</div>
              <div className="font-bold text-sm">{info.label}</div>
            </button>
          );
        })}
      </div>
    );
  }

  // cards variant (default)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {personas.map((persona) => {
        const info = getPersonaInfo(persona);
        return (
          <Button
            key={persona}
            onClick={() => onPersonaChange(persona)}
            variant={selectedPersona === persona ? 'primary' : 'outline'}
            size="lg"
            fullWidth
            className="flex flex-col items-center gap-2 min-h-24"
          >
            <span className="text-4xl">{getPersonaEmoji(persona)}</span>
            <div className="text-center">
              <div className="font-bold">{info.label}</div>
              <div className="text-xs opacity-70">{info.description}</div>
            </div>
          </Button>
        );
      })}
    </div>
  );
};
