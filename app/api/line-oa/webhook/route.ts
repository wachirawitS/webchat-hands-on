import { NextRequest, NextResponse } from 'next/server'
import { LineWebhookBody } from '@/shared/interfaces/line-webhook.interface'
import { IProfile } from '@/shared/interfaces/profile.interface'
import { prisma } from '@/lib/prisma'

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
      const text = event.message.text;
      if (!userId || !text) continue
      await handleUserProfile(userId);
      await handleChatMessage(userId, text)
    }
  }

  return NextResponse.json({ success: true })
}

// Handle fetching and storing user profile
const handleUserProfile = async (userId: string) => {
  const profile: IProfile = await getLineUserProfile(userId)
  await prisma.user.upsert({
    where: { lineUserId: userId },
    update: {
      displayName: profile.displayName,
      pictureUrl: profile.pictureUrl,
    },
    create: {
      lineUserId: userId,
      displayName: profile.displayName,
      pictureUrl: profile.pictureUrl,
    },
  });
}

const handleChatMessage = async (userId: string, text: string) => {
  const chatId = `HANDS-ON-${userId}`;
  await prisma.chatMessage.create({
    data: {
      fromUserId: userId,
      toUserId: chatId,
      chatId: chatId,
      message: text,
      timestamp: new Date(),
    },
  });
}

const getLineUserProfile = async (userId: string) => {
  const res = await fetch(`https://api.line.me/v2/bot/profile/${userId}`, {
    headers: {
      Authorization: `Bearer ${process.env.LINE_OA_ACCESS_TOKEN}`,
    },
  })

  return await res.json()
}
