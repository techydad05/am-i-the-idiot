import type { ServerLoad } from '@sveltejs/kit';
import { runMigrations } from '$lib/db/migrate';

export const load: ServerLoad = async () => {
  // Run migrations on every request to ensure schema is up-to-date
  // In production, you might want to run this once at startup instead
  await runMigrations();
  
  return {};
};
