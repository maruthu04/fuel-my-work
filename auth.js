import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from "next-auth/providers/github";
import User from '@/models/User';
import connectDb from '@/db/connectDb';

export const {handlers, auth, signIn, signOut} = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "github" || account.provider === "google") {
        try {
          // 1. Connect to DB
          await connectDb();

          // 2. Check if user already exists
          // BUG FIX: Use 'user.email', not 'email'
          const currentUser = await User.findOne({ email: user.email });

          if (!currentUser) {
            // 3. Create new user if not found
            const newUser = new User({
              email: user.email,
              // BUG FIX: Use 'user.email' here to prevent the "split of undefined" error
              username: user.email.split("@")[0], 
            });
            await newUser.save();
          }
          return true;
        } catch (error) {
          console.log("Error checking if user exists: ", error.message);
          return false;
        }
      }
      return true; // Return true for other providers or fallbacks
    },

    async session({ session, user, token }) {
      // 1. Connect to DB to fetch extra data
      // (Next.js serverless functions might lose the connection between calls)
      await connectDb();
      
      // BUG FIX: Use 'findOne' (single object), not 'find' (array)
      const dbUser = await User.findOne({ email: session.user.email });
      
      if (dbUser) {
        session.user.name = dbUser.username;
        session.user.image = dbUser.profilepic;
        // You can add other fields here too, e.g.:
        // session.user.id = dbUser._id;
      }
      
      return session;
    },
  }
});