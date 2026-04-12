export type Question = {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  fact: string;
};

export const civicsQuiz: Question[] = [
  {
    id: 1,
    text: "What was the original Greek meaning of the word 'idiot'?",
    options: ["Someone who cannot read", "A private citizen who avoids civic participation", "A foolish person", "A professional philosopher"],
    correctAnswer: 1,
    fact: "In ancient Greece, an 'idios' was a private person who lived apart from the polis, ignoring their duty to participate in governance."
  },
  {
    id: 2,
    text: "How many amendments does the US Constitution have?",
    options: ["10", "25", "27", "33"],
    correctAnswer: 2,
    fact: "There are 27 amendments. If you didn't know this, you're practically an 'idios' in the original sense."
  },
  {
    id: 3,
    text: "Who is the head of the executive branch of the US government?",
    options: ["The Chief Justice", "The Speaker of the House", "The President", "The Secretary of State"],
    correctAnswer: 2,
    fact: "The President is the head of the executive branch. This is basic 4th grade material."
  },
  {
    id: 4,
    text: "What is the primary purpose of the Legislative branch?",
    options: ["To enforce laws", "To interpret laws", "To make laws", "To veto laws"],
    correctAnswer: 2,
    fact: "The Legislative branch (Congress) makes the laws. Your ignorance of this is a gift to lobbyists."
  },
  {
    id: 5,
    text: "What is the term length for a US Senator?",
    options: ["2 years", "4 years", "6 years", "Life"],
    correctAnswer: 2,
    fact: "Senators serve 6-year terms. The fact that you're guessing this is an indictment of our education system."
  }
];

export const shameMessages = {
  fail: [
    "You're below average - and that's saying something. America's education system might be struggling, but you're not helping. Do better.",
    "Wrong. Your civic ignorance is exactly why democracy is struggling. Imagine being this uninformed in the age of the internet.",
    "Incorrect. You are the living embodiment of the original Greek 'idiot' - someone who completely ignores the workings of their society.",
    "Wrong again. Are you actually trying, or is this just a natural state of being for you?",
    "Incorrect. Your lack of basic knowledge is a luxury that the rest of us have to pay for with our freedom."
  ],
  warning: [
    "Barely passing. You're not a complete idiot, but you're certainly in the danger zone.",
    "Mediocre. You know just enough to be dangerous, but not enough to be useful.",
    "You're hovering around the average. Unfortunately, the average is embarrassingly low."
  ],
  success: [
    "Surprisingly, you're not an idiot. You've earned the right to look down on others (within reason).",
    "Impressive. You actually pay attention to how your world works. A rare specimen indeed.",
    "You've passed. You're officially not an 'idios'. Now go motivate some of the idiots around you."
  ]
};

export function getFeedback(percentage: number) {
  if (percentage < 0.6) {
    return {
      message: shameMessages.fail[Math.floor(Math.random() * shameMessages.fail.length)],
      class: 'text-red-600 font-bold'
    };
  } else if (percentage < 0.8) {
    return {
      message: shameMessages.warning[Math.floor(Math.random() * shameMessages.warning.length)],
      class: 'text-yellow-600 font-bold'
    };
  } else {
    return {
      message: shameMessages.success[Math.floor(Math.random() * shameMessages.success.length)],
      class: 'text-green-600 font-bold'
    };
  }
}
