'use client'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useChatStore } from '@/shared/stores/chat.store'
import { chatService } from '@/shared/services/chat.service'
import { Loader, LoaderCircle } from 'lucide-react'

type Props = {
  forceRefresh?: boolean
}

const Chat = ({ forceRefresh }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const { chat, messages, setMessages } = useChatStore()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isAtBottom, setIsAtBottom] = useState(true)
  const isInitialLoadRef = useRef(true)

  const initPage = async (isInitial = false) => {
    if (!chat) return
    
    if (isInitial) {
      setIsLoading(true)
    }
    
    try {
      const data = await chatService.getMessagesByChatKey(chat.key)
      setMessages(data.messages)
    } catch (error) {
      toast.error('Failed to load chats.')
    } finally {
      if (isInitial) {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    if (!chat) return

    if (isInitialLoadRef.current) {
      initPage(true)
      isInitialLoadRef.current = false
    } else {
      initPage(false)
    }

    const interval = setInterval(() => {
      initPage(false)
    }, 5000)

    return () => clearInterval(interval)
  }, [chat?.key, forceRefresh])

  useEffect(() => {
    if (isAtBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isAtBottom])

  const handleScroll = () => {
    if (!containerRef.current) return
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current
    const isBottom = scrollHeight - scrollTop - clientHeight < 50
    setIsAtBottom(isBottom)
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <LoaderCircle className='animate-spin text-gray-500'  />
      </div>
    )
  }

  return (
    <div 
      ref={containerRef}
      onScroll={handleScroll}
      className="flex-1 overflow-auto text-sm pr-2"
    >
      {messages.map((msg) => (
        <div key={msg.id} className={msg.source === 'admin' ? 'text-right' : 'text-left'}>
          <div
            className={
              msg.source === 'admin'
                ? 'inline-block bg-primary text-white p-2 rounded-lg my-1'
                : 'inline-block bg-gray-200 text-black p-2 rounded-lg my-1'
            }
          >
            {msg.message}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default Chat
