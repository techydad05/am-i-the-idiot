const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["robots.txt"]),
	mimeTypes: {".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.BQuuYO3O.js",app:"_app/immutable/entry/app.DZ39QC2j.js",imports:["_app/immutable/entry/start.BQuuYO3O.js","_app/immutable/chunks/BFDRVlHi.js","_app/immutable/chunks/B4-FXA9N.js","_app/immutable/entry/app.DZ39QC2j.js","_app/immutable/chunks/B4-FXA9N.js","_app/immutable/chunks/Dj6f-nJM.js","_app/immutable/chunks/DEDqjojZ.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-TPbdAjDt.js')),
			__memo(() => import('./chunks/1-BGwACHen.js')),
			__memo(() => import('./chunks/2-400NnhCp.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
