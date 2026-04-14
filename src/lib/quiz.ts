export type Difficulty = 'easy' | 'medium' | 'hard';

export type Question = {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  fact: string;
  difficulty: Difficulty;
};

export const CONFIDENCE_CONFIG = {
  humble: {
    label: 'Humble',
    questionCount: 5,
    difficulty: 'easy',
    timeLimit: 30,
    description: 'I just want to learn. Be gentle.'
  },
  confident: {
    label: 'Confident',
    questionCount: 10,
    difficulty: 'medium',
    timeLimit: 20,
    description: 'I know my stuff. Bring it on.'
  },
  arrogant: {
    label: 'Arrogant',
    questionCount: 15,
    difficulty: 'hard',
    timeLimit: 10,
    description: 'I am a civic god. Challenge me.'
  }
} as const;

export type ConfidenceLevel = keyof typeof CONFIDENCE_CONFIG;

export const civicsQuiz: Question[] = [
  { id: 1, text: "What was the original Greek meaning of the word 'idiot'?", options: ["Someone who cannot read", "A private citizen who avoids civic participation", "A foolish person", "A professional philosopher"], correctAnswer: 1, fact: "In ancient Greece, an 'idios' was a private person who lived apart from the polis, ignoring their duty to participate in governance.", difficulty: 'easy' },
  { id: 2, text: "Who is the head of the executive branch of the US government?", options: ["The Chief Justice", "The Speaker of the House", "The President", "The Secretary of State"], correctAnswer: 2, fact: "The President is the head of the executive branch. This is basic 4th grade material.", difficulty: 'easy' },
  { id: 3, text: "What is the primary purpose of the Legislative branch?", options: ["To enforce laws", "To interpret laws", "To make laws", "To veto laws"], correctAnswer: 2, fact: "The Legislative branch (Congress) makes the laws. Your ignorance of this is a gift to lobbyists.", difficulty: 'easy' },
  { id: 4, text: "How many senators does each US state have?", options: ["1", "2", "4", "Depends on population"], correctAnswer: 1, fact: "Every state has exactly two senators, regardless of size, ensuring equal representation.", difficulty: 'easy' },
  { id: 5, text: "Which document is the supreme law of the land in the United States?", options: ["The Declaration of Independence", "The Bill of Rights", "The US Constitution", "The Articles of Confederation"], correctAnswer: 2, fact: "The Constitution is the supreme law. Everything else must align with it.", difficulty: 'easy' },
  { id: 6, text: "What is the term length for a US Senator?", options: ["2 years", "4 years", "6 years", "Life"], correctAnswer: 2, fact: "Senators serve 6-year terms. The fact that you're guessing this is an indictment of our education system.", difficulty: 'easy' },
  { id: 7, text: "How many amendments does the US Constitution have?", options: ["10", "25", "27", "33"], correctAnswer: 2, fact: "There are 27 amendments. If you didn't know this, you're practically an 'idios' in the original sense.", difficulty: 'medium' },
  { id: 8, text: "Who has the power to declare war in the United States?", options: ["The President", "The Supreme Court", "Congress", "The Joint Chiefs of Staff"], correctAnswer: 2, fact: "While the President is Commander-in-Chief, only Congress can formally declare war.", difficulty: 'medium' },
  { id: 9, text: "What is the purpose of the Electoral College?", options: ["To elect members of Congress", "To elect the President and Vice President", "To appoint Supreme Court Justices", "To certify state elections"], correctAnswer: 1, fact: "The Electoral College is the formal body that elects the US President.", difficulty: 'medium' },
  { id: 10, text: "Which amendment granted women the right to vote?", options: ["15th", "19th", "21st", "26th"], correctAnswer: 1, fact: "The 19th Amendment was ratified in 1920, finally recognizing women's suffrage.", difficulty: 'medium' },
  { id: 11, text: "What is 'Checks and Balances'?", options: ["A banking system", "The division of power to prevent any one branch from becoming too powerful", "The process of counting votes", "The way the budget is balanced"], correctAnswer: 1, fact: "Checks and balances ensure that no single branch of government can exercise absolute power.", difficulty: 'medium' },
  { id: 12, text: "Who is the 'Commander in Chief' of the military?", options: ["Secretary of Defense", "General of the Army", "The President", "The Speaker of the House"], correctAnswer: 2, fact: "The President holds the title of Commander in Chief to ensure civilian control of the military.", difficulty: 'medium' },
  { id: 13, text: "What does 'due process' mean?", options: ["Following a specific set of legal procedures", "A fast-track trial", "Paying a fine immediately", "The right to a lawyer only if you can afford one"], correctAnswer: 0, fact: "Due process ensures that the government respects all legal rights owed to a person.", difficulty: 'medium' },
  { id: 14, text: "What is the minimum age to be President of the United States?", options: ["25", "30", "35", "40"], correctAnswer: 2, fact: "One must be at least 35 years old to serve as President.", difficulty: 'medium' },
  { id: 15, text: "Which branch of government interprets the laws?", options: ["Legislative", "Executive", "Judicial", "Administrative"], correctAnswer: 2, fact: "The Judicial branch, led by the Supreme Court, interprets the law.", difficulty: 'medium' },
  { id: 16, text: "What is the 'Bill of Rights'?", options: ["The first 10 amendments to the Constitution", "The list of presidential powers", "The original 13 colonies' laws", "The Declaration of Independence"], correctAnswer: 0, fact: "The Bill of Rights protects individual liberties from government infringement.", difficulty: 'medium' },
  { id: 17, text: "The 'Great Compromise' of 1787 settled the dispute between which two groups?", options: ["Federalists and Anti-Federalists", "Large states and small states", "Northern and Southern states", "The colonists and the British"], correctAnswer: 1, fact: "It created a bicameral legislature: the House (by population) and the Senate (equal).", difficulty: 'hard' },
  { id: 18, text: "Which US Supreme Court case established the principle of 'Judicial Review'?", options: ["Plessy v. Ferguson", "Brown v. Board of Education", "Marbury v. Madison", "Roe v. Wade"], correctAnswer: 2, fact: "Marbury v. Madison (1803) gave the Court the power to declare laws unconstitutional.", difficulty: 'hard' },
  { id: 19, text: "What is a 'writ of habeas corpus'?", options: ["A command to pay taxes", "A court order to bring a prisoner before the court to determine if their detention is lawful", "A presidential pardon", "A request for a new trial"], correctAnswer: 1, fact: "It's a fundamental protection against arbitrary imprisonment.", difficulty: 'hard' },
  { id: 20, text: "Which amendment abolished slavery in the United States?", options: ["12th", "13th", "14th", "15th"], correctAnswer: 1, fact: "The 13th Amendment ended slavery, though the struggle for true equality continued.", difficulty: 'hard' },
  { id: 21, text: "The 'Three-Fifths Compromise' dealt with the counting of which population for representation?", options: ["Immigrants", "Enslaved people", "Indigenous peoples", "Women"], correctAnswer: 1, fact: "It was a dark chapter of early American history where enslaved people were counted as 3/5 of a person.", difficulty: 'hard' },
  { id: 22, text: "Who wrote the 'Federalist Papers' primarily?", options: ["Thomas Jefferson and James Madison", "Alexander Hamilton, James Madison, and John Jay", "Benjamin Franklin and John Adams", "George Washington and Thomas Paine"], correctAnswer: 1, fact: "Hamilton, Madison, and Jay wrote them to persuade New York to ratify the Constitution.", difficulty: 'hard' },
  { id: 23, text: "What is the 'quorum' in a legislative body?", options: ["A specific type of vote", "The minimum number of members present to conduct official business", "A meeting of only the leadership", "The total number of votes cast"], correctAnswer: 1, fact: "Without a quorum, a legislative body cannot legally transact business.", difficulty: 'hard' },
  { id: 24, text: "The 22nd Amendment limits the President to how many terms?", options: ["One", "Two", "Three", "No limit"], correctAnswer: 1, fact: "Ratified in 1951, it ensures no one serves more than two terms.", difficulty: 'hard' },
  { id: 25, text: "What is the 'Cabinet' in the executive branch?", options: ["The room where the President sleeps", "A group of advisors who lead the major executive departments", "The secret service", "The joint chiefs of staff"], correctAnswer: 1, fact: "The Cabinet provides specialized expertise to the President.", difficulty: 'hard' },
  { id: 26, text: "Which amendment protects against 'unreasonable searches and seizures'?", options: ["1st", "2nd", "4th", "5th"], correctAnswer: 2, fact: "The 4th Amendment requires warrants based on probable cause.", difficulty: 'hard' },
  { id: 27, text: "Who is the 'President of the Senate'?", options: ["The Speaker of the House", "The Vice President of the US", "The Majority Leader", "The Chief Justice"], correctAnswer: 1, fact: "The VP serves as President of the Senate, voting only to break a tie.", difficulty: 'hard' },
  { id: 28, text: "What is the 'filibuster'?", options: ["A type of presidential veto", "A tactic used in the Senate to delay or block a vote by speaking for a long time", "A way to impeach a judge", "A process for counting electoral votes"], correctAnswer: 1, fact: "It's a tool of obstruction that requires a 'cloture' vote to stop.", difficulty: 'hard' },
  { id: 29, text: "The 'Articles of Confederation' were replaced because they were...", options: ["Too strong", "Too weak to effectively govern the states", "Too focused on the presidency", "Only written in Latin"], correctAnswer: 1, fact: "The central government lacked the power to tax or regulate commerce.", difficulty: 'hard' },
  { id: 30, text: "Which amendment established the direct election of Senators by the people?", options: ["14th", "16th", "17th", "18th"], correctAnswer: 2, fact: "The 17th Amendment (1913) ended the practice of state legislatures choosing senators.", difficulty: 'hard' }
];

export function getQuestionsForConfidence(level: ConfidenceLevel): Question[] {
  const config = CONFIDENCE_CONFIG[level];
  const pool = civicsQuiz.filter(q => {
    if (config.difficulty === 'easy') return q.difficulty === 'easy';
    if (config.difficulty === 'medium') return q.difficulty !== 'hard';
    if (config.difficulty === 'hard') return true;
    return true;
  });
  return [...pool].sort(() => Math.random() - 0.5).slice(0, config.questionCount);
}

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
    return { message: shameMessages.fail[Math.floor(Math.random() * shameMessages.fail.length)], class: 'text-red-600 font-bold' };
  } else if (percentage < 0.8) {
    return { message: shameMessages.warning[Math.floor(Math.random() * shameMessages.warning.length)], class: 'text-yellow-600 font-bold' };
  } else {
    return { message: shameMessages.success[Math.floor(Math.random() * shameMessages.success.length)], class: 'text-green-600 font-bold' };
  }
}
