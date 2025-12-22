// src/app/(public)/layout.tsx
import Navbar from "@/components/home/navbar";
import Footer from "@/components/footer";
import Chatbot from "@/components/chatbot";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}