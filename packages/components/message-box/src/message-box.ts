import { MessageBoxInstance } from ".";

export interface MessageBoxPropps {
  title?: string;
  text?: string;
  beforeClose?: ((action: string, compInstance: MessageBoxInstance, done: () => void) => unknown) | null
}

export type MessageBoxOptions = Partial<MessageBoxPropps>;