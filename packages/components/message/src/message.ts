import { MessageType } from "./types";

export interface MessageProps {
<<<<<<< HEAD
  type?: MessageType;
=======
  type: MessageType;
>>>>>>> d27c22f (first connit)
  message?: string;
  duration?: number;
}

export type MessageOptions = Partial<MessageProps>;