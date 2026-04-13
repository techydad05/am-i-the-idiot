import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { db } from '../db';

export async function runMigrations() {
  console.log('Applying database migrations...');
  try {
    await migrate(db, { migrationsFolder: 'drizzle' });
    console.log('Migrations applied successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  }
}
