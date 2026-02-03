"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthStore } from "@/shared/stores/auth.store";
import ChannelProfile from "./channel-profile";

const ChatCard = () => {
  const { profile } = useAuthStore();

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>
          <ChannelProfile/>
        </CardTitle>
        <CardDescription>
          {profile?.displayName ?? "No profile data"}
        </CardDescription>
        {/* <CardAction>{profile?.userId ?? ""}</CardAction> */}
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter>
        <p>{profile?.statusMessage ?? ""}</p>
      </CardFooter>
    </Card>
  );
};

export default ChatCard;
