"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, ArrowLeft } from "lucide-react";

// --- Chat Flow Update ---
const chatFlow = {
  start: {
    botMessage: "Halo! Ada yang bisa saya bantu?",
    options: [
      { text: "Lokasi ATMI", nextNode: "answer_location" },
      { text: "Layanan", nextNode: "answer_services" },
      { text: "Kontak Marketing", nextNode: "answer_contact" },
      { text: "Produk", nextNode: "answer_products" },
    ],
  },
  answer_location: {
    botMessage: "Kantor dan workshop kami berlokasi di Jl. Adisucipto / Jl. Mojo No. 1, Karangasem, Laweyan, Surakarta 57145.",
    options: [
      { text: "Lihat Peta", nextNode: "map" },
      { text: "Kembali", nextNode: "start" },
    ],
  },
  answer_services: {
    botMessage: "Kami memiliki dua layanan utama:",
    subOptions: [
      { text: "Work Fabrication (WF)", nextNode: "wf_details" },
      { text: "Machine Development Center (MDC)", nextNode: "mdc_details" },
    ],
    options: [
      { text: "Kembali", nextNode: "start" },
    ],
  },
  wf_details: {
    botMessage: "Work Fabrication (WF) menyediakan layatan fabrikasi baja, struktur, dan komponen industri sesuai kebutuhan Anda.",
    options: [
      { text: "Kembali ke Layanan", nextNode: "answer_services" },
      { text: "Kembali ke Menu", nextNode: "start" },
    ],
  },
  mdc_details: {
    botMessage: "Machine Development Center (MDC) fokus pada pengembangan mesin dan peralatan otomasi industri.",
    options: [
      { text: "Kembali ke Layanan", nextNode: "answer_services" },
      { text: "Kembali ke Menu", nextNode: "start" },
    ],
  },
  answer_contact: {
    botMessage: "Anda bisa menghubungi tim marketing kami:",
    contactInfo: [
      { type: "Email", value: "marketing@atmi.co.id" },
      { type: "Telepon", value: "(0271) 714466 ext. 209/245" },
    ],
    options: [
      { text: "Kirim Email", nextNode: "email" },
      { text: "Kembali", nextNode: "start" },
    ],
  },
  answer_products: {
    botMessage: "Kami memproduksi berbagai macam produk:",
    productCategories: [
      { name: "Peralatan Rumah Sakit", nextNode: "hospital_products" },
      { name: "Kantor & Sekolah", nextNode: "office_products" },
      { name: "Bengkel", nextNode: "workshop_products" },
    ],
    options: [
      { text: "Kembali", nextNode: "start" },
    ],
  },
  hospital_products: {
    botMessage: "Peralatan Rumah Sakit: Tempat Tidur Pasien, Alat Laboratorium, Peralatan Sterilisasi, dll.",
    options: [
      { text: "Kembali ke Produk", nextNode: "answer_products" },
      { text: "Kembali ke Menu", nextNode: "start" },
    ],
  },
  office_products: {
    botMessage: "Peralatan Kantor & Sekolah: Meja, Kursi, Rak Buku, Lemari Arsip, dll.",
    options: [
      { text: "Kembali ke Produk", nextNode: "answer_products" },
      { text: "Kembali ke Menu", nextNode: "start" },
    ],
  },
  workshop_products: {
    botMessage: "Peralatan Bengkel: Meja Kerja, Rak Peralatan, Alat Ukur, dll.",
    options: [
      { text: "Kembali ke Produk", nextNode: "answer_products" },
      { text: "Kembali ke Menu", nextNode: "start" },
    ],
  },
  map: {
    botMessage: "Silakan buka peta untuk melihat lokasi ATMI: [Link Peta]",
    options: [
      { text: "Kembali ke Lokasi", nextNode: "answer_location" },
      { text: "Kembali ke Menu", nextNode: "start" },
    ],
  },
  email: {
    botMessage: "Email: marketing@atmi.co.id. Silakan kirim pesan Anda ke alamat ini.",
    options: [
      { text: "Kembali ke Kontak", nextNode: "answer_contact" },
      { text: "Kembali ke Menu", nextNode: "start" },
    ],
  },
} as const;

type ChatNodeKey = keyof typeof chatFlow;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: "bot" | "user"; text: string }[]>([]);
  const [currentNode, setCurrentNode] = useState<ChatNodeKey>("start");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [history, setHistory] = useState<ChatNodeKey[]>(["start"]);
  const chatEndRef = useRef<null | HTMLDivElement>(null);

  // Start or Reset Chat
  const startChat = () => {
    setIsOpen(true);
    setHistory(["start"]);
    setCurrentNode("start");
    setMessages([{ sender: "bot", text: chatFlow.start.botMessage }]);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });

    const simulateBotTyping = () => {
      setIsBotTyping(true);
      setTimeout(() => {
        const nextNode = chatFlow[currentNode];
        setMessages((prev) => [...prev, { sender: "bot", text: nextNode.botMessage }]);
        setIsBotTyping(false);
      }, 1000);
    };

    if (messages.length > 0 && messages[messages.length - 1].sender === "user" && !isBotTyping) {
      simulateBotTyping();
    }
  }, [messages, isBotTyping, currentNode]);

  const handleOptionClick = (option: { text: string; nextNode: ChatNodeKey }) => {
    const sender = "user" as const;
    const userMessage = { sender, text: option.text };
    const nextNodeKey = option.nextNode;

    // Update history
    setHistory((prev) => [...prev, nextNodeKey]);

    // Update current node and messages
    setCurrentNode(nextNodeKey);
    setMessages((prev) => [...prev, userMessage]);
  };

  const handleBackClick = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop(); // Remove current node
      const prevNode = newHistory[newHistory.length - 1];

      setHistory(newHistory);
      setCurrentNode(prevNode);

      // Tambahkan pesan bot hanya jika belum ada di chat history
      const prevNodeData = chatFlow[prevNode];
      const lastMessage = messages[messages.length - 1];

      // Cek apakah pesan terakhir bukan dari bot atau bukan pesan dari node sebelumnya
      if (!lastMessage || lastMessage.sender !== "bot" || lastMessage.text !== prevNodeData.botMessage) {
        setMessages((prev) => [...prev, { sender: "bot", text: prevNodeData.botMessage }]);
      }
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={startChat}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-110"
          aria-label="Buka Chat"
        >
          <MessageSquare size={24} />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-[32rem] bg-white rounded-xl shadow-2xl flex flex-col transition-all duration-300">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex justify-between items-center rounded-t-xl">
            <div className="flex items-center space-x-2">
              <MessageSquare size={20} />
              <h3 className="font-bold">ATMI Assistant</h3>
            </div>
            <button
              onClick={handleClose}
              aria-label="Tutup Chat"
              className="relative group hover:bg-red-500 transition-all duration-200 p-2 rounded-full"
            >
              <X size={20} />
              <span className="absolute inset-0 bg-red-500 rounded-full opacity-0 group-hover:opacity-20 transition-all duration-200" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] p-3 rounded-lg ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"}`}>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}

              {/* Bot typing indicator */}
              {isBotTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>
          </div>

          <div className="p-4 border-t">
            {/* Back button (only show if not at start) */}
            {history.length > 1 && (
              <button
                onClick={handleBackClick}
                className="flex items-center space-x-1 text-gray-600 mb-2 hover:text-blue-600 transition-colors w-full"
              >
                <ArrowLeft size={16} />
                <span>Kembali</span>
              </button>
            )}

            {/* Special content for certain nodes */}
            {currentNode === "answer_contact" && (
              <div className="mb-3 bg-blue-50 p-3 rounded-lg">
                {chatFlow[currentNode].contactInfo?.map((contact, index) => (
                  <div key={index} className="text-sm text-gray-700 mb-1">
                    <span className="font-medium">{contact.type}:</span> {contact.value}
                  </div>
                ))}
              </div>
            )}

            {currentNode === "answer_services" && (
              <div className="mb-3">
                <p className="text-sm text-gray-700 mb-2">Pilih layanan untuk detail:</p>
                <div className="space-y-2">
                  {chatFlow[currentNode].subOptions?.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionClick(option)}
                      className="w-full text-left bg-blue-50 border border-blue-200 text-blue-800 p-2 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                    >
                      {option.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentNode === "answer_products" && (
              <div className="mb-3">
                <p className="text-sm text-gray-700 mb-2">Kategori produk:</p>
                <div className="space-y-2">
                  {chatFlow[currentNode].productCategories?.map((product, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionClick({ text: product.name, nextNode: product.nextNode })}
                      className="w-full text-left bg-blue-50 border border-blue-200 text-blue-800 p-2 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                    >
                      {product.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Regular options */}
            <div className="space-y-2">
              {chatFlow[currentNode].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className="w-full text-left bg-blue-50 border border-blue-200 text-blue-800 p-3 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}