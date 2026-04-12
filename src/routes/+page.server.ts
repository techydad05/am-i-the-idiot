import { fail } from '@sveltejs/kit';
import { db } from '$lib/db';
import { leaderboard } from '$lib/schema';

export const load = async () => {
  const highScores = await db.query.leaderboard.findMany({
    orderBy: (leaderboard, { desc }) => [desc(leaderboard.score)],
    limit: 10,
  });

  return {
    highScores
  };
};

export const actions = {
  saveScore: async ({ request }) => {
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

    return { success: true };
  }
};
