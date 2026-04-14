import { d as db } from './db-BOcuMpX8.js';
import crypto from 'node:crypto';
import fs from 'node:fs';
import './chunk-BBx_TEkp.js';
import 'better-sqlite3';

function readMigrationFiles(config) {
  const migrationFolderTo = config.migrationsFolder;
  const migrationQueries = [];
  const journalPath = `${migrationFolderTo}/meta/_journal.json`;
  if (!fs.existsSync(journalPath)) {
    throw new Error(`Can't find meta/_journal.json file`);
  }
  const journalAsString = fs.readFileSync(`${migrationFolderTo}/meta/_journal.json`).toString();
  const journal = JSON.parse(journalAsString);
  for (const journalEntry of journal.entries) {
    const migrationPath = `${migrationFolderTo}/${journalEntry.tag}.sql`;
    try {
      const query = fs.readFileSync(`${migrationFolderTo}/${journalEntry.tag}.sql`).toString();
      const result = query.split("--> statement-breakpoint").map((it) => {
        return it;
      });
      migrationQueries.push({
        sql: result,
        bps: journalEntry.breakpoints,
        folderMillis: journalEntry.when,
        hash: crypto.createHash("sha256").update(query).digest("hex")
      });
    } catch {
      throw new Error(`No file ${migrationPath} found in ${migrationFolderTo} folder`);
    }
  }
  return migrationQueries;
}

function migrate(db, config) {
  const migrations = readMigrationFiles(config);
  db.dialect.migrate(migrations, db.session, config);
}

//#region src/lib/db/migrate.ts
async function runMigrations() {
	console.log("Applying database migrations...");
	try {
		await migrate(db, { migrationsFolder: "drizzle" });
		console.log("Migrations applied successfully!");
	} catch (error) {
		console.error("Migration failed:", error);
		throw error;
	}
}
//#endregion
//#region src/routes/+layout.server.ts
var load = async () => {
	await runMigrations();
	return {};
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 0;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-BTSaLiqw.js')).default;
const server_id = "src/routes/+layout.server.ts";
const imports = ["_app/immutable/nodes/0.BsA6LDp-.js","_app/immutable/chunks/B4-FXA9N.js","_app/immutable/chunks/DEDqjojZ.js"];
const stylesheets = ["_app/immutable/assets/0.FAvavzD_.css"];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=0-D2tWod8r.js.map
