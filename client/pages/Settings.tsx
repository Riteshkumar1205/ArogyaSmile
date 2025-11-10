import React from 'react';
import { Placeholder } from './Placeholder';
import { Settings as SettingsIcon } from 'lucide-react';

export default function Settings() {
  return (
    <Placeholder
      title="सेटिंग्स"
      description="यह पेज भा��ा, व्यक्तित्व, अनुमतियों, और अन्य सेटिंग्स को बदलने की सुविधा देगा।"
      icon={<SettingsIcon className="w-12 h-12" />}
      suggestion="भाषा चयन, व्यक्तित्व थीम, नोटिफिकेशन, प्राइवेसी सेटिंग्स, और प्रोफाइल जानकारी जोड़ने के लिए कहें।"
    />
  );
}
