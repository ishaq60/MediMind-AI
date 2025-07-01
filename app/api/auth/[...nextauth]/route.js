import connectDB from "@/app/lib/connectDb";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
// import bcrypt from "bcryptjs"; // Uncomment if you use hashed passwords

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        const db = await connectDB();
        const userCollection = db.collection("user");

        const user = await userCollection.findOne({ email });

        if (!user) {
          console.log("User not found");
          return null;
        }

        // Password check (plaintext or hashed)
        const isValid = password === user.password?.toString();
        // const isValid = await bcrypt.compare(password, user.password); // Use for hashed passwords

        if (!isValid) {
          console.log("Invalid password");
          return null;
        }

        const { password: pwd, ...safeUser } = user;
        return safeUser;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id?.toString();
        token.type = user.type || "user"; // fallback
      }
      return token;
    },

    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.type = token.type;
      }
      return session;
    },

    async signIn({ user, account }) {
      if (account?.provider === "google" || account.provider === "github") {
        const { email } = user;

        try {
          const db = await connectDB();
          const userCollection = db.collection("user");

          const isExist = await userCollection.findOne({ email });

          if (!isExist) {
            const newUser = {
              name: user.name,
              email: user.email,
              image: user.image,
              type: "user", // you can set default type here
            };
            await userCollection.insertOne(newUser);
          }
        } catch (error) {
          console.error("SignIn error:", error);
          return false;
        }
      }

      return true;
    },
  },

  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
