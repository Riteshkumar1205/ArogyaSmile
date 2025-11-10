import React from 'react';
import { Placeholder } from './Placeholder';
import { Video } from 'lucide-react';

export default function Scan360() {
  return (
    <Placeholder
      title="360° गाइडेड स्कैन"
      description="यह पेज वीडियो कैमरा खोलेगा और आपको अपने मुँह को विभिन्न कोणों से दिखाने के लिए वॉइस गाइडेंस देगा।"
      icon={<Video className="w-12 h-12" />}
      suggestion="वीडियो कैप्चर, स्टेप-बाय-स���टेप गाइडेंस, ब्लूर/लाइटिंग चेक, और फ्रेम इंडिकेटर जोड़ने के लिए कहें।"
    />
  );
}
