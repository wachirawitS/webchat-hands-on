import { NextRequest, NextResponse } from 'next/server'
import { LineWebhookBody } from '@/shared/interfaces/line-webhook.interface'
import { IProfile } from '@/shared/interfaces/profile.interface'
import { prisma } from '@/lib/prisma'
import { MessageSource } from '@/shared/enums/message.enum'

export async function POST(req: NextRequest) {
  const channelSecret = process.env.LINE_CHANNEL_SECRET

  if (!channelSecret) {
    return NextResponse.json({ error: 'missing_channel_secret' }, { status: 500 })
  }

  const signature = req.headers.get('x-line-signature')
  if (!signature) {
    return NextResponse.json({ error: 'missing_signature' }, { status: 400 })
  }

  const body = await req.text()

  const webhookData: LineWebhookBody = JSON.parse(body)

  for (const event of webhookData.events) {
    if (event.type === 'message' && event.message?.type === 'text') {
      const userId = event.source?.userId
      const text = event.message.text
      if (!userId || !text) continue
      const chatKey = userId

      const profile: IProfile = await getLineUserProfile(userId);
      await prisma.chat.upsert({
        where: { key: chatKey },
        update: {
          title: profile.displayName,
          roomProfileUrl: profile.pictureUrl,
          lastMessage: text,
        },
        create: {
          key: chatKey,
          title: profile.displayName,
          roomProfileUrl: profile.pictureUrl,
          lastMessage: text,
        },
      });

      await prisma.message.create({
        data: {
          chatKey: chatKey,
          message: text,
          source: MessageSource.USER
        }
      })
    }
  }

  return NextResponse.json({ success: true })
}

const getLineUserProfile = async (userId: string) => {
  const res = await fetch(`https://api.line.me/v2/bot/profile/${userId}`, {
    headers: {
      Authorization: `Bearer ${process.env.LINE_OA_ACCESS_TOKEN}`,
    },
  })

  return await res.json()
}
