"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ChannelProfile from "./channel-profile";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { messageService } from "@/shared/services/message.service";
import { toast } from "sonner";

const ChatCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  
  const sendMessage = async () => {
    if (!message || !userId) return;
    setIsLoading(true);
    try {
      await messageService.pushMessage(userId, message);
      setMessage("");
    } catch (error) {
      toast.error("Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>
          <ChannelProfile />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-96 overflow-y-auto border rounded-lg"></div>
      </CardContent>
      <CardFooter>
        <InputGroup>
          <InputGroupInput
            value={message || ""}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Type a message..."
            disabled={isLoading}
          />
          <InputGroupAddon align="inline-end">
            <Button
              onClick={sendMessage}
              type="button"
              variant={"ghost"}
              size={"xs"}
              disabled={isLoading}
            >
              <ArrowUp />
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </CardFooter>
    </Card>
  );
};

export default ChatCard;
