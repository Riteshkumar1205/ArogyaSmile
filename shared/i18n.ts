export type LanguageCode = 'en-IN' | 'hi-IN' | 'mr-IN';
export type Persona = 'rural' | 'senior' | 'urban' | 'child';

export interface Translations {
  home: {
    title: string;
    subtitle: string;
    scanButton: string;
    clinicsButton: string;
    teleconsultButton: string;
    scanDescription: string;
    clinicsDescription: string;
    teleconsultDescription: string;
  };
  common: {
    language: string;
    persona: string;
    settings: string;
    help: string;
    back: string;
    next: string;
    skip: string;
    continue: string;
    confirm: string;
    cancel: string;
    loading: string;
    error: string;
    success: string;
    warning: string;
    info: string;
  };
  voice: {
    tapMic: string;
    listening: string;
    processing: string;
    notUnderstood: string;
    micPermission: string;
  };
  scan: {
    title: string;
    selectMode: string;
    mode360: string;
    modeImage: string;
    modeOffline: string;
    capturing: string;
    analyzing: string;
  };
  results: {
    title: string;
    severity: string;
    recommendations: string;
    conditions: string;
    heatmap: string;
    saveToBlockchain: string;
    findClinic: string;
  };
  clinics: {
    title: string;
    findNearby: string;
    distance: string;
    crowdLevel: string;
    price: string;
    navigate: string;
    call: string;
    whatsapp: string;
  };
  teleconsult: {
    title: string;
    startSession: string;
    connecting: string;
    shareResults: string;
    chat: string;
  };
  progress: {
    title: string;
    smileScore: string;
    coins: string;
    streak: string;
    milestones: string;
  };
}

const translations: Record<LanguageCode, Translations> = {
  'en-IN': {
    home: {
      title: 'ArogyaSmile',
      subtitle: 'Your Voice. Your Language. Your Oral Health Companion.',
      scanButton: 'Scan Mouth',
      clinicsButton: 'Find Dentist',
      teleconsultButton: 'Video Consult',
      scanDescription: 'Check your oral health with AI',
      clinicsDescription: 'Locate nearby dental clinics',
      teleconsultDescription: 'Talk to a dentist online',
    },
    common: {
      language: 'Language',
      persona: 'Persona',
      settings: 'Settings',
      help: 'Help',
      back: 'Back',
      next: 'Next',
      skip: 'Skip',
      continue: 'Continue',
      confirm: 'Confirm',
      cancel: 'Cancel',
      loading: 'Loading...',
      error: 'Something went wrong',
      success: 'Success!',
      warning: 'Warning',
      info: 'Information',
    },
    voice: {
      tapMic: 'Tap the microphone to speak',
      listening: 'Listening...',
      processing: 'Processing your request...',
      notUnderstood: 'I didn\'t understand that. Try again.',
      micPermission: 'Allow microphone access to use voice commands',
    },
    scan: {
      title: 'Oral Health Scan',
      selectMode: 'Choose how to scan',
      mode360: '360° Guided Scan',
      modeImage: 'Upload Image',
      modeOffline: 'Quick Offline Scan',
      capturing: 'Capturing image...',
      analyzing: 'Analyzing your mouth...',
    },
    results: {
      title: 'Scan Results',
      severity: 'Severity',
      recommendations: 'Recommendations',
      conditions: 'Conditions Found',
      heatmap: 'View Heatmap',
      saveToBlockchain: 'Save to Blockchain',
      findClinic: 'Find Nearby Clinic',
    },
    clinics: {
      title: 'Nearby Clinics',
      findNearby: 'Search clinics near me',
      distance: 'Distance',
      crowdLevel: 'Busy Level',
      price: 'Price Range',
      navigate: 'Navigate',
      call: 'Call',
      whatsapp: 'WhatsApp',
    },
    teleconsult: {
      title: 'Video Consultation',
      startSession: 'Start Video Call',
      connecting: 'Connecting to doctor...',
      shareResults: 'Share Results',
      chat: 'Chat',
    },
    progress: {
      title: 'My Progress',
      smileScore: 'Smile Score',
      coins: 'Coins Earned',
      streak: 'Brush Streak',
      milestones: 'Milestones',
    },
  },
  'hi-IN': {
    home: {
      title: 'आरोग्यस्मिट',
      subtitle: 'आपकी आवाज़। आपकी भाषा। आपके दांतों की देखभाल का साथी।',
      scanButton: 'मुँह स्कैन करें',
      clinicsButton: 'दंत चिकित्सक खोजें',
      teleconsultButton: 'वीडियो सलाह',
      scanDescription: 'AI से अपने द���ंतों की जांच करें',
      clinicsDescription: 'पास के दंत चिकित्सकों को खोजें',
      teleconsultDescription: 'ऑनलाइन डॉक्टर से बात करें',
    },
    common: {
      language: 'भाषा',
      persona: 'व्यक्तित्व',
      settings: 'सेटिंग',
      help: 'मदद',
      back: 'पीछे',
      next: 'आगे',
      skip: 'छोड़ें',
      continue: 'जारी रखें',
      confirm: 'पुष्टि करें',
      cancel: 'रद्द करें',
      loading: 'लोड हो रहा है...',
      error: 'कुछ गलत हो गया',
      success: 'सफल!',
      warning: 'चेतावनी',
      info: 'जानकारी',
    },
    voice: {
      tapMic: 'बात करने के लिए माइक्रोफोन को टैप करें',
      listening: 'सुन रहा हूँ...',
      processing: 'आपके अनुरोध को संसाधित किया जा रहा है...',
      notUnderstood: 'मुझे समझ नहीं आया। फिर से कोशिश करें।',
      micPermission: 'वॉयस कमांड का उपयोग करने के लिए माइक्रोफोन तक पहुँच दें',
    },
    scan: {
      title: 'दांतों की जांच',
      selectMode: 'स्कैन करने का तरीका चुनें',
      mode360: '360° निर्देशित स्कैन',
      modeImage: 'तस्वीर अपलोड करें',
      modeOffline: 'तेज़ ऑफ़लाइन स्कैन',
      capturing: 'तस्वीर ली जा रही है...',
      analyzing: 'आपके दांतों का विश्लेषण किया जा रहा है...',
    },
    results: {
      title: 'स्कैन के परिणाम',
      severity: 'गंभीरता',
      recommendations: 'सिफारिशें',
      conditions: 'पाई गई समस्याएं',
      heatmap: 'हीटमैप देखें',
      saveToBlockchain: 'ब्लॉकचेन को सहेजें',
      findClinic: 'पास की क्लिनिक खोजें',
    },
    clinics: {
      title: 'पास की क्लिनिकें',
      findNearby: 'पास की क्लिनिकें खोजे���',
      distance: 'दूरी',
      crowdLevel: 'भीड़ का स्तर',
      price: 'कीमत की सीमा',
      navigate: 'निर्देशन',
      call: 'कॉल करें',
      whatsapp: 'व्हाट्सएप',
    },
    teleconsult: {
      title: 'वीडियो परामर्श',
      startSession: 'वीडियो कॉल शुरू करें',
      connecting: 'डॉक्टर से जुड़ा जा रहा है...',
      shareResults: 'परिणाम साझा करें',
      chat: 'चैट',
    },
    progress: {
      title: 'मेरी प्रगति',
      smileScore: 'स्मिल स्कोर',
      coins: 'अर्जित सिक्के',
      streak: 'ब्रश स्ट्रीक',
      milestones: 'मील के पत्थर',
    },
  },
  'mr-IN': {
    home: {
      title: 'आरोग्यस्मिल',
      subtitle: 'तुमचा आवाज़. तुमची भाषा. तुमच्या दातांचा साथी.',
      scanButton: 'तोंड स्कॅन करा',
      clinicsButton: 'दंतचिकित्सक शोधा',
      teleconsultButton: 'व्हिडिओ सल्ल��',
      scanDescription: 'AI द्वारे आपल्या दातांची तपासणी करा',
      clinicsDescription: 'जवळपास दंत चिकित्सकांना शोधा',
      teleconsultDescription: 'ऑनलाइन डॉक्टरशी बोला',
    },
    common: {
      language: 'भाषा',
      persona: 'व्यक्तिमत्व',
      settings: 'सेटिंग्ज',
      help: 'मदत',
      back: 'मागे',
      next: 'पुढे',
      skip: 'सोडा',
      continue: 'सुरू ठेवा',
      confirm: 'पुष्टी करा',
      cancel: 'रद्द करा',
      loading: 'लोड होत आहे...',
      error: 'काहीतरी चूक झाली',
      success: 'यशस्वी!',
      warning: 'सावधानी',
      info: 'माहिती',
    },
    voice: {
      tapMic: 'बोलण्यासाठी मायक्रोफोन टॅप करा',
      listening: 'ऐकत आहे...',
      processing: 'तुमच्या विनंतीवर कार्य केले जात आहे...',
      notUnderstood: 'मला समजलं नाही. पुन्हा प्रयत्�� करा.',
      micPermission: 'व्हॉयस कमांड वापरण्यासाठी मायक्रोफोन अनुमती द्या',
    },
    scan: {
      title: 'दातांची तपासणी',
      selectMode: 'स्कॅन करण्याचा मार्ग निवडा',
      mode360: '360° निर्देशित स्कॅन',
      modeImage: 'चित्र अपलोड करा',
      modeOffline: 'त्वरित ऑफलाइन स्कॅन',
      capturing: 'चित्र घेतले जात आहे...',
      analyzing: 'तुमच्या दातांचे विश्लेषण केले जात आहे...',
    },
    results: {
      title: 'स्कॅन परिणाम',
      severity: 'गंभीरता',
      recommendations: 'सूचना',
      conditions: 'सापडलेल्या समस्या',
      heatmap: 'हीटमॅप पहा',
      saveToBlockchain: 'ब्लॉकचेनवर जतन करा',
      findClinic: 'जवळपास क्लिनिक शोधा',
    },
    clinics: {
      title: 'जवळपास क्लिनिकांनी',
      findNearby: 'जवळपास क्लिन��कांचा शोध घ्या',
      distance: 'अंतर',
      crowdLevel: 'भिडीचे स्तर',
      price: 'किंमत श्रेणी',
      navigate: 'दिशानिर्देश',
      call: 'कॉल करा',
      whatsapp: 'व्हाट्सअँप',
    },
    teleconsult: {
      title: 'व्हिडिओ सल्ला',
      startSession: 'व्हिडिओ कॉल सुरू करा',
      connecting: 'डॉक्टरला जोडले जात आहे...',
      shareResults: 'परिणाम शेअर करा',
      chat: 'गप्पा',
    },
    progress: {
      title: 'माझी प्रगती',
      smileScore: 'स्मिल स्कोर',
      coins: 'कमावलेले नाणे',
      streak: 'ब्रश स्ट्रीक',
      milestones: 'मैलस्तंभ',
    },
  },
};

export const getTranslation = (language: LanguageCode): Translations => {
  return translations[language] || translations['en-IN'];
};

export const getAvailableLanguages = () => [
  { code: 'en-IN', name: 'English', nativeName: 'English' },
  { code: 'hi-IN', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'mr-IN', name: 'Marathi', nativeName: 'मराठी' },
];

export const getPersonaInfo = (persona: Persona) => {
  const personas = {
    rural: {
      label: 'Rural Farmer',
      description: 'Warm earth tones, simple language',
      voiceSpeed: 0.8,
      fontSize: 'text-rural-lg',
      defaultLanguage: 'hi-IN' as LanguageCode,
    },
    senior: {
      label: 'Senior Citizen',
      description: 'High contrast, large text, clear speech',
      voiceSpeed: 0.6,
      fontSize: 'text-senior-lg',
      defaultLanguage: 'hi-IN' as LanguageCode,
    },
    urban: {
      label: 'Urban Student',
      description: 'Modern design, quick flows',
      voiceSpeed: 1,
      fontSize: 'text-urban-base',
      defaultLanguage: 'en-IN' as LanguageCode,
    },
    child: {
      label: 'Child',
      description: 'Bright colors, fun interactions',
      voiceSpeed: 0.9,
      fontSize: 'text-child-base',
      defaultLanguage: 'hi-IN' as LanguageCode,
    },
  };
  return personas[persona];
};
