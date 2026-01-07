// src/app/(public)/layout.tsx
import Navbar from "@/components/home/navbar";
import FooterWrapper from "@/components/footer-wrapper"; 
import Chatbot from "@/components/chatbot";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
      <FooterWrapper />
      <Chatbot />
    </>
  );
}