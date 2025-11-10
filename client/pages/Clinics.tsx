import React from 'react';
import { Placeholder } from './Placeholder';
import { MapPin } from 'lucide-react';

export default function Clinics() {
  return (
    <Placeholder
      title="पास की क्लिनिकें"
      description="यह पेज आपके पास के दंत चिकित्सकों को खोजने में मदद करेगा। Google Maps और दूरी, भीड़, और कीमत के आधार पर सॉर्ट किया जाएगा।"
      icon={<MapPin className="w-12 h-12" />}
      suggestion="इस फीचर को विकसित करने के लिए, बताएं कि आप क्या चाहते हैं: क्लिनिक सर्च, नेविगेशन, व्हाट्सएप अपॉइंटमेंट, आदि।"
    />
  );
}
