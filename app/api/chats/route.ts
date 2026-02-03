import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const messages = await prisma.chat.findMany({
    orderBy: { createdAt: 'asc' },
  })

  return NextResponse.json({
    messages: messages,
  })
}
