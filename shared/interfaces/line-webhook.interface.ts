export type LineWebhookEvent = {
  type: string
  mode?: string
  timestamp?: number
  source?: {
    type: string
    userId?: string
  }
  webhookEventId?: string
  deliveryContext?: {
    isRedelivery: boolean
  }
  message?: {
    id: string
    type: string
    text?: string
  }
  replyToken?: string
}

export type LineWebhookBody = {
  destination?: string
  events: LineWebhookEvent[]
}
