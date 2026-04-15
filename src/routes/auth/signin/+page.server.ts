import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { signIn } from "$lib/server/auth";

export const load: PageServerLoad = async ({ url }) => {
  return {
    error: url.searchParams.get("error"),
  };
};

export const actions: Actions = {
  google: async ({ request }) => {
    await signIn("google", { redirectTo: "/" });
  },
  github: async ({ request }) => {
    await signIn("github", { redirectTo: "/" });
  },
  discord: async ({ request }) => {
    await signIn("discord", { redirectTo: "/" });
  },
};
