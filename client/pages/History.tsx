import React from 'react';
import { Placeholder } from './Placeholder';
import { Clock } from 'lucide-react';

export default function History() {
  return (
    <Placeholder
      title="स्कैन का इतिहास"
      description="यह पेज आपके सभी पिछले स्कैन परिणाम दिखाएगा और ब्लॉकचेन पर सत्यापन करने की सुविधा देगा।"
      icon={<Clock className="w-12 h-12" />}
      suggestion="स्कैन हिस्ट्री, ब्लॉकचेन वेरिफिकेशन, IPFS लिंक्स, और Polygon Testnet इंटीग्रेशन जोड़ने के लिए कहें।"
    />
  );
}
