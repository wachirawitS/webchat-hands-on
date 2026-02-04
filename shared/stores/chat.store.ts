import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { IChat, IMessage } from "../interfaces/chat.interface";

type ChatState = {
  chat: IChat | null;
  messages: IMessage[];
  setChat: (chat: IChat) => void;
  setMessages: (messages: IMessage[]) => void;
  pushMessage: (message: IMessage) => void;
  clear: () => void;
};

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      chat: null,
      messages: [],
      setChat: (chat) => set({ chat }),
      setMessages: (messages) => set({ messages }),
      pushMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
      clear: () => set({ chat: null }),
    }),
    {
      name: "chat-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
