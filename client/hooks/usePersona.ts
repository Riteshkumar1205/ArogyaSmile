import { useEffect, useState } from 'react';
import { Persona, getPersonaInfo } from '@shared/i18n';

export const usePersona = () => {
  const [persona, setPersona] = useState<Persona>('urban');

  useEffect(() => {
    // Load persona from localStorage
    const stored = localStorage.getItem('arogya_persona') as Persona;
    if (stored) {
      setPersona(stored);
      document.documentElement.setAttribute('data-persona', stored);
    } else {
      setPersona('urban');
      document.documentElement.setAttribute('data-persona', 'urban');
    }
  }, []);

  const changePersona = (newPersona: Persona) => {
    setPersona(newPersona);
    localStorage.setItem('arogya_persona', newPersona);
    document.documentElement.setAttribute('data-persona', newPersona);
  };

  const info = getPersonaInfo(persona);

  return {
    persona,
    changePersona,
    info,
  };
};
