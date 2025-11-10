import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { usePersona } from '@/hooks/usePersona';
import { Button } from '@/components/ui/Button';
import { LanguagePicker } from '@/components/LanguagePicker';
import { PersonaToggle } from '@/components/PersonaToggle';
import { Mascot } from '@/components/Mascot';
import { LanguageCode, Persona } from '@shared/i18n';

export default function Welcome() {
  const navigate = useNavigate();
  const { language, changeLanguage, t } = useTranslation();
  const { persona, changePersona } = usePersona();
  const [step, setStep] = useState<'language' | 'persona' | 'complete'>(
    localStorage.getItem('arogya_persona') ? 'complete' : 'language'
  );

  const handleLanguageSelect = (lang: LanguageCode) => {
    changeLanguage(lang);
    setStep('persona');
  };

  const handlePersonaSelect = (newPersona: Persona) => {
    changePersona(newPersona);
    setStep('complete');
  };

  const handleContinue = () => {
    navigate('/');
  };

  const getGradient = (p: Persona) => {
    const gradients = {
      rural: 'gradient-rural',
      senior: 'gradient-senior',
      urban: 'gradient-urban',
      child: 'gradient-child',
    };
    return gradients[p];
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 safe-inset ${getGradient(persona)} transition-colors duration-500`}>
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            आरोग्यस्मिट
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Your Voice. Your Language. Your Oral Health Companion.
          </p>
        </div>

        {/* Mascot */}
        <div className="flex justify-center mb-12">
          <Mascot
            persona={persona}
            mood="happy"
            message={
              step === 'language'
                ? '👋 नमस्ते!'
                : step === 'persona'
                ? '💭 चलिए आपके लिए सही स्टाइल खोजते हैं!'
                : '🎉 बहुत अच्छा!'
            }
            size="lg"
          />
        </div>

        {/* Step 1: Language Selection */}
        {step === 'language' && (
          <div className="bg-card rounded-2xl shadow-lg p-8 md:p-12 space-y-8 animate-fade-in">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                {t.common.language}
              </h2>
              <p className="text-muted-foreground">
                कृपया अपनी पसंदीदा भाषा चुनें
              </p>
            </div>

            <LanguagePicker
              selectedLanguage={language}
              onLanguageChange={handleLanguageSelect}
              variant="grid"
            />
          </div>
        )}

        {/* Step 2: Persona Selection */}
        {step === 'persona' && (
          <div className="bg-card rounded-2xl shadow-lg p-8 md:p-12 space-y-8 animate-fade-in">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                अपने लिए स्टाइल चुनें
              </h2>
              <p className="text-muted-foreground">
                हम आपकी पसंद के अनुसार ऐप को कस्टमाइज़ करेंगे
              </p>
            </div>

            <PersonaToggle
              selectedPersona={persona}
              onPersonaChange={handlePersonaSelect}
              variant="grid"
            />
          </div>
        )}

        {/* Step 3: Complete */}
        {step === 'complete' && (
          <div className="bg-card rounded-2xl shadow-lg p-8 md:p-12 space-y-8 animate-fade-in text-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                तैयार हो गए!
              </h2>
              <p className="text-muted-foreground mb-4">
                आपकी पसंद के अनुसार ऐप सेट हो गया है।
              </p>
            </div>

            <div className="bg-primary/10 rounded-lg p-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">
                <strong>{language.toUpperCase()}</strong> में
              </p>
              <p className="text-lg font-semibold text-foreground">
                {persona === 'rural'
                  ? 'किसान मोड'
                  : persona === 'senior'
                  ? 'वरिष्ठ नागरिक मोड'
                  : persona === 'urban'
                  ? 'शहरी छात्र मोड'
                  : 'बच्चा मोड'}
              </p>
            </div>

            <Button
              onClick={handleContinue}
              size="xl"
              variant="primary"
              fullWidth
            >
              शुरू करें →
            </Button>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            आप किसी भी समय सेटिंग्स में अपनी भाषा और स्टाइल बदल सकते हैं
          </p>
        </div>
      </div>
    </div>
  );
}
