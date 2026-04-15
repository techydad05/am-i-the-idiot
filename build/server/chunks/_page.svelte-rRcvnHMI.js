import { a as attr, b as ensure_array_like, e as escape_html, c as attr_class, s as stringify, d as attr_style, f as derived } from './dev-BLwf7WOh.js';
import './client-QceCwxJp.js';
import './internal-CxEw2FgP.js';
import './chunk-BBx_TEkp.js';
import './index-DBqjc0Yf.js';

//#region src/lib/quiz.ts
var CONFIDENCE_CONFIG = {
	humble: {
		label: "Humble",
		questionCount: 5,
		difficulty: "easy",
		timeLimit: 30,
		description: "I just want to learn. Be gentle."
	},
	confident: {
		label: "Confident",
		questionCount: 10,
		difficulty: "medium",
		timeLimit: 20,
		description: "I know my stuff. Bring it on."
	},
	arrogant: {
		label: "Arrogant",
		questionCount: 15,
		difficulty: "hard",
		timeLimit: 10,
		description: "I am a civic god. Challenge me."
	}
};
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
		let step = data.step;
		let activeQuiz = [];
		let currentQuestionIndex = 0;
		let score = 0;
		let selectedOption = null;
		let isWrong = false;
		let userName = "";
		let finalFeedback = null;
		let highScores = derived(() => data.highScores);
		let timeLeft = 0;
		Alerts($$renderer);
		$$renderer.push(`<!----> <div class="fixed inset-0 bg-slate-900 -z-30 svelte-1uha8ag"></div> `);
		BackgroundCanvas($$renderer);
		$$renderer.push(`<!----> <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] -z-10 svelte-1uha8ag"></div> <div class="h-dvh overflow-hidden flex justify-center items-center text-slate-100 font-sans selection:bg-red-500 selection:text-white p-3 md:p-8 relative z-10 svelte-1uha8ag"><div class="max-w-2xl mx-auto w-full h-full overflow-y-auto flex flex-col py-6 md:py-8 svelte-1uha8ag">`);
		if (step === "landing") {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="space-y-4 md:space-y-6 text-center flex-1 flex flex-col justify-center svelte-1uha8ag"><h1 class="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter text-white uppercase italic svelte-1uha8ag">`);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`Am I <span class="text-red-600 svelte-1uha8ag">The Idiot?</span>`);
			$$renderer.push(`<!--]--></h1> <div class="relative group svelte-1uha8ag"><div class="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 svelte-1uha8ag"></div> <div class="relative space-y-3 text-base text-slate-400 text-left bg-slate-800/80 backdrop-blur p-6 rounded-2xl border border-slate-700/80 shadow-xl group-hover:border-red-600/50 transition-colors duration-500 svelte-1uha8ag"><p class="font-bold text-white text-xl group-hover:text-red-100 transition-colors duration-300 svelte-1uha8ag">The Shocking Truth About "Idiots"</p> <p class="svelte-1uha8ag">In ancient Greece, an <span class="text-white font-mono svelte-1uha8ag">"idios"</span> wasn't someone who was stupid. 
              It was a <span class="text-white font-bold svelte-1uha8ag">private citizen</span>—someone who chose to avoid the civic duties 
              of their community.</p> <p class="svelte-1uha8ag">To the Greeks, the real "idiot" was the person who thought they were above the responsibilities 
              of citizenship. They didn't hate the ignorant; they hated the <span class="text-red-400 font-bold svelte-1uha8ag">disengaged</span>.</p> <p class="text-slate-300 italic text-sm svelte-1uha8ag">Modern society has forgotten this. We use the word as a generic insult, while we collectively 
              become exactly what the Greeks feared: a population of disengaged "idiots".</p></div></div> <div class="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 text-left svelte-1uha8ag"><div class="group relative p-4 md:p-6 bg-gradient-to-br from-red-900/30 to-red-950/50 border border-red-800/50 rounded-2xl cursor-pointer transition-all duration-500 hover:scale-105 hover:border-red-500/80 hover:shadow-2xl hover:shadow-red-900/40 hover:from-red-800/40 hover:to-red-950/60 svelte-1uha8ag"><div class="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/5 to-red-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl svelte-1uha8ag"></div> <div class="relative svelte-1uha8ag"><div class="flex items-center gap-2 md:gap-3 mb-2 md:mb-3 svelte-1uha8ag"><div class="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-red-600/20 flex items-center justify-center group-hover:bg-red-500/30 group-hover:scale-110 transition-all duration-300 svelte-1uha8ag"><svg class="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors svelte-1uha8ag" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" class="svelte-1uha8ag"></path></svg></div> <p class="text-red-400 font-bold text-base md:text-xl group-hover:text-red-300 transition-colors duration-300 svelte-1uha8ag">Financial Cost</p></div> <p class="text-sm md:text-base text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300 svelte-1uha8ag">Not knowing how government works = paying more taxes through inefficiency.</p></div></div> <div class="group relative p-4 md:p-6 bg-gradient-to-br from-red-900/30 to-red-950/50 border border-red-800/50 rounded-2xl cursor-pointer transition-all duration-500 hover:scale-105 hover:border-red-500/80 hover:shadow-2xl hover:shadow-red-900/40 hover:from-red-800/40 hover:to-red-950/60 svelte-1uha8ag"><div class="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/5 to-red-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl svelte-1uha8ag"></div> <div class="relative svelte-1uha8ag"><div class="flex items-center gap-2 md:gap-3 mb-2 md:mb-3 svelte-1uha8ag"><div class="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-red-600/20 flex items-center justify-center group-hover:bg-red-500/30 group-hover:scale-110 transition-all duration-300 svelte-1uha8ag"><svg class="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors svelte-1uha8ag" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" class="svelte-1uha8ag"></path></svg></div> <p class="text-red-400 font-bold text-base md:text-xl group-hover:text-red-300 transition-colors duration-300 svelte-1uha8ag">Corporate Rule</p></div> <p class="text-sm md:text-base text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300 svelte-1uha8ag">Not voting = letting corporations decide your healthcare and environment.</p></div></div> <div class="group relative p-4 md:p-6 bg-gradient-to-br from-red-900/30 to-red-950/50 border border-red-800/50 rounded-2xl cursor-pointer transition-all duration-500 hover:scale-105 hover:border-red-500/80 hover:shadow-2xl hover:shadow-red-900/40 hover:from-red-800/40 hover:to-red-950/60 svelte-1uha8ag"><div class="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/5 to-red-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl svelte-1uha8ag"></div> <div class="relative svelte-1uha8ag"><div class="flex items-center gap-2 md:gap-3 mb-2 md:mb-3 svelte-1uha8ag"><div class="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-red-600/20 flex items-center justify-center group-hover:bg-red-500/30 group-hover:scale-110 transition-all duration-300 svelte-1uha8ag"><svg class="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors svelte-1uha8ag" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" class="svelte-1uha8ag"></path></svg></div> <p class="text-red-400 font-bold text-base md:text-xl group-hover:text-red-300 transition-colors duration-300 svelte-1uha8ag">Intellectual Decay</p></div> <p class="text-sm md:text-base text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300 svelte-1uha8ag">Believing fake news = allowing your children to grow up uninformed.</p></div></div></div> <div class="flex flex-col sm:flex-row items-center justify-center gap-3 svelte-1uha8ag"><input type="text"${attr("value", userName)} placeholder="Enter your real name..." class="w-full max-w-xs p-3 md:p-4 bg-slate-800/80 border-2 border-slate-700/80 rounded-xl text-white text-center focus:border-red-500 outline-none transition-all duration-300 hover:border-slate-600 focus:shadow-lg focus:shadow-red-900/20 svelte-1uha8ag"/> <button class="px-4 py-3 md:px-6 md:py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-black text-base md:text-lg uppercase tracking-widest rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-red-900/30 whitespace-nowrap hover:shadow-red-900/50 svelte-1uha8ag">Test My Intelligence</button></div></div>`);
		} else if (step === "confidence") {
			$$renderer.push("<!--[1-->");
			$$renderer.push(`<div class="space-y-4 md:space-y-6 text-center flex-1 flex flex-col justify-center svelte-1uha8ag"><h2 class="text-2xl md:text-4xl font-black uppercase italic text-white svelte-1uha8ag">How confident are you? <span class="text-red-600 svelte-1uha8ag">Honestly.</span></h2> <div class="grid grid-cols-1 gap-3 svelte-1uha8ag"><!--[-->`);
			const each_array = ensure_array_like(Object.entries(CONFIDENCE_CONFIG));
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let [key, config] = each_array[$$index];
				$$renderer.push(`<button class="group relative p-4 md:p-5 bg-slate-800 border-2 border-slate-700 rounded-xl text-left transition-all duration-300 hover:border-red-600 hover:scale-[1.02] active:scale-95 shadow-lg svelte-1uha8ag"><div class="absolute inset-0 bg-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl svelte-1uha8ag"></div> <div class="relative flex flex-col sm:flex-row sm:items-center justify-between gap-2 svelte-1uha8ag"><div class="svelte-1uha8ag"><span class="text-xl md:text-2xl font-black uppercase italic text-white svelte-1uha8ag">${escape_html(config.label)}</span> <p class="text-slate-400 text-xs md:text-sm svelte-1uha8ag">${escape_html(config.description)}</p></div> <div class="text-red-500 font-mono font-bold text-sm md:text-base shrink-0 svelte-1uha8ag">${escape_html(config.questionCount)} Qs · ${escape_html(config.timeLimit)}s/q</div></div></button>`);
			}
			$$renderer.push(`<!--]--></div> <button class="text-slate-500 hover:text-slate-300 transition-colors underline text-xs md:text-sm uppercase tracking-widest svelte-1uha8ag">Back to start</button></div>`);
		} else if (step === "quiz") {
			$$renderer.push("<!--[2-->");
			$$renderer.push(`<div class="space-y-4 md:space-y-6 flex-1 flex flex-col min-h-0 svelte-1uha8ag"><div class="flex justify-between items-center shrink-0 svelte-1uha8ag"><div class="flex flex-col svelte-1uha8ag"><span class="text-slate-500 font-mono text-xs uppercase svelte-1uha8ag">Question</span> <span class="text-slate-100 font-mono text-base svelte-1uha8ag">${escape_html(currentQuestionIndex + 1)}/${escape_html(activeQuiz.length)}</span></div> <div class="flex flex-col items-center svelte-1uha8ag"><span class="text-slate-500 font-mono text-xs uppercase svelte-1uha8ag">Time</span> <span${attr_class(`text-slate-100 font-mono text-base ${stringify("text-red-500 animate-pulse" )}`, "svelte-1uha8ag")}>${escape_html(timeLeft)}s</span></div> <div class="flex flex-col items-end svelte-1uha8ag"><span class="text-slate-500 font-mono text-xs uppercase svelte-1uha8ag">Score</span> <span class="text-slate-100 font-mono text-base svelte-1uha8ag">${escape_html(score)}</span></div></div> <div${attr_class("bg-slate-800 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-slate-700 shadow-2xl relative overflow-y-auto transition-all duration-300 flex-1 min-h-0 svelte-1uha8ag", void 0, { "shake": isWrong })} style="max-height: calc(100dvh - 160px);"><h2 class="text-lg md:text-2xl font-bold mb-4 leading-snug shrink-0 svelte-1uha8ag">${escape_html(activeQuiz[currentQuestionIndex].text)}</h2> <div class="grid gap-2 md:gap-3 svelte-1uha8ag"><!--[-->`);
			const each_array_1 = ensure_array_like(activeQuiz[currentQuestionIndex].options);
			for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
				let option = each_array_1[i];
				$$renderer.push(`<button${attr("disabled", selectedOption !== null, true)}${attr_class(`p-3 md:p-4 text-left rounded-xl border-2 transition-all font-medium text-sm md:text-base ${stringify("")} ${stringify("")} ${stringify("border-slate-700 hover:border-slate-500 hover:bg-slate-700" )} ${stringify("")}`, "svelte-1uha8ag")}>${escape_html(option)}</button>`);
			}
			$$renderer.push(`<!--]--></div> `);
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div></div>`);
		} else if (step === "result") {
			$$renderer.push("<!--[3-->");
			$$renderer.push(`<div class="space-y-12 text-center svelte-1uha8ag"><div class="space-y-4 svelte-1uha8ag"><h1 class="text-5xl font-black uppercase italic svelte-1uha8ag">The Verdict</h1> <div${attr_class(`text-8xl font-black ${stringify(finalFeedback?.class)}`, "svelte-1uha8ag")}>${escape_html(Math.round(score / activeQuiz.length * 100))}%</div> <p${attr_class(`text-2xl font-medium max-w-lg mx-auto ${stringify(finalFeedback?.class)}`, "svelte-1uha8ag")}>${escape_html(finalFeedback?.message)}</p></div> <div class="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-xl svelte-1uha8ag"><h3 class="text-2xl font-bold mb-6 uppercase tracking-tighter svelte-1uha8ag">Wall of Shame &amp; Glory</h3> <div class="space-y-3 svelte-1uha8ag"><!--[-->`);
			const each_array_2 = ensure_array_like(highScores());
			for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
				let entry = each_array_2[$$index_2];
				$$renderer.push(`<div class="flex justify-between items-center p-3 bg-slate-900 rounded-lg border border-slate-700 svelte-1uha8ag"><span class="font-medium svelte-1uha8ag">${escape_html(entry.name)}</span> <span${attr_class(`font-mono font-bold ${stringify(entry.score < 3 ? "text-red-500" : "text-green-500")}`, "svelte-1uha8ag")}>${escape_html(entry.score)}</span></div>`);
			}
			$$renderer.push(`<!--]--></div></div> <button class="px-8 py-4 bg-slate-100 text-slate-900 font-black text-xl uppercase tracking-widest rounded-xl transition-all hover:bg-white svelte-1uha8ag">Try to be less of an idiot</button></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-rRcvnHMI.js.map
