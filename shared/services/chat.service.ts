import { IChat, IMessage } from "../interfaces/chat.interface";

export const chatService = {
  getChats: async (): Promise<{chats: IChat[]}> => {
    const res = await fetch('/api/chats', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return res.json();
  },
  pushMessage: async (to: string, text: string): Promise<void> => {
    await fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ to, text }),
    });
  },
  getMessagesByChatKey: async (chatKey: string): Promise<{messages: IMessage[]}> => {
    const res = await fetch(`/api/messages?chatKey=${chatKey}`);
    return res.json();
  }
}
