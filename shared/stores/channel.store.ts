import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type ChannelProfile = {
  userId?: string;
  basicId?: string;
  displayName?: string;
  pictureUrl?: string;
  chatMode?: string;
  markAsReadMode?: string;
};

type ChannelState = {
  profile: ChannelProfile | null;
  setChannel: (profile: ChannelProfile) => void;
  clear: () => void;
};

export const useChannelStore = create<ChannelState>()(
  persist(
    (set) => ({
      profile: null,
      setChannel: (profile) => set({ profile }),
      clear: () => set({ profile: null }),
    }),
    {
      name: "line-channel-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
