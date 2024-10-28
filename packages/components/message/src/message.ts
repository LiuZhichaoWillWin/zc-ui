import { MessageType } from "./types";

export interface MessageProps {
  type?: MessageType;
  message?: string;
  duration?: number;
}

export type MessageOptions = Partial<MessageProps>;