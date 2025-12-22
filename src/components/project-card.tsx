// src/components/project-card.tsx
import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  image: string;
  title: string;
  category: string;
  href: string;
}

export default function ProjectCard({ image, title, category, href }: ProjectCardProps) {
  return (
    <Link href={href} className="group relative block w-full h-80 rounded-lg overflow-hidden shadow-lg">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-60"></div>

      <div className="absolute bottom-0 left-0 p-6">
        <p className="text-sm font-semibold text-gray-200">{category}</p>
        <h3 className="text-xl font-bold text-white mt-1">{title}</h3>
      </div>
    </Link>
  );
}
