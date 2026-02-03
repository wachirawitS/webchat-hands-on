import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

interface ChatOptionProps {
  title: string
  roomImageUrl?: string
  lastMessage?: string
  updatedAt?: string
  isSelected?: boolean
  onClick?: () => void
}

const ChatOption = ({ title, roomImageUrl, lastMessage, updatedAt, isSelected, onClick }: ChatOptionProps) => {
  return (
    <div onClick={onClick} className={cn('p-4 flex gap-2.5 hover:bg-zinc-100 cursor-pointer duration-200', isSelected && 'bg-zinc-200')}>
      <Avatar>
        <AvatarImage src={roomImageUrl} alt="@evilrabbit" />
        <AvatarFallback>ER</AvatarFallback>
        <AvatarBadge className="bg-green-600 dark:bg-green-800" />
      </Avatar>

      <div className="flex flex-col w-full">
        <div className="flex justify-between">
          <span className="text-xs font-semibold">{title}</span>
          <span className="text-xs text-gray-500 ml-2">{updatedAt}</span>
        </div>
        <span className="text-xs text-gray-600 truncate w-32">{lastMessage}</span>
      </div>
    </div>
  )
}

export default ChatOption
