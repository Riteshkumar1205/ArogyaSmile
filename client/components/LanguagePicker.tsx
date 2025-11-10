import React from 'react';
import { getAvailableLanguages, LanguageCode } from '@shared/i18n';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface LanguagePickerProps {
  selectedLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  variant?: 'inline' | 'grid' | 'compact';
}

export const LanguagePicker: React.FC<LanguagePickerProps> = ({
  selectedLanguage,
  onLanguageChange,
  variant = 'inline',
}) => {
  const languages = getAvailableLanguages();

  if (variant === 'compact') {
    return (
      <select
        value={selectedLanguage}
        onChange={(e) => onLanguageChange(e.target.value as LanguageCode)}
        className="px-3 py-2 rounded-lg border-2 border-border bg-card text-card-foreground focus:ring-2 focus:ring-primary focus-visible:outline-none"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.nativeName}
          </option>
        ))}
      </select>
    );
  }

  if (variant === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {languages.map((lang) => (
          <Button
            key={lang.code}
            onClick={() => onLanguageChange(lang.code as LanguageCode)}
            variant={selectedLanguage === lang.code ? 'primary' : 'outline'}
            size="lg"
            fullWidth
          >
            <div className="text-center">
              <div className="font-bold">{lang.nativeName}</div>
              <div className="text-xs opacity-70">{lang.name}</div>
            </div>
          </Button>
        ))}
      </div>
    );
  }

  // inline variant
  return (
    <div className="flex gap-2 flex-wrap">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onLanguageChange(lang.code as LanguageCode)}
          className={cn(
            'px-4 py-2 rounded-lg font-medium transition-all duration-200',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
            selectedLanguage === lang.code
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          )}
        >
          {lang.nativeName}
        </button>
      ))}
    </div>
  );
};
