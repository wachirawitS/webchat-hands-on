# Webchat Hands-on

A sample web chat project connected to LINE Official Account (LINE OA) using Next.js App Router, Prisma, and MongoDB.

The app works as a web-based admin chat console that can:

- load chat rooms from the database
- display each user's message history
- receive messages from a LINE webhook and store them in the database
- send replies from the web UI to users through the LINE Messaging API

This project is suitable as a workshop example, starter project, or base for building an inbox or customer support dashboard.

## Features

- display chat rooms and the latest message
- open a room to view message history
- send messages from an admin user to LINE OA users
- receive LINE OA webhook events and sync them to MongoDB
- fetch LINE OA profile information through an internal API
- use Zustand for client-side chat and message state
- refresh rooms and messages every 5 seconds using polling

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Prisma ORM
- MongoDB
- Tailwind CSS 4
- Zustand
- LINE Messaging API

## Project Structure

```text
app/
	api/
		chats/                 fetch chat rooms
		messages/              fetch room messages / send outbound messages
		line-oa/
			get-profile/         fetch LINE OA profile
			webhook/             receive LINE webhook events
components/
	features/chat/           main chat UI
hooks/                     polling and responsive behavior
lib/                       Prisma client and utility functions
prisma/                    database schema
shared/
	enums/                   constants and enums
	interfaces/              TypeScript interfaces
	services/                client-side service calls
	stores/                  Zustand store
```

## How It Works

### 1. Receiving messages from LINE

When a user sends a message to LINE OA:

1. LINE sends an event to `POST /api/line-oa/webhook`
2. The app extracts the `userId` and text message from the webhook payload
3. The app calls the LINE Profile API to get the user's display name and profile image
4. The app upserts the chat room into the `Chat` collection
5. The app stores the message in the `Message` collection

### 2. Sending messages from the web UI to LINE

When an admin sends a message from the web UI:

1. The client calls `POST /api/messages`
2. The API sends the message through the LINE Push Message API
3. If the request succeeds, the app stores the message in the database with source `admin`
4. The app updates the chat room's `lastMessage`

### 3. Displaying data in the UI

- chat rooms are loaded from `GET /api/chats`
- room messages are loaded from `GET /api/messages?chatKey=...`
- the client refreshes data every 5 seconds using polling

## Data Model

This project uses two main MongoDB collections.

### Chat

- `key` room identifier, currently using the LINE `userId`
- `title` user's display name
- `roomProfileUrl` profile image URL
- `lastMessage` latest message text
- `createdAt`, `updatedAt`

### Message

- `chatKey` reference to the chat room
- `message` message content
- `source` message origin such as `user` or `admin`
- `createdAt`

## Environment Variables

Create a `.env` file in the project root with the following values:

```env
DATABASE_URL="mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority"
LINE_CHANNEL_SECRET="your-line-channel-secret"
LINE_OA_ACCESS_TOKEN="your-line-channel-access-token"
```

Variable descriptions:

- `DATABASE_URL` MongoDB connection string for Prisma
- `LINE_CHANNEL_SECRET` secret for the Messaging API channel
- `LINE_OA_ACCESS_TOKEN` channel access token used to call LINE APIs

## Getting Started

### Prerequisites

- Node.js 20 or later
- MongoDB or MongoDB Atlas
- a LINE Official Account with Messaging API enabled

### Install

```bash
npm install
```

After installation, `prisma generate` runs automatically via `postinstall`.

### Run in Development

```bash
npm run dev
```

Then open `http://localhost:3000`.

## LINE Webhook Setup

Set the webhook URL in LINE Developers Console to:

```text
https://<your-domain>/api/line-oa/webhook
```

If you are testing locally, use a tunnel such as ngrok or Cloudflare Tunnel and register the public URL in LINE Developers.

Example:

```text
https://<public-url>/api/line-oa/webhook
```

## API Endpoints

### `GET /api/chats`

Fetch all chat rooms ordered by the latest update.

### `GET /api/messages?chatKey=<chatKey>`

Fetch all messages for the specified chat room.

### `POST /api/messages`

Send a message to a LINE user through LINE OA.

Request body:

```json
{
	"to": "LINE_USER_ID",
	"text": "Hello from admin"
}
```

### `GET /api/line-oa/get-profile`

Fetch the basic profile information of the LINE OA associated with the configured access token.

### `POST /api/line-oa/webhook`

Receive webhook events from LINE OA and store incoming messages in the database.

## Notes and Current Limitations

- this is a hands-on project for learning and extension, not a fully production-ready system
- the webhook route currently checks only for the presence of the `x-line-signature` header and does not yet verify the HMAC signature
- the app uses 5-second polling instead of a realtime transport such as WebSocket or Socket.IO
- outbound messaging uses the LINE Push API directly, so it fits a one-to-one chat flow where the `userId` is already known
- there is no admin authentication yet
- validation and error handling are still minimal in some endpoints

## Useful Commands

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Suggested Next Improvements

- add proper LINE webhook signature verification
- add admin authentication and authorization
- replace polling with realtime updates
- support more message types beyond plain text
- add room search and filtering
- add deployment and environment setup guidance for Vercel or another platform

## Reference

- GitHub repository: https://github.com/wachirawitS/webchat-hands-on
- LINE Messaging API: https://developers.line.biz/en/docs/messaging-api/

