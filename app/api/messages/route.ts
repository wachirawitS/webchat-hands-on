import { prisma } from '@/lib/prisma'
import { MessageSource } from '@/shared/enums/message.enum'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { to, text } = await req.json()

  if (!to || !text) {
    return new Response('missing_parameters', { status: 400 })
  }

  const res = await fetch('https://api.line.me/v2/bot/message/push', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.LINE_OA_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: to,
      messages: [{ type: 'text', text }],
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error(err)
    return new Response('LINE push failed', { status: 500 })
  }

  // save chat to db
  await prisma.message.create({
    data: {
      chatKey: to,
      message: text,
      source: MessageSource.ADMIN,
    },
  });

  await prisma.chat.update({
    where: { key: to },
    data: { lastMessage: text },
  });

  return new Response('OK')
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const chatKey = searchParams.get('chatKey')

  if (!chatKey) {
    return NextResponse.json({ error: 'missing_chatKey' }, { status: 400 })
  }

  const messages = await prisma.message.findMany({
    where: {
      chatKey: chatKey,
    },
    orderBy: { createdAt: 'asc' },
  });

  return NextResponse.json({
    messages: messages,
  })
}
