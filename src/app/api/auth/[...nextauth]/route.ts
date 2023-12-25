import NextAuth, { DefaultSession } from 'next-auth'
import { authOptions } from './authOptions'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: { id: string } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
