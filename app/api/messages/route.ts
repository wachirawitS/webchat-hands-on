import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const chatId = searchParams.get("chatId");
  const limit = searchParams.get("limit");
  const before = searchParams.get("before");

  if (!chatId) {
    return NextResponse.json({ error: "missing_chatId" }, { status: 400 });
  }

  const messages = await prisma.chatMessage.findMany({
    where: {
      chatId,
      ...(before && {
        timestamp: {
          lt: new Date(before),
        },
      }),
    },
    orderBy: { timestamp: "desc" },
    take: limit ? parseInt(limit) : 20,
  });

  // Reverse เพื่อให้ข้อความเก่าอยู่ข้างบน
  const sortedMessages = messages.reverse();

  return NextResponse.json({
    messages: sortedMessages,
    hasMore: messages.length === (limit ? parseInt(limit) : 20),
  });
}

export async function POST(req: Request) {
  const { lineUserId, text } = await req.json();

  if (!lineUserId || !text) {
    return new Response('missing_parameters', { status: 400 });
  }

  const res = await fetch('https://api.line.me/v2/bot/message/push', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.LINE_OA_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: lineUserId,
      messages: [{ type: 'text', text }],
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error(err)
    return new Response('LINE push failed', { status: 500 })
  }

  // save chat to db
  const chatId = `HANDS-ON-${lineUserId}`
  await prisma.chatMessage.create({
    data: {
      fromUserId: chatId,
      toUserId: lineUserId,
      chatId: chatId,
      message: text,
      timestamp: new Date(),
    },
  });

  return new Response('OK');
}
