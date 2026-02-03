"use client";

import { IProfile } from "@/shared/interfaces/profile.interface";
import { IToken } from "@/shared/interfaces/token.interface";
import { lineOAService } from "@/shared/services/line-oa.service";
import { useAuthStore } from "@/shared/stores/auth.store";
import { useChannelStore } from "@/shared/stores/channel.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  palyload: { profile: IProfile, token: IToken }
}

const AuthSetup = ({ palyload }: Props) => {
  const { setAuth } = useAuthStore();
  const { setChannel } = useChannelStore();
  const router = useRouter();

  const initPage = async () => {
    // set profile
    setAuth(palyload?.profile || {}, palyload?.token || {});
    router.replace('/chat');

    // set channel profile
    const channelProfile = await lineOAService.getProfile();
    setChannel(channelProfile);
  }

  useEffect(() => {
    initPage();
  }, []);

  return (
    <div>AuthSetup...</div>
  )
}

export default AuthSetup