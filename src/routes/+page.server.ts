import { fail } from '@sveltejs/kit';
import { db } from '$lib/db';
import { leaderboard } from '$lib/schema';
import type { Cookies } from '@sveltejs/kit';

const SHAME_COOKIE = 'idiots_tracker';
const PASS_THRESHOLD = 4; // Minimum score to pass (out of civicsQuiz.length)

function parseTracker(cookie: string | undefined): { failed: boolean; passed: boolean } {
  if (!cookie) return { failed: false, passed: false };
  try {
    const parsed = JSON.parse(decodeURIComponent(cookie));
    return { failed: !!parsed.failed, passed: !!parsed.passed };
  } catch {
    return { failed: false, passed: false };
  }
}

export const load = async ({ cookies }: { cookies: Cookies }) => {
  const highScores = await db.query.leaderboard.findMany({
    orderBy: (leaderboard, { desc }) => [desc(leaderboard.score)],
    limit: 10,
  });

  const tracker = parseTracker(cookies.get(SHAME_COOKIE));

  return {
    highScores,
    shameState: tracker // passed=true means they're redeemed; failed=true & !passed means shame mode
  };
};

export const actions = {
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

    // Update shame tracker cookie
    const tracker = parseTracker(cookies.get(SHAME_COOKIE));
    const passed = score >= PASS_THRESHOLD;
    
    // Build new tracker state:
    // - Once passed, always passed (redeemed)
    // - If never passed and now failing, mark as failed (shame mode)
    const newTracker = {
      failed: tracker.passed ? false : (passed ? false : true),
      passed: tracker.passed || passed
    };

    cookies.set(SHAME_COOKIE, encodeURIComponent(JSON.stringify(newTracker)), {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      httpOnly: false, // Allow client-side reading for title logic
      sameSite: 'lax'
    });

    return { success: true };
  }
};
