'use client'

import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { Figma, Github, MessageCircle } from 'lucide-react'

const Resources = () => {
  return (
    <div>
      <ButtonGroup>
        <Button size="sm" onClick={() => window.open('https://lin.ee/5VzqJZT', '_blank')} variant="outline">
          <MessageCircle />
          Line OA
        </Button>
        <Button onClick={() => window.open('https://github.com/wachirawitS/webchat-hands-on', '_blank')} size="sm" variant="outline">
          <Github fill="" />
          Git Hub
        </Button>
        <Button
          size="sm"
          onClick={() =>
            window.open('https://www.figma.com/board/EDcQBSsiWUCCsC1hLiHSYL/Web-Chat-Handons?node-id=0-1&t=lK4sIYZ7akVeshAj-1', '_blank')
          }
          variant="outline"
        >
          <Figma />
          Figjam
        </Button>
      </ButtonGroup>
    </div>
  )
}

export default Resources
