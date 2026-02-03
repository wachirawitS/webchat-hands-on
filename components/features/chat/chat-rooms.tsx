'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useIsMobile } from '@/hooks/use-mobile'
import { getRelativeTime } from '@/lib/utils'
import { useChatStore } from '@/shared/stores/chat.store'
import { MessageCircleMore } from 'lucide-react'
import ChatOption from './chat-option'
import { useChatList } from '@/hooks/use-chat-list'

const ChatRooms = () => {
  const isMobile = useIsMobile()
  const { setChat, chat } = useChatStore()
  const { chats } = useChatList(!isMobile)

  if (isMobile) {
    return null
  }

  return (
    <Card className="w-64 h-full pb-0 overflow-hidden gap-2">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-primary flex items-center gap-2">
          <MessageCircleMore />
          Chats
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0 overflow-auto">
        {chats.map((chatItem) => (
          <ChatOption
            key={chatItem.id}
            title={chatItem.title}
            roomImageUrl={chatItem.roomProfileUrl}
            lastMessage={chatItem.lastMessage}
            updatedAt={getRelativeTime(chatItem.updatedAt)}
            isSelected={chat?.key === chatItem.key}
            onClick={() => setChat(chatItem)}
          />
        ))}
      </CardContent>
    </Card>
  )
}

export default ChatRooms
