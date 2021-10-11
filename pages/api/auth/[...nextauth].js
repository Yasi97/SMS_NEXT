import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.SECRET,

  database: process.env.DATABASE_URL,
  callbacks: {
    session: async (session, user) => {
      session.userId = user.sub;
      return Promise.resolve(session);
    },
  },
});
