import React from 'react';
import { Placeholder } from './Placeholder';
import { Image } from 'lucide-react';

export default function ScanUpload() {
  return (
    <Placeholder
      title="तस्वीर अपलोड करें"
      description="यह पेज आपको एक या अधिक दंत की तस्वीरें अपलोड करने देगा और AI से विश्लेषण करवाएगा।"
      icon={<Image className="w-12 h-12" />}
      suggestion="मल्टी-इमेज अपलोड, प्रीव्यू, ड्रैग-एंड-ड्रॉप, कैमरा कैप्चर, और विश्लेषण के लिए आवश्यक ईंधन जोड़ने के लिए कहें।"
    />
  );
}
