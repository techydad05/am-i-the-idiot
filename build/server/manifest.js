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
		client: {start:"_app/immutable/entry/start.BkeFqrGX.js",app:"_app/immutable/entry/app.Dh7YHMYS.js",imports:["_app/immutable/entry/start.BkeFqrGX.js","_app/immutable/chunks/Dkex9HoX.js","_app/immutable/chunks/B4-FXA9N.js","_app/immutable/entry/app.Dh7YHMYS.js","_app/immutable/chunks/B4-FXA9N.js","_app/immutable/chunks/Dj6f-nJM.js","_app/immutable/chunks/DEDqjojZ.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-D3kYCijd.js')),
			__memo(() => import('./chunks/1-SqT4zIZP.js')),
			__memo(() => import('./chunks/2-ya5LpD-8.js'))
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
