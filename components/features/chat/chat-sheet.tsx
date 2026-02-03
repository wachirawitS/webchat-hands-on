'use client'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { MessageCircleMore, TextAlignJustify } from 'lucide-react'
import { useChatStore } from '@/shared/stores/chat.store'
import { getRelativeTime } from '@/lib/utils'
import ChatOption from './chat-option'
import { useChatList } from '@/hooks/use-chat-list'
import { useIsMobile } from '@/hooks/use-mobile'

const ChatSheet = () => {
  const isMobile = useIsMobile()
  const { setChat, chat } = useChatStore()
  const { chats } = useChatList(isMobile)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="sm:hidden" variant="ghost">
          <MessageCircleMore className='text-primary' />
        </Button>
      </SheetTrigger>
      <SheetContent showCloseButton={false} side="right" className="w-64 gap-0">
        <SheetHeader>
          <SheetTitle className='text-lg font-bold text-primary flex items-center gap-2'>
            <MessageCircleMore />
            Chats
          </SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-auto">
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
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default ChatSheet
