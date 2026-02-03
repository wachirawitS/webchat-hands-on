import { IChannelData } from "@/shared/interfaces/channel-data.interface";

export const lineOAService = {
  getProfile: async (): Promise<IChannelData> => {
    const res = await fetch("/api/line-oa/get-profile");
    const data = await res.json();
    return data;
  }
};
