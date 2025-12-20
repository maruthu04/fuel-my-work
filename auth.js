import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials"; 
import User from '@/models/User';
import connectDb from '@/db/connectDb';
import bcrypt from 'bcryptjs'; 

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Connect to DB
        await connectDb();

        // Find the user
        const user = await User.findOne({ email: credentials.email });

        // Logic checks:
        // 1. Does user exist?
        // 2. Does user have a password? (If they signed up via Google, they might not have one)
        if (!user || !user.password) {
          // Returning null triggers the "Invalid email or password" error
          return null;
        }

        // Compare the password provided with the hashed password in DB
        const isMatch = await bcrypt.compare(credentials.password, user.password);

        if (isMatch) {
          // Login Success: Return the user object
          return user; 
        } else {
          // Password incorrect
          return null;
        }
      }
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "github" || account.provider === "google") {
        try {
          await connectDb();
          const currentUser = await User.findOne({ email: user.email });

          if (!currentUser) {
            const newUser = new User({
              email: user.email,
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
      // For credentials, we return true (logic was handled in authorize)
      return true; 
    },

    async session({ session, user, token }) {
      await connectDb();
      const dbUser = await User.findOne({ email: session.user.email });
      
      if (dbUser) {
        session.user.name = dbUser.username;
        session.user.image = dbUser.profilepic;
        // Useful to pass the ID for updates later
        session.user.id = dbUser._id; 
      }
      return session;
    },
  }
});