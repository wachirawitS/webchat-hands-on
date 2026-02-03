export const messageService = {
  pushMessage: async (lineUserId: string, text: string): Promise<void> => {
    await fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lineUserId: lineUserId, text }),
    });
  },
}