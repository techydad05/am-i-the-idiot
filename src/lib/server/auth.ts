import { SvelteKitAuth } from "@auth/sveltekit";
import GitHub from "@auth/sveltekit/providers/github";
import Google from "@auth/sveltekit/providers/google";
import Discord from "@auth/sveltekit/providers/discord";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "$lib/server/db";
import { env } from "$env/dynamic/private";

// Lazy factory — adapter only created when handle() is first called at runtime
let _auth: ReturnType<typeof SvelteKitAuth> | undefined;
const getAuth = () => {
  if (!_auth) {
    _auth = SvelteKitAuth({
      adapter: DrizzleAdapter(db),
      providers: [
        GitHub({
          clientId: env.GITHUB_CLIENT_ID ?? "",
          clientSecret: env.GITHUB_CLIENT_SECRET ?? "",
        }),
        Google({
          clientId: env.GOOGLE_CLIENT_ID ?? "",
          clientSecret: env.GOOGLE_CLIENT_SECRET ?? "",
        }),
        Discord({
          clientId: env.DISCORD_CLIENT_ID ?? "",
          clientSecret: env.DISCORD_CLIENT_SECRET ?? "",
        }),
      ],
      secret: env.AUTH_SECRET ?? "dev-secret-change-in-production",
      trustHost: true,
      pages: {
        signIn: "/auth/signin",
        error: "/auth/error",
      },
      callbacks: {
        session({ session, user }) {
          return {
            ...session,
            user: {
              ...session.user,
              id: user.id,
            },
          };
        },
      },
    });
  }
  return _auth;
};

export const handle = async (event: any) => {
  const auth = await getAuth();
  return auth.handle(event);
};
export const signIn = async (...args: any[]) => {
  const auth = await getAuth();
  return auth.signIn(...args);
};
export const signOut = async (...args: any[]) => {
  const auth = await getAuth();
  return auth.signOut(...args);
};
