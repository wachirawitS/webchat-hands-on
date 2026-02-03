import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET() {
  const accessToken = process.env.LINE_OA_ACCESS_TOKEN

  if (!accessToken) {
    return NextResponse.json(
      { error: 'missing_line_oa_access_token' },
      { status: 500 }
    )
  }

  try {
    const res = await axios.get('https://api.line.me/v2/bot/info', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    console.log(res.data)
    return NextResponse.json(res.data)
  } catch (error) {
    console.error('Failed to fetch LINE OA profile:', error)
    return NextResponse.json(
      { error: 'fetch_failed', details: error instanceof Error ? error.message : 'unknown' },
      { status: 502 }
    )
  }
}
