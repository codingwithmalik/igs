import CredentialsProvider from "next-auth/providers/credentials";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
import ConnectDb from "@/lib/db";

export default {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },

      authorize: async (credentials) => {
        await ConnectDb();

        const admin = await Admin.findOne({ email: credentials.email });

        // Prevent crash
        if (!admin) return null;

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          admin.password
        );

        if (!isPasswordValid) return null;

        return {
          id: admin._id.toString(),
          email: admin.email,
        };
      },
    }),
  ],

  pages: {
    signIn: "/admin/login",
  },

  session: {
    strategy: "jwt",
  },
};
