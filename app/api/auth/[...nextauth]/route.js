import connectDB from "@/app/lib/connectDb";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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

        // Find user by email
        const user = await userCollection.findOne({ email });
        console.log(user);

        if (!user) {
          console.log("User not found");
          return null;
        }

        // Compare passwords (convert stored password to string for comparison)
        if (password === user.password.toString()) {
          const { password, ...safeUser } = user; // remove password before returning
          return safeUser;
        } else {
          console.log("Incorrect password");
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id?.toString(); // MongoDB _id is an ObjectId
        token.type = user.type;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.type = token.type;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
