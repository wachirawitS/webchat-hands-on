export const lineAuth = {
  getRedirectUrl: () => {
    const url = 'https://access.line.me/oauth2/v2.1/authorize'
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: process.env.NEXT_PUBLIC_LINE_CHANNEL_ID ?? '',
      redirect_uri: process.env.NEXT_PUBLIC_LINE_REDIRECT_URI ?? '',
      state: 'random_state_string',
      scope: 'profile',
    })

    return `${url}?${params.toString()}`
  }
}