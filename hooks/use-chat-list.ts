import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { IChat } from '@/shared/interfaces/chat.interface'
import { chatService } from '@/shared/services/chat.service'

export const useChatList = (enabled: boolean = true) => {
  const [chats, setChats] = useState<IChat[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchChats = async () => {
    if (isLoading || !enabled) return
    setIsLoading(true)
    try {
      const data = await chatService.getChats()
      setChats(data.chats)
    } catch (error) {
      toast.error('Failed to load chats.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!enabled) return

    fetchChats()

    const interval = setInterval(() => {
      fetchChats()
    }, 5000)

    return () => clearInterval(interval)
  }, [enabled])

  return { chats, isLoading, refetch: fetchChats }
}
