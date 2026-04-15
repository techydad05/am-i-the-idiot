import type { LayoutServerLoad } from "./$types";
import { runMigrations } from "$lib/db/migrate";

export const load: LayoutServerLoad = async (event) => {
  // Run migrations on every request to ensure schema is up-to-date
  // In production, you might want to run this once at startup instead
  await runMigrations();

  const session = await event.locals.auth();

  return {
    session,
  };
};
