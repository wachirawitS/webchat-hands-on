import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const chats = await prisma.chat.findMany({
    orderBy: { updatedAt: 'desc' },
  })

  return NextResponse.json({
    chats: chats,
  })
}
