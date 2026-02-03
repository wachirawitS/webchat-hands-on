import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { IChat } from "../interfaces/chat.interface";

type ChatState = {
  chat: IChat | null;
  setChat: (chat: IChat) => void;
  clear: () => void;
};

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      chat: null,
      setChat: (chat) => set({ chat }),
      clear: () => set({ chat: null }),
    }),
    {
      name: "chat-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
