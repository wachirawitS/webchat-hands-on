'use client'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface ChatInputProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
}

const ChatInput = ({ onSendMessage, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState<string>('')

  const handleSend = () => {
    if (!message || message.trim() === '') {
      return
    }
    onSendMessage(message.trim())
    setMessage('')
  }

  return (
    <div className="h-fit">
      <InputGroup className="bg-white">
        <InputGroupInput
          className="text-sm"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
          }}
          placeholder="Type a message..."
          disabled={disabled}
        />
        <InputGroupAddon align="inline-end">
          <Button onClick={handleSend} type="button" variant={'ghost'} size={'xs'}>
            <ArrowUp />
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

export default ChatInput
