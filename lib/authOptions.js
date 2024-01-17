import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "FPL ID",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        fplid: { label: "FPL ID", type: "number" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const response = await fetch(
          `https://fantasy.premierleague.com/api/entry/${credentials.fplid}/`
        );
        const user = await response.json();
        // const user = { id: "1", name: "dofften", email: "frank@crepant.com", FPLID: credentials.fplid, ransom:"this is a ransom string" }
        if (user.detail === "Not found.") {
          return null;
        }
        if (credentials.fplid) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.user.id = token.id;
      session.user.FPLID = token.id;
      session.user.summary_overall_points = token.summary_overall_points;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
        token.FPLID = user.FPLID;
        token.summary_overall_points = user.summary_overall_points;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

export default authOptions;