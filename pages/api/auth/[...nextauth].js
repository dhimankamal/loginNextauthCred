import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: 'credentials',
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'my-project',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: 'email',
          type: 'email',
          placeholder: 'jsmith@example.com'
        },
        password: { label: 'Password', type: 'password' },
        tenantKey: {
          label: 'Tenant Key',
          type: 'text'
        }
      },
      async authorize (credentials, req) {
        const payload = {
          email: credentials.email,
          password: credentials.password
        }

        const userResp = await prisma.user.findUnique({
          where: {
            email: payload.email
          }
        })

        console.log('userResp', userResp)
        // user axit
        if (
          userResp &&
          userResp.id &&
          userResp.password === credentials.password
        ) {
          const user = {
            data: {
              email: userResp.email,
              password: userResp.password,
              token: userResp.id
            }
          }
          return user
        } else {
          throw new Error('user not exist')
        }
      }
    })
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt ({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: user.data.token,
          refreshToken: user.data.refreshToken
        }
      }

      return token
    },

    async session ({ session, token }) {
      session.user.accessToken = token.accessToken
      session.user.refreshToken = token.refreshToken
      session.user.accessTokenExpires = token.accessTokenExpires

      return session
    }
  },
  theme: {
    colorScheme: 'auto', // "auto" | "dark" | "light"
    brandColor: '', // Hex color code #33FF5D
    logo: '/vercel.svg' // Absolute URL to image
  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === 'development'
})
