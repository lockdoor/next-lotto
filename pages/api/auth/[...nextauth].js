import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import validateUser from "../../../lib/validateUser";
import connectDB from "../../../database/connectDB";
import User from "../../../model/user";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        const { username, password } = credentials;
        if (validateUser({ username, password })) {
          await connectDB();
          const user = await User.findOne({ username: username });
          if (user) {
            console.log(user)
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
              const doc = user._doc
              delete doc.password
              return doc;
            } else {
              throw new Error("password wrong");
            }
          } else {
            throw new Error("user not found");
          }
        } else {
          throw new Error("require username and password");
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async session(session){
      // console.log('by session in nextauth', session)
      return session
    },
    async jwt({token, user}){
      if(user && user._id && user.role){
        token = {...token, ...user}
      }
      return token
    }
  }
};

export default NextAuth(authOptions);
