import React from 'react';
import { Placeholder } from './Placeholder';
import { BarChart3 } from 'lucide-react';

export default function Progress() {
  return (
    <Placeholder
      title="मेरी प्रगति"
      description="यह पेज आपकी स्मिल स्कोर, कमाए गए सिक्के, ब्रश स्ट्रीक, और मील के पत्थर दिखाएगा।"
      icon={<BarChart3 className="w-12 h-12" />}
      suggestion="गेमिफिकेशन फीचर्स जोड़ने के लिए कहें: स्कोर ट्रेंड, कोइन सिस्टम, स्ट्रीक, रिवार्ड्स, और मैस्कट रिएक्शन्स।"
    />
  );
}
