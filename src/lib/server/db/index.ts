import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';
import { env } from '$env/dynamic/private';
import { mkdirSync } from 'fs';

const url = env.DATABASE_URL ?? ':memory:';
if (url !== ':memory:') {
  const dir = url.substring(0, url.lastIndexOf('/'));
  if (dir) mkdirSync(dir, { recursive: true });
}
const client = new Database(url);
export const db = drizzle(client, { schema });
