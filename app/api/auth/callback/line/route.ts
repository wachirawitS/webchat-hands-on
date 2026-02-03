import { NextRequest, NextResponse } from 'next/server'
import { SignJWT } from 'jose'

type LineTokenResponse = {
  access_token: string
  expires_in: number
  id_token?: string
  refresh_token?: string
  scope?: string
  token_type?: string
}


export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const error = url.searchParams.get('error')
  const errorDescription = url.searchParams.get('error_description')

  if (error) {
    return NextResponse.json(
      { error, error_description: errorDescription ?? null },
      { status: 400 }
    )
  }

  if (!code) {
    return NextResponse.json({ error: 'missing_code' }, { status: 400 })
  }

  const clientId = process.env.NEXT_PUBLIC_LINE_CHANNEL_ID
  const clientSecret = process.env.LINE_CHANNEL_SECRET
  const redirectUri = process.env.NEXT_PUBLIC_LINE_REDIRECT_URI

  if (!clientId || !clientSecret || !redirectUri) {
    return NextResponse.json(
      { error: 'missing_env', clientId: !!clientId, clientSecret: !!clientSecret, redirectUri: !!redirectUri },
      { status: 500 }
    )
  }

  const tokenBody = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
    client_id: clientId,
    client_secret: clientSecret,
  })

  const tokenRes = await fetch('https://api.line.me/oauth2/v2.1/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: tokenBody,
  })

  if (!tokenRes.ok) {
    const message = await tokenRes.text()
    return NextResponse.json({ error: 'token_exchange_failed', message }, { status: 502 })
  }

  const token = (await tokenRes.json()) as LineTokenResponse

  const profileRes = await fetch('https://api.line.me/v2/profile', {
    headers: { Authorization: `Bearer ${token.access_token}` },
  })

  if (!profileRes.ok) {
    const message = await profileRes.text()
    return NextResponse.json({ error: 'profile_fetch_failed', message, token }, { status: 502 })
  }

  const profile = await profileRes.json()

  const jwtSecret = process.env.LINE_JWT_SECRET
  if (!jwtSecret) {
    return NextResponse.json({ error: 'missing_jwt_secret' }, { status: 500 })
  }

  const jwt = await new SignJWT({ token, profile })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(new TextEncoder().encode(jwtSecret))

  const redirectUrl = new URL('/auth', process.env.BASE_URL || url.origin)
  
  const response = NextResponse.redirect(redirectUrl)
  response.cookies.set('line_auth', jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60, // 1 hour
    path: '/',
  })

  return response
}
