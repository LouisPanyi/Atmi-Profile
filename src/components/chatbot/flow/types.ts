// src/components/chatbot/flow/types.ts
export type CurrencyIDR = number;

export type ChatActionType =
  | "open_url"
  | "open_map"
  | "mailto"
  | "tel"
  | "whatsapp"
  | "submit_form"
  | "copy"
  | "none";

export type ChatAction = {
  type: ChatActionType;
  value?: string; // URL, email, phone, WA link, copy text
  analyticsTag?: string;
};

export type Option = {
  text: string;
  nextNode?: string;
  action?: ChatAction;
  hotkey?: string; // e.g., "1", "W"
  analyticsTag?: string;
  disabled?: boolean;
};

export type ContactItem = {
  type: "Alamat" | "Telepon" | "Email" | "Website" | string;
  value: string;
};

export type Highlight = {
  title: string;
  detail?: string;
  icon?: string; // lucide name, if your UI uses it
};

export type FormFieldBase = {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  helpText?: string;
};

export type FormField =
  | (FormFieldBase & { kind: "text" | "email" | "tel" | "textarea" })
  | (FormFieldBase & { kind: "select"; options: string[] })
  | (FormFieldBase & { kind: "number"; min?: number; max?: number; step?: number });

export type RichContent = {
  hero?: { title: string; subtitle?: string };
  highlights?: Highlight[];
  media?: { kind: "image" | "video"; src: string; alt?: string }[];
  priceNote?: string;
};

export type ChatNode = {
  botMessage?: string;
  rich?: RichContent;
  contactInfo?: ContactItem[];
  productCategories?: { name: string; nextNode: string }[];
  subOptions?: Option[]; // secondary options displayed inline
  options: Option[]; // primary navigation options (mandatory)
  form?: {
    intro?: string;
    fields: FormField[];
    ctaLabel?: string;
    submitNextNode: string;
  };
  quickActions?: Option[]; // CTA row (WA, Email, Map...)
  analyticsTag?: string;
};

export type ChatFlowMap = Record<string, ChatNode>;
export type ChatNodeKey = string;