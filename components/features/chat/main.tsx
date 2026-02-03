'use client'

import { useChatStore } from '@/shared/stores/chat.store'
import ChatNonSelected from './chat-non-selected'
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import ChatInput from './chat-input'
import { chatService } from '@/shared/services/chat.service'
import Chat from './chat'
import { useState } from 'react'
import ChatSheet from './chat-sheet'
import Resources from '../resources/resources'

const MainChatPage = () => {
  const [forceRefresh, setForceRefresh] = useState(false)
  const { chat } = useChatStore()
  if (!chat) {
    return <ChatNonSelected />
  }
  return (
    <div className="h-full flex flex-col gap-2.5">
      <div className='space-y-2 sm:hidden'>
        <p className="text-xl font-bold">Hands On Web Chat</p>
        <Resources />
      </div>
      <div className="h-fit flex justify-between">
        <div className="flex gap-2.5">
          <Avatar>
            <AvatarImage src={chat?.roomProfileUrl} alt="@evilrabbit" />
            <AvatarFallback>ER</AvatarFallback>
            <AvatarBadge className="bg-green-600 dark:bg-green-800" />
          </Avatar>
          <div className="flex flex-col w-full">
            <span className="text-xs font-semibold">{chat?.title}</span>
            <span className="text-xs text-green-500">online</span>
          </div>
        </div>
        <ChatSheet />
      </div>
      <Chat forceRefresh={forceRefresh} />
      <ChatInput
        onSendMessage={async (message) => {
          if (!chat) return
          await chatService.pushMessage(chat.key, message)
          setForceRefresh((prev) => !prev)
        }}
      />
    </div>
  )
}

export default MainChatPage
