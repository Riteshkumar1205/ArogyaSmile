import React from 'react';
import { Placeholder } from './Placeholder';
import { Smartphone } from 'lucide-react';

export default function ScanOffline() {
  return (
    <Placeholder
      title="तेज़ ऑफलाइन स्कैन"
      description="यह पेज आपके डिवाइस पर TensorFlow.js मॉडल का उपयोग करके इंटरनेट के बिना विश्लेषण प्रदान करेगा।"
      icon={<Smartphone className="w-12 h-12" />}
      suggestion="कैमरा खोलना, TF.js मॉडल लोड करना, ऑन-डिवाइस इंफरेंस, और स्थानीय स्कीपिंग जोड़ने के लिए कहें।"
    />
  );
}
