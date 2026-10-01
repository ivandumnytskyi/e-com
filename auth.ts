import { randomUUID } from "node:crypto";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import prisma from "./lib/prisma";
import { cleanupExpiredDemoUsers } from "./lib/demoUsers";
import authConfig from "./auth.config";

const demoSessionMaxAge = 30 * 24 * 60 * 60;

const demoProvider = Credentials({
  id: "demo",
  name: "Demo account",
  credentials: {},
  async authorize() {
    if (process.env.DEMO_LOGIN_ENABLED !== "true") return null;

    const now = new Date();
    await cleanupExpiredDemoUsers();

    const demoUser = await prisma.user.create({
      data: {
        name: "Demo Shopper",
        email: `demo-${randomUUID()}@demo.invalid`,
        isDemo: true,
        demoExpiresAt: new Date(now.getTime() + demoSessionMaxAge * 1000),
      },
    });

    return {
      id: demoUser.id,
      name: demoUser.name,
      email: demoUser.email,
      isDemo: true,
    };
  },
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [...authConfig.providers, demoProvider],
  session: {
    strategy: 'jwt',
    maxAge: demoSessionMaxAge,
  },
  adapter: PrismaAdapter(prisma),
})