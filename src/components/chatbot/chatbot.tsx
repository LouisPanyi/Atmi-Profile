// src/components/chatbot/Chatbot.tsx
import { useState } from "react";
import { ChatNodeKey, chatFlow } from './flow';
import ChatWindow, { ChatMessage } from './chat-window';
import ChatButton from './chat-button';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentNode, setCurrentNode] = useState<ChatNodeKey>("start");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [history, setHistory] = useState<ChatNodeKey[]>(["start"]);
  const [interactionLock, setInteractionLock] = useState(false);

  const botSay = (text: string) => setMessages((prev) => [...prev, { sender: "bot", text }]);

  const sendBotNodeMessage = (nodeKey: ChatNodeKey) => {
    const node = chatFlow[nodeKey];
    const text = node.botMessage ?? node.rich?.hero?.subtitle ?? "";
    if (!text) return;
    setIsBotTyping(true);
    setInteractionLock(true);
    setTimeout(() => {
      botSay(text);
      setIsBotTyping(false);
      setTimeout(() => setInteractionLock(false), 600);
    }, 700);
  };

  const startChat = () => {
    setIsOpen(true);
    setHistory(["start"]);
    setCurrentNode("start");
    setMessages([]);
    setInteractionLock(false);
    sendBotNodeMessage("start");
  };

  const handleOptionClick = (option: { text: string; nextNode?: ChatNodeKey }) => {
    if (interactionLock || !option.nextNode) return;

    setInteractionLock(true);
    setMessages((prev) => [...prev, { sender: "user", text: option.text }]);

    const nextNodeKey = option.nextNode;
    setHistory((prev) => [...prev, nextNodeKey]);
    setCurrentNode(nextNodeKey);

    setTimeout(() => sendBotNodeMessage(nextNodeKey), 120);
  };

  const handleBackClick = () => {
    if (interactionLock || history.length <= 1) return;
    setInteractionLock(true);

    const newHistory = [...history];
    newHistory.pop();
    const prevNode = newHistory[newHistory.length - 1];

    setHistory(newHistory);
    setCurrentNode(prevNode);

    const prevNodeData = chatFlow[prevNode];
    const text = prevNodeData.botMessage ?? prevNodeData.rich?.hero?.subtitle ?? "";
    if (text) botSay(text);

    setTimeout(() => setInteractionLock(false), 100);
  };

  const onSubmitForm = (nodeKey: ChatNodeKey, payload: Record<string, unknown>) => {
    const node = chatFlow[nodeKey];
    const form = node.form;
    if (!form) return;

    const summary = Object.entries(payload)
      .filter(([, v]) => String(v ?? '').trim() !== '')
      .map(([k, v]) => `• ${k}: ${v}`)
      .join('\n');

    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: `${form.ctaLabel ?? 'Kirim'} ✅` },
      { sender: 'bot', text: `Data diterima:\n${summary}` },
    ]);

    const nextKey = node.form!.submitNextNode as ChatNodeKey;
    setHistory((prev) => [...prev, nextKey]);
    setCurrentNode(nextKey);
    sendBotNodeMessage(nextKey);
  };

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <ChatButton onClick={startChat} isOpen={isOpen} />
      {isOpen && (
        <ChatWindow
          isOpen={isOpen}
          messages={messages}
          currentNode={currentNode}
          history={history}
          isBotTyping={isBotTyping}
          interactionLock={interactionLock}
          handleBackClick={handleBackClick}
          handleOptionClick={handleOptionClick}
          onSubmitForm={onSubmitForm}
          onClose={handleClose}
        />
      )}
    </>
  );
}
