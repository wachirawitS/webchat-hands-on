'use client'
import Image from 'next/image'

const ChatNonSelected = () => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Image src={'/not-selected-chat.svg'} width={150} height={150} alt="unsele" />
    </div>
  )
}

export default ChatNonSelected
