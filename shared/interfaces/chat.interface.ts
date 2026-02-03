export interface IChat {
  id: string
  key: string
  title: string
  roomProfileUrl: string
  lastMessage: string
  createdAt: string
  updatedAt: string
}

export interface IMessage {
  id: string
  chatKey: string
  message: string
  source: string
  createdAt: string
}
