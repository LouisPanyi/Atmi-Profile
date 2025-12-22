// src/components/chatbot/flow/index.ts
import { ChatFlowMap } from './types';
import { mainNodes } from './nodes/main';
import { aboutNodes } from './nodes/about';
import { locationNodes } from './nodes/location';
import { serviceNodes } from './nodes/services';
import { productNodes } from './nodes/products';
// Gabungkan semua node
export const chatFlow: ChatFlowMap = {
  ...mainNodes,
  ...aboutNodes,
  ...locationNodes,
  ...serviceNodes,
  ...productNodes,
};

// Ekspor tipe
export type { ChatNodeKey } from './types';
export type { Option } from './types';
export type { ContactItem } from './types';
export type { FormField } from './types';

// Ekspor helper
export { formatCurrencyID, buildWhatsAppLink, validateForm, getNode, goToNext } from './helpers';