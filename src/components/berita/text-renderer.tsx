export function TextRenderer({ text, isFirstSection = false }: { text?: string; isFirstSection?: boolean }) {
  if (!text) return null;
  const paragraphs = text.split("\n").filter((p) => p.trim() !== "");
  return (
    <div className="text-gray-900 font-serif text-lg md:text-[1.15rem] leading-relaxed">
      {paragraphs.map((paragraph, idx) => (
        <p key={idx} className="mb-6 text-justify break-words whitespace-pre-wrap">
          {isFirstSection && idx === 0 ? (
            <span>
              <span className="font-bold text-black">Atmi.co.id - </span>
              {paragraph.trim()}
            </span>
          ) : (
            paragraph
          )}
        </p>
      ))}
    </div>
  );
}