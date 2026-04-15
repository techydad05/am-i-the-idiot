import { d as db, l as leaderboard } from './db-BOcuMpX8.js';
import { f as fail } from './index-BnmQEihp.js';
import './chunk-BBx_TEkp.js';
import 'better-sqlite3';
import './index-DBqjc0Yf.js';

//#region src/routes/+page.server.ts
var SHAME_COOKIE = "idiots_tracker";
var PASS_THRESHOLD = 4;
function parseTracker(cookie) {
	if (!cookie) return {
		failed: false,
		passed: false
	};
	try {
		const parsed = JSON.parse(decodeURIComponent(cookie));
		return {
			failed: !!parsed.failed,
			passed: !!parsed.passed
		};
	} catch {
		return {
			failed: false,
			passed: false
		};
	}
}
var load = async ({ cookies }) => {
	return {
		highScores: await db.query.leaderboard.findMany({
			orderBy: (leaderboard, { desc }) => [desc(leaderboard.score)],
			limit: 10
		}),
		shameState: parseTracker(cookies.get(SHAME_COOKIE)),
		step: "landing"
	};
};
var actions = { saveScore: async ({ request, cookies }) => {
	const data = await request.formData();
	const name = data.get("name");
	const score = parseInt(data.get("score"));
	if (!name || isNaN(score)) return fail(400, { message: "Invalid name or score" });
	await db.insert(leaderboard).values({
		name,
		score
	});
	const tracker = parseTracker(cookies.get(SHAME_COOKIE));
	const passed = score >= PASS_THRESHOLD;
	const newTracker = {
		failed: tracker.passed ? false : passed ? false : true,
		passed: tracker.passed || passed
	};
	cookies.set(SHAME_COOKIE, encodeURIComponent(JSON.stringify(newTracker)), {
		path: "/",
		maxAge: 3600 * 24 * 365,
		httpOnly: false,
		sameSite: "lax"
	});
	return { success: true };
} };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

const index = 2;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CI8ZQdCQ.js')).default;
const server_id = "src/routes/+page.server.ts";
const imports = ["_app/immutable/nodes/2.CekgyKQU.js","_app/immutable/chunks/B4-FXA9N.js","_app/immutable/chunks/DAO_iva5.js","_app/immutable/chunks/DEDqjojZ.js"];
const stylesheets = ["_app/immutable/assets/2.CNA9hox5.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=2-DJo08bWt.js.map
