// src/components/Footer/section/SocialMedia.tsx
import { motion } from 'framer-motion';

interface SocialLink {
  name: string;
  url: string;
  icon: React.ComponentType<any>;
}

interface SocialMediaSectionProps {
  socialLinks: SocialLink[];
}

export default function SocialMediaSection({ socialLinks }: SocialMediaSectionProps) {
  return (
    <div className="mt-8 pt-8 border-t border-gray-800">
      <div className="flex flex-col items-center">
        <h3 className="text-xl font-bold mb-4">Ikuti Kami</h3>
        <div className="flex space-x-4">
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <social.icon className="w-6 h-6" />
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}