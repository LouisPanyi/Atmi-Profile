
export interface Section {
  image?: string;
  caption?: string;
  description?: string;
}

export interface PageData {
  page: number;
  totalPages: number;
  pageSections: Section[];
}

function splitParagraphs(text: string): string[] {
  return text
    .split("\n")
    .map((p) => p.trimEnd())
    .filter((p) => p.trim() !== "");
}

function joinParagraphs(paragraphs: string[]): string {
  return paragraphs.join("\n");
}

function countChars(paragraph: string): number {
  return paragraph.length + 1; // +1 for newline boundary
}

export function paginateNewsSections(
  rawSections: Section[],
  maxCharsPerPage: number
): Section[][] {
  const pages: Section[][] = [];
  let current: Section[] = [];
  let currentChars = 0;

  const pushPage = () => {
    if (current.length > 0) pages.push(current);
    current = [];
    currentChars = 0;
  };

  for (const sec of rawSections) {
    const desc = (sec.description ?? "").toString();
    const paragraphs = splitParagraphs(desc);

    // Jika description kosong, tetap masuk sebagai section kecil (mis. hanya gambar)
    if (paragraphs.length === 0) {
      const approx = 30;
      if (currentChars + approx > maxCharsPerPage && current.length > 0) pushPage();
      current.push({ ...sec, description: "" });
      currentChars += approx;
      continue;
    }

    // Break section menjadi beberapa chunk jika terlalu panjang
    let chunk: string[] = [];
    let chunkChars = 0;
    let isFirstChunkForThisSection = true;

    for (const p of paragraphs) {
      const pChars = countChars(p);

      // Jika paragraf sendirian lebih besar dari page limit: paksa taruh sendiri
      if (pChars > maxCharsPerPage) {
        // flush chunk dulu
        if (chunk.length > 0) {
          const chunkDesc = joinParagraphs(chunk);
          const chunkSec: Section = isFirstChunkForThisSection
            ? { ...sec, description: chunkDesc }
            : { description: chunkDesc };

          if (currentChars + chunkChars > maxCharsPerPage && current.length > 0) pushPage();
          current.push(chunkSec);
          currentChars += chunkChars;

          chunk = [];
          chunkChars = 0;
          isFirstChunkForThisSection = false;
        }

        // taruh paragraf besar sebagai chunk sendiri
        const bigSec: Section = isFirstChunkForThisSection
          ? { ...sec, description: p }
          : { description: p };

        if (currentChars + pChars > maxCharsPerPage && current.length > 0) pushPage();
        current.push(bigSec);
        currentChars += pChars;

        isFirstChunkForThisSection = false;
        continue;
      }

      // Jika menambah paragraf bikin chunk > max, flush chunk jadi section
      if (chunkChars + pChars > maxCharsPerPage) {
        const chunkDesc = joinParagraphs(chunk);
        const chunkSec: Section = isFirstChunkForThisSection
          ? { ...sec, description: chunkDesc }
          : { description: chunkDesc };

        if (currentChars + chunkChars > maxCharsPerPage && current.length > 0) pushPage();
        current.push(chunkSec);
        currentChars += chunkChars;

        chunk = [];
        chunkChars = 0;
        isFirstChunkForThisSection = false;
      }

      chunk.push(p);
      chunkChars += pChars;

      // Jika current page sudah penuh, flush page
      if (currentChars >= maxCharsPerPage) {
        pushPage();
      }
    }

    // flush sisa chunk
    if (chunk.length > 0) {
      const chunkDesc = joinParagraphs(chunk);
      const chunkSec: Section = isFirstChunkForThisSection
        ? { ...sec, description: chunkDesc }
        : { description: chunkDesc };

      if (currentChars + chunkChars > maxCharsPerPage && current.length > 0) pushPage();
      current.push(chunkSec);
      currentChars += chunkChars;
    }
  }

  if (current.length > 0) pages.push(current);
  return pages.length > 0 ? pages : [[{ description: "" }]];
}

export function buildPageHref(slug: string, page: number): string {
  return page <= 1 ? `/berita/${slug}` : `/berita/${slug}/${page}`;
}