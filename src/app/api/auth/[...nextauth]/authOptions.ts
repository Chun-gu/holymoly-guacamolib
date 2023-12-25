import { prisma } from '@/lib/db'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import { type AuthOptions } from 'next-auth'
import generateRandomUsername from '@/lib/utils/generateRandomUsername'

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      let isExist = true
      while (isExist) {
        const randomUsername = generateRandomUsername()
        const foundUser = await prisma.user.findUnique({
          where: { name: randomUsername },
        })
        if (foundUser === null) {
          isExist = false
          user.name = randomUsername
          user.image = '/user-icon.svg'
        }
      }
      return true
    },
    async jwt({ token, user, account, profile }) {
      const db_user = await prisma.user.findFirst({
        where: { email: token?.email || undefined },
      })

      if (db_user) token.id = db_user.id

      return token
    },

    async session({ session, user, token }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session
    },
  },
}
