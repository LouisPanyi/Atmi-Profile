// src/components/Footer/section/ContactInfo.tsx
import { motion } from 'framer-motion';

interface ContactInfo {
  title: string;
  icon: React.ComponentType<any>;
  details: string[];
}

interface ContactInfoSectionProps {
  contacts: ContactInfo[];
}

export default function ContactInfoSection({ contacts }: ContactInfoSectionProps) {
  return (
    <div className="mt-12 pt-8 border-t border-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {contacts.map((contact, index) => (
          <motion.div
            key={index}
            className="flex items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="p-3 bg-blue-900/30 rounded-lg mr-4">
              <contact.icon className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">{contact.title}</h4>
              {contact.details.map((detail, detailIndex) => (
                <p key={detailIndex} className="text-gray-400">{detail}</p>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}