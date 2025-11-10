import React from 'react';
import { Placeholder } from './Placeholder';
import { Video } from 'lucide-react';

export default function Teleconsult() {
  return (
    <Placeholder
      title="वीडियो परामर्श"
      description="यह पेज एक दंत चिकित्सक के साथ वीडियो कॉल करने की सुविधा देगा। आप अपने स्कैन परिणाम साझा कर सकते हैं।"
      icon={<Video className="w-12 h-12" />}
      suggestion="वीडियो कॉन्फ्रेंसिंग, चैट, और डॉक्टर स्क्रीन पर हीटमैप शेयर करने जैसी सुविधाएं जोड़ने के लिए कहें।"
    />
  );
}
