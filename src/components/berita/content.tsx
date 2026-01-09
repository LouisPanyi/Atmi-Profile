import Image from "next/image";
import { TextRenderer } from "@/components/berita/text-renderer";
import { type Section } from "@/components/berita/pagination";

interface NewsContentProps {
  sections: Section[];
  isFirstPage: boolean;
}

export default function NewsContent({ sections, isFirstPage }: NewsContentProps) {
  return (
    <div className="container mx-auto px-4 md:px-0 max-w-[750px]">
      {sections.map((section, index) => (
        <div key={index} className="mb-10 last:mb-0">
          {section.image && (
            <figure className="mb-8 w-full">
              <div className="w-full overflow-hidden rounded-lg shadow-sm border border-gray-100 relative">
                <Image
                  src={section.image}
                  alt={section.caption || "Ilustrasi Berita"}
                  width={1000}
                  height={600}
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="w-full h-auto object-cover"
                  priority={index === 0 && isFirstPage}
                />
              </div>
              {section.caption && (
                <figcaption className="text-xs text-gray-500 mt-2 text-left italic border-l-2 border-green-500 pl-3">
                  {section.caption}
                </figcaption>
              )}
            </figure>
          )}
          <article>
            {/* Logic: Highlight text hanya jika ini halaman pertama DAN section pertama */}
            <TextRenderer 
              text={section.description} 
              isFirstSection={isFirstPage && index === 0} 
            />
          </article>
        </div>
      ))}
    </div>
  );
}