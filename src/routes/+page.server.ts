import { fail } from '@sveltejs/kit';
import { db } from '$lib/db';
import { leaderboard } from '$lib/schema';
import type { Cookies } from '@sveltejs/kit';
import type { Actions } from './$types';

const SHAME_COOKIE = 'idiots_tracker';
const PASS_THRESHOLD = 4; // Minimum score to pass (out of civicsQuiz.length)

function parseTracker(cookie: string | undefined): { failed: boolean; passed: boolean } {
  if (!cookie) return { failed: false, passed: false };
  try {
    const parsed = JSON.parse(cookie);
    return { failed: !!parsed.failed, passed: !!parsed.passed };
  } catch {
    return { failed: false, passed: false };
  }
}

export const load = async ({ cookies }: { cookies: Cookies }) => {
  // Migration: clear any old double-encoded cookie
  const oldCookie = cookies.get(SHAME_COOKIE);
  if (oldCookie && oldCookie.startsWith('%25')) {
    cookies.delete(SHAME_COOKIE, { path: '/' });
  }

  const highScores = await db.query.leaderboard.findMany({
    orderBy: (leaderboard, { desc }) => [desc(leaderboard.score)],
    limit: 10,
  });

  const tracker = parseTracker(cookies.get(SHAME_COOKIE));

  return {
    highScores,
    shameState: tracker,
    step: 'landing'
  };
};

export const actions: Actions = {
  saveScore: async ({ request, cookies }: { request: Request; cookies: Cookies }) => {
    const data = await request.formData();
    const name = data.get('name') as string;
    const score = parseInt(data.get('score') as string);

    if (!name || isNaN(score)) {
      return fail(400, { message: 'Invalid name or score' });
    }

    await db.insert(leaderboard).values({
      name,
      score,
    });

    // Update shame tracker cookie — only set once here, never in load()
    // Use httpOnly: false so client can read for the shame header swap
    const tracker = parseTracker(cookies.get(SHAME_COOKIE));
    const passed = score >= PASS_THRESHOLD;

    const newTracker = {
      failed: tracker.passed ? false : (passed ? false : true),
      passed: tracker.passed || passed
    };

    cookies.set(SHAME_COOKIE, JSON.stringify(newTracker), {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      httpOnly: false,
      sameSite: 'lax'
    });

    return { success: true };
  }
};
