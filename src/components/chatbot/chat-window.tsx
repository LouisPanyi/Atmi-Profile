// src/components/chatbot/ChatWindow.tsx
import { useRef, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, Mail, Phone, MapPin, Globe, Copy, ExternalLink, MessageSquare, Bot } from 'lucide-react';
import { ChatNodeKey, chatFlow, validateForm, Option } from './flow';
import { NumericField } from '@/lib/definitions';

type Sender = 'bot' | 'user';
export type ChatMessage = { sender: Sender; text: string };

interface ChatWindowProps {
  isOpen: boolean;
  messages: ChatMessage[];
  currentNode: ChatNodeKey;
  history: ChatNodeKey[];
  isBotTyping: boolean;
  interactionLock: boolean;
  handleBackClick: () => void;
  handleOptionClick: (option: { text: string; nextNode?: ChatNodeKey }) => void;
  onSubmitForm: (nodeKey: ChatNodeKey, payload: Record<string, unknown>) => void;
  onClose: () => void;
}

// Komponen Avatar Bot yang Dikembangkan
function BotAvatar({ isTyping }: { isTyping: boolean }) {
  return (
    <div className="relative">
      {/* Avatar Container */}
      <div className="relative w-12 h-12">
        {/* Background dengan gradien */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full shadow-lg"></div>

        {/* Ikon Bot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Bot className="w-6 h-6 text-white" />
        </div>

        {/* Efek cahaya */}
        <div className="absolute inset-0 rounded-full bg-white opacity-10 animate-pulse"></div>

        {/* Status indicator */}
        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${isTyping ? 'bg-yellow-400 animate-pulse' : 'bg-green-500'
          }`}></div>
      </div>

      {/* Efek hover */}
      <motion.div
        className="absolute inset-0 rounded-full bg-white opacity-0 hover:opacity-20 transition-opacity"
        whileHover={{ scale: 1.05 }}
      ></motion.div>
    </div>
  );
}

// Komponen Indikator Mengetik yang Dikembangkan
function TypingIndicator() {
  return (
    <div className="flex space-x-1">
      <motion.div
        className="w-2 h-2 bg-white rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
      <motion.div
        className="w-2 h-2 bg-white rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
      />
      <motion.div
        className="w-2 h-2 bg-white rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
      />
    </div>
  );
}

export default function ChatWindow(props: ChatWindowProps) {
  const { isOpen, messages, currentNode, history, isBotTyping, interactionLock, handleBackClick, handleOptionClick, onSubmitForm, onClose } = props;

  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const node = useMemo(() => chatFlow[currentNode], [currentNode]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isBotTyping, currentNode]);

  const isDisabled = isBotTyping || interactionLock;

  // Form local state
  const [formState, setFormState] = useState<Record<string, string>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  useEffect(() => { setFormState({}); setFormErrors({}); }, [currentNode]);

  const onChangeField = (id: string, value: string) => {
    setFormState((p) => ({ ...p, [id]: value }));
    if (formErrors[id]) setFormErrors((e) => ({ ...e, [id]: '' }));
  };

  const submitForm = () => {
    if (!node.form) return;
    const { ok, errors } = validateForm(node.form.fields, formState);
    if (!ok) { setFormErrors(errors); return; }
    onSubmitForm(currentNode, formState);
  };

  const executeAction = (opt: Option) => {
    const a = opt.action;
    if (!a) return;
    try {
      switch (a.type) {
        case 'mailto':
        case 'tel':
          if (a.value) window.location.href = `${a.type}:${a.value.replace(`${a.type}:`, '')}`;
          break;
        case 'open_url':
        case 'open_map':
        case 'whatsapp':
          if (a.value) window.open(a.value, '_blank', 'noopener,noreferrer');
          break;
        case 'copy':
          if (a.value) navigator.clipboard?.writeText(a.value);
          break;
        default:
          break;
      }
    } catch (e) {
      console.error('Action error', e);
    }
  };

  const contactInfo = node.contactInfo ?? null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed bottom-4 right-4 max-w-full w-[480px] md:w-[600px] h-[85vh] max-h-[720px] bg-white rounded-2xl shadow-2xl flex flex-col z-50"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
        >
          {/* Header dengan Avatar yang Dikembangkan */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-5 flex justify-between items-center rounded-t-2xl shadow-lg">
            <div className="flex items-center space-x-3">
              <BotAvatar isTyping={isBotTyping} />
              <div>
                <h3 className="font-bold text-xl">ATMI Assistant</h3>
                <p className="text-sm opacity-80">Solusi Manufaktur & Rekayasa</p>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Tutup Chat"
              className="relative group hover:bg-white/10 transition-all duration-200 p-2.5 rounded-full disabled:opacity-50"
              disabled={isDisabled}
            >
              <X size={22} />
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 p-5 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
            {/* Rich hero */}
            {node.rich?.hero && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
                <h4 className="text-lg font-semibold text-gray-800">{node.rich.hero.title}</h4>
                {node.rich.hero.subtitle && <p className="text-sm text-gray-600 mt-1">{node.rich.hero.subtitle}</p>}
              </motion.div>
            )}
            {/* Highlights */}
            {node.rich?.highlights?.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
                {node.rich.highlights.map((h, i) => (
                  <div key={i} className="bg-white border border-gray-100 rounded-xl px-3 py-2 shadow-sm">
                    <p className="text-sm font-medium text-gray-800">{h.title}</p>
                    {h.detail && <p className="text-xs text-gray-600 mt-0.5">{h.detail}</p>}
                  </div>
                ))}
              </div>
            ) : null}

            <div className="space-y-5">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-5 rounded-2xl ${msg.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none shadow-lg'
                      : 'bg-white text-gray-800 rounded-bl-none shadow-md border border-gray-100'
                    }`}>
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                  </div>
                </motion.div>
              ))}

              {/* Indikator mengetik yang Dikembangkan */}
              {isBotTyping && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                  <div className="bg-white text-gray-800 p-5 rounded-2xl rounded-bl-none shadow-md border border-gray-100">
                    <TypingIndicator />
                  </div>
                </motion.div>
              )}
              <div ref={chatEndRef} />
            </div>
          </div>

          {/* Options / Forms */}
          <div className="bg-white border-t border-gray-100 rounded-b-2xl p-5 max-h-80 overflow-y-auto">
            {history.length > 1 && (
              <motion.button
                onClick={handleBackClick}
                whileHover={!isDisabled ? { scale: 1.02 } : {}}
                whileTap={!isDisabled ? { scale: 0.98 } : {}}
                disabled={isDisabled}
                className={`flex items-center space-x-2 text-gray-600 mb-4 hover:text-blue-600 transition-colors w-full ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <ArrowLeft size={18} />
                <span className="text-sm font-medium">Kembali</span>
              </motion.button>
            )}

            {/* Contact Info */}
            {contactInfo && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-200 shadow-sm"
              >
                <h4 className="font-semibold text-blue-800 mb-4 flex items-center text-sm">
                  <MessageSquare size={18} className="mr-3" /> Informasi Kontak
                </h4>
                {contactInfo.map((c, i) => (
                  <div key={i} className="text-sm text-gray-700 mb-3 flex items-start">
                    {c.type === 'Email' && <Mail size={18} className="text-blue-600 mr-3 mt-1" />}
                    {c.type === 'Telepon' && <Phone size={18} className="text-blue-600 mr-3 mt-1" />}
                    {c.type === 'Alamat' && <MapPin size={18} className="text-blue-600 mr-3 mt-1" />}
                    {c.type === 'Website' && <Globe size={18} className="text-blue-600 mr-3 mt-1" />}
                    <div>
                      <span className="font-medium text-blue-700 text-sm">{c.type}:</span>
                      <span className="ml-3 text-sm">{c.value}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Quick Actions */}
            {node.quickActions?.length ? (
              <div className="mb-4 grid grid-cols-2 gap-2">
                {node.quickActions.map((opt, idx) => (
                  <OptionBtn
                    key={`qa-${idx}`}
                    disabled={isDisabled}
                    onClick={() => { executeAction(opt as Option); if (opt.nextNode) handleOptionClick({ text: opt.text, nextNode: opt.nextNode as ChatNodeKey }); }}
                    rightIcon={<ExternalLink size={16} />}
                  >
                    {opt.text}
                  </OptionBtn>
                ))}
              </div>
            ) : null}

            {/* Sub-options */}
            {node.subOptions?.length ? (
              <div className="mb-4">
                <p className="text-sm text-gray-700 mb-3 font-medium">Pilih opsi:</p>
                <div className="grid grid-cols-1 gap-3">
                  {node.subOptions.map((opt, idx) => (
                    <OptionBtn
                      key={`sub-${idx}`}
                      disabled={isDisabled}
                      onClick={() => handleOptionClick({ text: opt.text, nextNode: opt.nextNode as ChatNodeKey })}
                    >
                      {opt.text}
                    </OptionBtn>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Product categories */}
            {node.productCategories?.length ? (
              <div className="mb-4">
                <p className="text-sm text-gray-700 mb-3 font-medium">Kategori produk:</p>
                <div className="grid grid-cols-2 gap-3">
                  {node.productCategories.map((p, idx) => (
                    <OptionBtn
                      key={`cat-${idx}`}
                      disabled={isDisabled}
                      onClick={() => handleOptionClick({ text: p.name, nextNode: p.nextNode as ChatNodeKey })}
                    >
                      {p.name}
                    </OptionBtn>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Dynamic Form */}
            {node.form && (
              <div className="mb-4">
                {node.form.intro && <p className="text-sm text-gray-700 mb-3">{node.form.intro}</p>}
                <div className="space-y-3">
                  {node.form.fields.map((f) => (
                    <div key={f.id}>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        {f.label}
                        {f.required && <span className="text-red-500"> *</span>}
                      </label>
                      {f.kind === 'select' ? (
                        <select
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={(formState[f.id] as string) ?? ''}
                          onChange={(e) => onChangeField(f.id, e.target.value)}
                        >
                          <option value="">{'Pilih salah satu'}</option>
                          {f.options.map((o) => (<option key={o} value={o}>{o}</option>))}
                        </select>
                      ) : f.kind === 'textarea' ? (
                        <textarea
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows={4}
                          placeholder={f.placeholder}
                          value={(formState[f.id] as string) ?? ''}
                          onChange={(e) => onChangeField(f.id, e.target.value)}
                        />
                      ) : (
                        <input
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          type={f.kind === 'email' ? 'email' : f.kind === 'tel' ? 'tel' : f.kind === 'number' ? 'number' : 'text'}
                          // Gunakan casting ke NumericField
                          min={(f as NumericField).min}
                          max={(f as NumericField).max}
                          step={(f as NumericField).step}
                          placeholder={f.placeholder}
                          value={(formState[f.id] as string) ?? ''}
                          onChange={(e) => onChangeField(f.id, e.target.value)}
                        />
                      )}
                      {formErrors[f.id] && <p className="text-xs text-red-600 mt-1">{formErrors[f.id]}</p>}
                      {f.helpText && <p className="text-[11px] text-gray-500 mt-1">{f.helpText}</p>}
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <OptionBtn disabled={isDisabled} onClick={submitForm}>
                    {node.form.ctaLabel ?? 'Kirim'}
                  </OptionBtn>
                </div>
              </div>
            )}

            {/* Regular Options */}
            <div className="space-y-3">
              {node.options.map((opt, idx) => (
                <OptionBtn
                  key={`opt-${idx}`}
                  disabled={isDisabled}
                  onClick={() => {
                    const o = opt as Option;
                    if (o.action) executeAction(o);
                    if (o.nextNode) handleOptionClick({ text: o.text, nextNode: o.nextNode as ChatNodeKey });
                  }}
                  rightIcon={opt.action?.type === 'copy' ? <Copy size={16} /> : undefined}
                >
                  {opt.text}
                </OptionBtn>
              ))}
            </div>

            {interactionLock && (
              <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg text-sm text-yellow-800 flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse" />
                Mohon tunggu, sedang memproses...
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Komponen Tombol yang Dikembangkan
function OptionBtn({ children, disabled, onClick, rightIcon }: { children: React.ReactNode; disabled?: boolean; onClick?: () => void; rightIcon?: React.ReactNode; }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      disabled={disabled}
      className={`w-full flex items-center justify-between bg-white border border-gray-200 text-gray-800 px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200 text-sm font-medium ${disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
    >
      <span className="truncate">{children}</span>
      {rightIcon && <span className="ml-3 shrink-0 text-gray-500 group-hover:text-blue-600">{rightIcon}</span>}
    </motion.button>
  );
}