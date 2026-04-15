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
		client: {start:"_app/immutable/entry/start.BJTX_0NG.js",app:"_app/immutable/entry/app.D3NH9CQf.js",imports:["_app/immutable/entry/start.BJTX_0NG.js","_app/immutable/chunks/bDcRqlRm.js","_app/immutable/chunks/C6pIHvPP.js","_app/immutable/entry/app.D3NH9CQf.js","_app/immutable/chunks/C6pIHvPP.js","_app/immutable/chunks/CHncfsjL.js","_app/immutable/chunks/D1hYfEew.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-C6NxjQkM.js')),
			__memo(() => import('./chunks/1-BOpvlHh1.js')),
			__memo(() => import('./chunks/2-BgJq5onb.js')),
			__memo(() => import('./chunks/3-B9MdxrLk.js')),
			__memo(() => import('./chunks/4-D2hosGed.js'))
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
			},
			{
				id: "/auth/error",
				pattern: /^\/auth\/error\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/auth/signin",
				pattern: /^\/auth\/signin\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
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
