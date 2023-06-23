import NextAuth from "next-auth"
import GoogleProvider from 'next-auth/providers/google'

console.log({
  clientId: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET
})

const handler = NextAuth({
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
})

export { handler as GET, handler as POST }