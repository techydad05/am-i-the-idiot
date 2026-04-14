import { a as attr, b as attr_class, s as stringify, e as escape_html, c as ensure_array_like, d as attr_style, f as derived } from './dev-Dft4k-xF.js';
import './client-8iibQLWP.js';
import './internal-JeLvSoib.js';
import './chunk-BBx_TEkp.js';
import './index-DBqjc0Yf.js';

//#endregion
//#region src/lib/alerts.svelte.ts
var AlertManager = class {
	message = "";
	type = "info";
	visible = false;
	trigger(message, type = "info") {
		this.message = message;
		this.type = type;
		this.visible = true;
		setTimeout(() => {
			this.visible = false;
		}, 5e3);
	}
};
var alerts = new AlertManager();
//#endregion
//#region src/lib/components/Alerts.svelte
function Alerts($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<div class="fixed top-6 right-6 z-50 pointer-events-none svelte-7sb5m5">`);
		if (alerts.visible) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div${attr_class(`pointer-events-auto p-6 rounded-none border-l-8 shadow-2xl max-w-sm animate-bounce-subtle ${stringify(alerts.type === "shame" ? "bg-red-600 border-black text-white" : alerts.type === "error" ? "bg-red-900 border-red-600 text-red-100" : alerts.type === "success" ? "bg-green-600 border-green-900 text-white" : "bg-slate-800 border-slate-600 text-slate-100")}`, "svelte-7sb5m5")}><div class="flex items-start gap-4 svelte-7sb5m5"><div class="font-black uppercase text-xs tracking-widest opacity-50 svelte-7sb5m5">${escape_html(alerts.type)}</div> <div class="font-bold text-lg leading-tight svelte-7sb5m5">${escape_html(alerts.message)}</div></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
	});
}
//#endregion
//#region src/lib/components/BackgroundCanvas.svelte
function BackgroundCanvas($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let particles = [];
		$$renderer.push(`<div class="absolute inset-0 pointer-events-none -z-10 overflow-hidden"><!--[-->`);
		const each_array = ensure_array_like(particles);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let p = each_array[$$index];
			$$renderer.push(`<span class="absolute whitespace-nowrap transition-transform duration-75 ease-out"${attr_style(` left: ${stringify(p.x)}px; top: ${stringify(p.y)}px; font-size: ${stringify(p.size)}px; color: #FFFFFF; opacity: ${stringify(p.opacity)}; font-family: sans-serif; font-weight: ${stringify(p.size > 30 ? "bold" : "normal")}; transform: translate(-50%, -50%); `)}>${escape_html(p.text)}</span>`);
		}
		$$renderer.push(`<!--]--></div>`);
	});
}
//#endregion
//#region src/routes/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		let isShameMode = derived(() => data.shameState?.failed && !data.shameState?.passed);
		let userName = "";
		Alerts($$renderer);
		$$renderer.push(`<!----> <div class="fixed inset-0 bg-slate-900 -z-30 svelte-1uha8ag"></div> `);
		BackgroundCanvas($$renderer);
		$$renderer.push(`<!----> <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] -z-10 svelte-1uha8ag"></div> <div class="h-dvh overflow-y-auto flex justify-center items-start pt-12 pb-12 text-slate-100 font-sans selection:bg-red-500 selection:text-white p-3 md:p-8 relative z-10 svelte-1uha8ag"><div class="max-w-2xl mx-auto w-full svelte-1uha8ag">`);
		{
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="space-y-6 text-center svelte-1uha8ag"><h1 class="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white uppercase italic svelte-1uha8ag">`);
			if (isShameMode()) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`I am <span class="text-red-600 svelte-1uha8ag">the idiot.</span>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`Am I <span class="text-red-600 svelte-1uha8ag">The Idiot?</span>`);
			}
			$$renderer.push(`<!--]--></h1> <div class="relative group svelte-1uha8ag"><div class="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 svelte-1uha8ag"></div> <div class="relative space-y-3 text-base text-slate-400 text-left bg-slate-800/80 backdrop-blur p-6 rounded-2xl border border-slate-700/80 shadow-xl group-hover:border-red-600/50 transition-colors duration-500 svelte-1uha8ag"><p class="font-bold text-white text-xl group-hover:text-red-100 transition-colors duration-300 svelte-1uha8ag">The Shocking Truth About "Idiots"</p> <p class="svelte-1uha8ag">In ancient Greece, an <span class="text-white font-mono svelte-1uha8ag">"idios"</span> wasn't someone who was stupid. 
              It was a <span class="text-white font-bold svelte-1uha8ag">private citizen</span>—someone who chose to avoid the civic duties 
              of their community.</p> <p class="svelte-1uha8ag">To the Greeks, the real "idiot" was the person who thought they were above the responsibilities 
              of citizenship. They didn't hate the ignorant; they hated the <span class="text-red-400 font-bold svelte-1uha8ag">disengaged</span>.</p> <p class="text-slate-300 italic text-sm svelte-1uha8ag">Modern society has forgotten this. We use the word as a generic insult, while we collectively 
              become exactly what the Greeks feared: a population of disengaged "idiots".</p></div></div> <div class="flex flex-col sm:flex-row items-center justify-center gap-3 svelte-1uha8ag"><input type="text"${attr("value", userName)} placeholder="Enter your real name..." class="w-full max-w-xs p-3 md:p-4 bg-slate-800/80 border-2 border-slate-700/80 rounded-xl text-white text-center focus:border-red-500 outline-none transition-all duration-300 hover:border-slate-600 focus:shadow-lg focus:shadow-red-900/20 svelte-1uha8ag"/> <button class="px-4 py-3 md:px-6 md:py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-black text-base md:text-lg uppercase tracking-widest rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-red-900/30 whitespace-nowrap hover:shadow-red-900/50 svelte-1uha8ag">Test My Intelligence</button></div></div>`);
		}
		$$renderer.push(`<!--]--></div></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-By_WyjUv.js.map
