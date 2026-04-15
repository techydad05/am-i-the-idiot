export type Difficulty = 'easy' | 'medium' | 'hard';
export type Category = 'constitution' | 'branches' | 'rights' | 'elections' | 'citizenship';

export type Question = {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  fact: string;
  difficulty: Difficulty;
  category: Category;
};

export const CONFIDENCE_CONFIG = {
  humble: {
    label: 'Humble',
    questionCount: 5,
    difficulty: 'easy',
    timeLimit: 5,
    description: 'I just want to learn. Be gentle.'
  },
  confident: {
    label: 'Confident',
    questionCount: 10,
    difficulty: 'medium',
    timeLimit: 5,
    description: 'I know my stuff. Bring it on.'
  },
  arrogant: {
    label: 'Arrogant',
    questionCount: 15,
    difficulty: 'hard',
    timeLimit: 5,
    description: 'I am a civic god. Challenge me.'
  }
} as const;

export type ConfidenceLevel = keyof typeof CONFIDENCE_CONFIG;

// Full 100-question bank
// ids 1-30: original questions (with added category tags)
// ids 31-100: expanded question bank
export const civicsQuiz: Question[] = [
  // === ORIGINAL QUESTIONS (ids 1-30) with categories added ===
  { id: 1, text: "What was the original Greek meaning of the word 'idiot'?", options: ["Someone who cannot read", "A private citizen who avoids civic participation", "A foolish person", "A professional philosopher"], correctAnswer: 1, fact: "In ancient Greece, an 'idios' was a private person who lived apart from the polis, ignoring their duty to participate in governance.", difficulty: 'easy', category: 'citizenship' },
  { id: 2, text: "Who is the head of the executive branch of the US government?", options: ["The Chief Justice", "The Speaker of the House", "The President", "The Secretary of State"], correctAnswer: 2, fact: "The President is the head of the executive branch. This is basic 4th grade material.", difficulty: 'easy', category: 'branches' },
  { id: 3, text: "What is the primary purpose of the Legislative branch?", options: ["To enforce laws", "To interpret laws", "To make laws", "To veto laws"], correctAnswer: 2, fact: "The Legislative branch (Congress) makes the laws. Your ignorance of this is a gift to lobbyists.", difficulty: 'easy', category: 'branches' },
  { id: 4, text: "How many senators does each US state have?", options: ["1", "2", "4", "Depends on population"], correctAnswer: 1, fact: "Every state has exactly two senators, regardless of size, ensuring equal representation.", difficulty: 'easy', category: 'branches' },
  { id: 5, text: "Which document is the supreme law of the land in the United States?", options: ["The Declaration of Independence", "The Bill of Rights", "The US Constitution", "The Articles of Confederation"], correctAnswer: 2, fact: "The Constitution is the supreme law. Everything else must align with it.", difficulty: 'easy', category: 'constitution' },
  { id: 6, text: "What is the term length for a US Senator?", options: ["2 years", "4 years", "6 years", "Life"], correctAnswer: 2, fact: "Senators serve 6-year terms. The fact that you're guessing this is an indictment of our education system.", difficulty: 'easy', category: 'branches' },
  { id: 7, text: "How many amendments does the US Constitution have?", options: ["10", "25", "27", "33"], correctAnswer: 2, fact: "There are 27 amendments. If you didn't know this, you're practically an 'idios' in the original sense.", difficulty: 'medium', category: 'constitution' },
  { id: 8, text: "Who has the power to declare war in the United States?", options: ["The President", "The Supreme Court", "Congress", "The Joint Chiefs of Staff"], correctAnswer: 2, fact: "While the President is Commander-in-Chief, only Congress can formally declare war.", difficulty: 'medium', category: 'branches' },
  { id: 9, text: "What is the purpose of the Electoral College?", options: ["To elect members of Congress", "To elect the President and Vice President", "To appoint Supreme Court Justices", "To certify state elections"], correctAnswer: 1, fact: "The Electoral College is the formal body that elects the US President.", difficulty: 'medium', category: 'elections' },
  { id: 10, text: "Which amendment granted women the right to vote?", options: ["15th", "19th", "21st", "26th"], correctAnswer: 1, fact: "The 19th Amendment was ratified in 1920, finally recognizing women's suffrage.", difficulty: 'medium', category: 'rights' },
  { id: 11, text: "What is 'Checks and Balances'?", options: ["A banking system", "The division of power to prevent any one branch from becoming too powerful", "The process of counting votes", "The way the budget is balanced"], correctAnswer: 1, fact: "Checks and balances ensure that no single branch of government can exercise absolute power.", difficulty: 'medium', category: 'branches' },
  { id: 12, text: "Who is the 'Commander in Chief' of the military?", options: ["Secretary of Defense", "General of the Army", "The President", "The Speaker of the House"], correctAnswer: 2, fact: "The President holds the title of Commander in Chief to ensure civilian control of the military.", difficulty: 'medium', category: 'branches' },
  { id: 13, text: "What does 'due process' mean?", options: ["Following a specific set of legal procedures", "A fast-track trial", "Paying a fine immediately", "The right to a lawyer only if you can afford one"], correctAnswer: 0, fact: "Due process ensures that the government respects all legal rights owed to a person.", difficulty: 'medium', category: 'rights' },
  { id: 14, text: "What is the minimum age to be President of the United States?", options: ["25", "30", "35", "40"], correctAnswer: 2, fact: "One must be at least 35 years old to serve as President.", difficulty: 'medium', category: 'citizenship' },
  { id: 15, text: "Which branch of government interprets the laws?", options: ["Legislative", "Executive", "Judicial", "Administrative"], correctAnswer: 2, fact: "The Judicial branch, led by the Supreme Court, interprets the law.", difficulty: 'easy', category: 'branches' },
  { id: 16, text: "What is the 'Bill of Rights'?", options: ["The first 10 amendments to the Constitution", "The list of presidential powers", "The original 13 colonies' laws", "The Declaration of Independence"], correctAnswer: 0, fact: "The Bill of Rights protects individual liberties from government infringement.", difficulty: 'medium', category: 'constitution' },
  { id: 17, text: "The 'Great Compromise' of 1787 settled the dispute between which two groups?", options: ["Federalists and Anti-Federalists", "Large states and small states", "Northern and Southern states", "The colonists and the British"], correctAnswer: 1, fact: "It created a bicameral legislature: the House (by population) and the Senate (equal).", difficulty: 'hard', category: 'constitution' },
  { id: 18, text: "Which US Supreme Court case established the principle of 'Judicial Review'?", options: ["Plessy v. Ferguson", "Brown v. Board of Education", "Marbury v. Madison", "Roe v. Wade"], correctAnswer: 2, fact: "Marbury v. Madison (1803) gave the Court the power to declare laws unconstitutional.", difficulty: 'hard', category: 'branches' },
  { id: 19, text: "What is a 'writ of habeas corpus'?", options: ["A command to pay taxes", "A court order to bring a prisoner before the court to determine if their detention is lawful", "A presidential pardon", "A request for a new trial"], correctAnswer: 1, fact: "It's a fundamental protection against arbitrary imprisonment.", difficulty: 'hard', category: 'rights' },
  { id: 20, text: "Which amendment abolished slavery in the United States?", options: ["12th", "13th", "14th", "15th"], correctAnswer: 1, fact: "The 13th Amendment ended slavery, though the struggle for true equality continued.", difficulty: 'easy', category: 'constitution' },
  { id: 21, text: "The 'Three-Fifths Compromise' dealt with the counting of which population for representation?", options: ["Immigrants", "Enslaved people", "Indigenous peoples", "Women"], correctAnswer: 1, fact: "It was a dark chapter of early American history where enslaved people were counted as 3/5 of a person.", difficulty: 'hard', category: 'constitution' },
  { id: 22, text: "Who wrote the 'Federalist Papers' primarily?", options: ["Thomas Jefferson and James Madison", "Alexander Hamilton, James Madison, and John Jay", "Benjamin Franklin and John Adams", "George Washington and Thomas Paine"], correctAnswer: 1, fact: "Hamilton, Madison, and Jay wrote them to persuade New York to ratify the Constitution.", difficulty: 'hard', category: 'citizenship' },
  { id: 23, text: "What is the 'quorum' in a legislative body?", options: ["A specific type of vote", "The minimum number of members present to conduct official business", "A meeting of only the leadership", "The total number of votes cast"], correctAnswer: 1, fact: "Without a quorum, a legislative body cannot legally transact business.", difficulty: 'hard', category: 'branches' },
  { id: 24, text: "The 22nd Amendment limits the President to how many terms?", options: ["One", "Two", "Three", "No limit"], correctAnswer: 1, fact: "Ratified in 1951, it ensures no one serves more than two terms.", difficulty: 'hard', category: 'constitution' },
  { id: 25, text: "What is the 'Cabinet' in the executive branch?", options: ["The room where the President sleeps", "A group of advisors who lead the major executive departments", "The secret service", "The joint chiefs of staff"], correctAnswer: 1, fact: "The Cabinet provides specialized expertise to the President.", difficulty: 'easy', category: 'branches' },
  { id: 26, text: "Which amendment protects against 'unreasonable searches and seizures'?", options: ["1st", "2nd", "4th", "5th"], correctAnswer: 2, fact: "The 4th Amendment requires warrants based on probable cause.", difficulty: 'easy', category: 'rights' },
  { id: 27, text: "Who is the 'President of the Senate'?", options: ["The Speaker of the House", "The Vice President of the US", "The Majority Leader", "The Chief Justice"], correctAnswer: 1, fact: "The VP serves as President of the Senate, voting only to break a tie.", difficulty: 'medium', category: 'branches' },
  { id: 28, text: "What is the 'filibuster'?", options: ["A type of presidential veto", "A tactic used in the Senate to delay or block a vote by speaking for a long time", "A way to impeach a judge", "A process for counting electoral votes"], correctAnswer: 1, fact: "It's a tool of obstruction that requires a 'cloture' vote to stop.", difficulty: 'hard', category: 'branches' },
  { id: 29, text: "The 'Articles of Confederation' were replaced because they were...", options: ["Too strong", "Too weak to effectively govern the states", "Too focused on the presidency", "Only written in Latin"], correctAnswer: 1, fact: "The central government lacked the power to tax or regulate commerce.", difficulty: 'hard', category: 'constitution' },
  { id: 30, text: "Which amendment established the direct election of Senators by the people?", options: ["14th", "16th", "17th", "18th"], correctAnswer: 2, fact: "The 17th Amendment (1913) ended the practice of state legislatures choosing senators.", difficulty: 'hard', category: 'elections' },

  // === EXPANDED QUESTIONS (ids 31-100) ===
  // EASY - Constitution (ids 31-36)
  { id: 31, text: "How many articles does the original Constitution contain?", options: ["Five", "Six", "Seven", "Eight"], correctAnswer: 2, fact: "The original Constitution contained seven articles, establishing the three branches and federalism.", difficulty: 'easy', category: 'constitution' },
  { id: 32, text: "What is the preamble to the Constitution?", options: ["The Bill of Rights", "The introduction stating goals", "The first amendment", "The conclusion"], correctAnswer: 1, fact: "The preamble begins with 'We the People' and states the Constitution's fundamental purposes.", difficulty: 'easy', category: 'constitution' },
  { id: 33, text: "What is the longest article of the Constitution?", options: ["Article I", "Article II", "Article III", "Article IV"], correctAnswer: 0, fact: "Article I is the longest, detailing the powers and structure of Congress.", difficulty: 'easy', category: 'constitution' },
  { id: 34, text: "The Constitution was signed in what year?", options: ["1776", "1787", "1791", "1800"], correctAnswer: 1, fact: "The Constitution was signed on September 17, 1787, by 39 delegates at the Constitutional Convention.", difficulty: 'medium', category: 'constitution' },
  { id: 35, text: "What is the supreme law of the United States?", options: ["The Declaration of Independence", "The Constitution", "The Bill of Rights", "Federal law"], correctAnswer: 1, fact: "Article VI of the Constitution establishes it as the supreme law of the land.", difficulty: 'easy', category: 'constitution' },
  { id: 36, text: "How many branches of government does the US have?", options: ["Two", "Three", "Four", "Five"], correctAnswer: 1, fact: "The Constitution establishes three separate branches: legislative, executive, and judicial.", difficulty: 'easy', category: 'branches' },

  // EASY - Branches (ids 37-41)
  { id: 37, text: "Which branch is responsible for making laws?", options: ["Executive", "Legislative", "Judicial", "Federal"], correctAnswer: 1, fact: "Article I of the Constitution grants all legislative powers to Congress.", difficulty: 'easy', category: 'branches' },
  { id: 38, text: "Who is the head of the executive branch?", options: ["Congress", "The President", "The Chief Justice", "The Speaker"], correctAnswer: 1, fact: "Article II establishes the President as head of the executive branch.", difficulty: 'easy', category: 'branches' },
  { id: 39, text: "Which branch interprets the laws?", options: ["Legislative", "Executive", "Judicial", "State"], correctAnswer: 2, fact: "The judicial branch, through the Supreme Court, interprets laws and their constitutionality.", difficulty: 'easy', category: 'branches' },
  { id: 40, text: "What is the term length for a US Representative?", options: ["2 years", "4 years", "6 years", "Life"], correctAnswer: 0, fact: "Representatives serve 2-year terms, elections held every even year.", difficulty: 'easy', category: 'branches' },

  // EASY - Rights (ids 41-46)
  { id: 41, text: "Which amendment protects freedom of speech?", options: ["1st Amendment", "2nd Amendment", "5th Amendment", "10th Amendment"], correctAnswer: 0, fact: "The First Amendment prohibits Congress from abridging freedom of speech.", difficulty: 'easy', category: 'rights' },
  { id: 42, text: "Which amendment gives you the right to remain silent?", options: ["1st Amendment", "3rd Amendment", "5th Amendment", "8th Amendment"], correctAnswer: 2, fact: "The Fifth Amendment protects against self-incrimination, allowing you to remain silent.", difficulty: 'easy', category: 'rights' },
  { id: 43, text: "Cruel and unusual punishment is prohibited by which amendment?", options: ["5th Amendment", "6th Amendment", "8th Amendment", "14th Amendment"], correctAnswer: 2, fact: "The Eighth Amendment prohibits cruel and unusual punishments.", difficulty: 'easy', category: 'rights' },
  { id: 44, text: "The right to bear arms is protected by which amendment?", options: ["1st Amendment", "2nd Amendment", "4th Amendment", "10th Amendment"], correctAnswer: 1, fact: "The Second Amendment protects the right to keep and bear arms.", difficulty: 'easy', category: 'rights' },
  { id: 45, text: "Which amendment guarantees equal protection under the law?", options: ["1st Amendment", "5th Amendment", "14th Amendment", "15th Amendment"], correctAnswer: 2, fact: "The 14th Amendment's Equal Protection Clause is foundational to civil rights law.", difficulty: 'easy', category: 'rights' },

  // EASY - Elections (ids 46-51)
  { id: 46, text: "At what age can you vote in US federal elections?", options: ["16", "18", "21", "25"], correctAnswer: 1, fact: "The 26th Amendment, ratified in 1971, lowered the voting age to 18.", difficulty: 'easy', category: 'elections' },
  { id: 47, text: "What is the Electoral College?", options: ["A college that teaches about government", "A system of electors who elect the President", "A political party organization", "A type of election"], correctAnswer: 1, fact: "The Electoral College consists of 538 electors who formally elect the President.", difficulty: 'easy', category: 'elections' },
  { id: 48, text: "How many electors does each state get?", options: ["Same as its Senators only", "Same as its Representatives only", "Equals its Senators plus Representatives", "Determined by the President"], correctAnswer: 2, fact: "Each state gets electors equal to its total number of Senators (2) plus Representatives.", difficulty: 'easy', category: 'elections' },
  { id: 49, text: "In which year was the first presidential election?", options: ["1776", "1788", "1792", "1800"], correctAnswer: 1, fact: "George Washington was elected President in 1788, the first presidential election.", difficulty: 'medium', category: 'elections' },

  // EASY - Citizenship (ids 50-56)
  { id: 50, text: "What is the most common way to become a US citizen?", options: ["Being born abroad to American parents", "Naturalization", "Living in the US for 5 years", "Marriage to a citizen"], correctAnswer: 1, fact: "Naturalization is the process by which foreign nationals become US citizens.", difficulty: 'easy', category: 'citizenship' },
  { id: 51, text: "How long must you live in the US before applying for citizenship?", options: ["1 year", "3 years", "5 years", "10 years"], correctAnswer: 2, fact: "Most applicants must have lived in the US for 5 years as a permanent resident before applying.", difficulty: 'easy', category: 'citizenship' },
  { id: 52, text: "What is required to vote in US elections?", options: ["Property ownership", "Registration", "Payment of poll taxes", "Military service"], correctAnswer: 1, fact: "You must register to vote before participating in elections.", difficulty: 'easy', category: 'citizenship' },
  { id: 53, text: "Jury duty is a responsibility of:", options: ["Only citizens", "All residents", "Only men", "Only property owners"], correctAnswer: 0, fact: "Jury duty is reserved for US citizens, a fundamental civic responsibility.", difficulty: 'easy', category: 'citizenship' },
  { id: 54, text: "What oath do naturalized citizens take?", options: ["Oath of office", "Oath of allegiance", "Oath of loyalty", "Oath of service"], correctAnswer: 1, fact: "The oath of allegiance renounces foreign allegiance and supports the Constitution.", difficulty: 'easy', category: 'citizenship' },

  // MEDIUM - Constitution (ids 55-64)
  { id: 55, text: "What is the concept that allows states to govern themselves in certain areas?", options: ["Federal supremacy", "Judicial review", "Federalism", "Separation of powers"], correctAnswer: 2, fact: "Federalism divides power between the federal government and state governments.", difficulty: 'medium', category: 'constitution' },
  { id: 56, text: "The Bill of Rights was ratified in what year?", options: ["1776", "1787", "1791", "1800"], correctAnswer: 2, fact: "The Bill of Rights (first 10 amendments) was ratified in 1791.", difficulty: 'medium', category: 'constitution' },
  { id: 57, text: "What was the Three-Fifths Compromise about?", options: ["Presidential terms", "Taxation and representation of enslaved people", "Trade between states", "Election of senators"], correctAnswer: 1, fact: "The Three-Fifths Compromise counted enslaved people as 3/5 of a person for representation.", difficulty: 'hard', category: 'constitution' },
  { id: 58, text: "What is the purpose of the necessary and proper clause?", options: ["Limit federal power", "Allow Congress to make laws needed for its powers", "Establish judicial review", "Define treason"], correctAnswer: 1, fact: "Also called the Elastic Clause, it allows Congress to exercise implied powers.", difficulty: 'medium', category: 'constitution' },
  { id: 59, text: "What did the 16th Amendment establish?", options: ["Women's suffrage", "Direct election of Senators", "Federal income tax", "Prohibition"], correctAnswer: 2, fact: "The 16th Amendment (1913) gave Congress the power to tax income without regard to population.", difficulty: 'medium', category: 'constitution' },
  { id: 60, text: "How many amendments have been ratified since the Bill of Rights?", options: ["7", "17", "27", "37"], correctAnswer: 1, fact: "17 amendments have been ratified since the original 10 Bill of Rights amendments.", difficulty: 'medium', category: 'constitution' },
  { id: 61, text: "What is the term length for a US Senator?", options: ["2 years", "4 years", "6 years", "8 years"], correctAnswer: 2, fact: "Senators serve 6-year terms, with elections staggered so roughly one-third are elected every 2 years.", difficulty: 'easy', category: 'branches' },
  { id: 62, text: "How many members are in the House of Representatives?", options: ["50", "100", "435", "538"], correctAnswer: 2, fact: "The House of Representatives has 435 voting members, apportioned by population.", difficulty: 'medium', category: 'branches' },
  { id: 63, text: "Who presides over the Senate?", options: ["The President", "The Vice President", "The Chief Justice", "The Speaker"], correctAnswer: 1, fact: "The Vice President of the United States serves as the President of the Senate.", difficulty: 'medium', category: 'branches' },
  { id: 64, text: "What is the main role of the Supreme Court?", options: ["Create laws", "Enforce laws", "Interpret laws and judge constitutionality", "Command the military"], correctAnswer: 2, fact: "The Supreme Court's primary function is judicial review and constitutional interpretation.", difficulty: 'medium', category: 'branches' },
  { id: 65, text: "How many justices serve on the Supreme Court?", options: ["5", "7", "9", "13"], correctAnswer: 2, fact: "The Supreme Court has had 9 justices since 1869.", difficulty: 'medium', category: 'branches' },
  { id: 66, text: "What power does Congress have over the President?", options: ["Can remove from office at will", "Impeachment and trial", "Can override vetoes only", "Can dismiss cabinet members"], correctAnswer: 1, fact: "Congress can impeach and remove the President for treason, bribery, or high crimes.", difficulty: 'medium', category: 'branches' },
  { id: 67, text: "What is the impeachment process in the House?", options: ["Trial by jury", "Formal charges (articles)", "Voting on guilty/not guilty", "Supreme Court review"], correctAnswer: 1, fact: "The House votes on articles of impeachment — formal charges that initiate the process.", difficulty: 'medium', category: 'branches' },
  { id: 68, text: "What is a pocket veto?", options: ["A veto with exceptions", "A presidential veto when Congress is not in session", "A partial veto", "A congressional override"], correctAnswer: 1, fact: "A pocket veto occurs when the President fails to sign a bill during congressional adjournment.", difficulty: 'medium', category: 'branches' },

  // MEDIUM - Rights (ids 69-76)
  { id: 69, text: "Which amendment gave women the right to vote?", options: ["15th Amendment", "19th Amendment", "21st Amendment", "26th Amendment"], correctAnswer: 1, fact: "The 19th Amendment, ratified in 1920, prohibited sex discrimination in voting.", difficulty: 'medium', category: 'rights' },
  { id: 70, text: "What did the 24th Amendment do?", options: ["Lowered voting age to 18", "Outlawed poll taxes in federal elections", "Guaranteed voting rights", "Established voter registration"], correctAnswer: 1, fact: "The 24th Amendment (1964) eliminated poll taxes in federal elections.", difficulty: 'medium', category: 'rights' },
  { id: 71, text: "The right to a speedy trial is protected by which amendment?", options: ["4th Amendment", "5th Amendment", "6th Amendment", "8th Amendment"], correctAnswer: 2, fact: "The Sixth Amendment guarantees the right to a speedy and public trial.", difficulty: 'medium', category: 'rights' },
  { id: 72, text: "Which amendment addresses search and seizure?", options: ["3rd Amendment", "4th Amendment", "5th Amendment", "6th Amendment"], correctAnswer: 1, fact: "The Fourth Amendment protects against unreasonable searches and seizures.", difficulty: 'medium', category: 'rights' },
  { id: 73, text: "What is double jeopardy?", options: ["Two separate crimes", "Being tried twice for the same crime", "Two defendants in one trial", "Appealing a verdict"], correctAnswer: 1, fact: "The Fifth Amendment prohibits trying someone twice for the same crime.", difficulty: 'medium', category: 'rights' },
  { id: 74, text: "Which amendment protects rights not specifically listed in the Constitution?", options: ["9th Amendment", "10th Amendment", "14th Amendment", "15th Amendment"], correctAnswer: 0, fact: "The 9th Amendment states that listing rights doesn't deny others retained by the people.", difficulty: 'medium', category: 'rights' },
  { id: 75, text: "What did the 15th Amendment guarantee?", options: ["Women's suffrage", "Voting rights regardless of race", "Equal protection", "Due process"], correctAnswer: 1, fact: "The 15th Amendment (1870) prohibited denying voting rights based on race.", difficulty: 'medium', category: 'rights' },
  { id: 76, text: "The right against self-incrimination is part of which amendment?", options: ["3rd Amendment", "4th Amendment", "5th Amendment", "6th Amendment"], correctAnswer: 2, fact: "The Fifth Amendment's protection against self-incrimination is famously invoked as 'taking the Fifth.'", difficulty: 'medium', category: 'rights' },

  // MEDIUM - Elections (ids 77-84)
  { id: 77, text: "What happens if no presidential candidate gets 270 electoral votes?", options: ["The House picks the President", "The Senate picks the President", "A new election is held", "The Chief Justice picks"], correctAnswer: 0, fact: "If no candidate reaches 270, the House of Representatives elects the President from the top 3 candidates.", difficulty: 'medium', category: 'elections' },
  { id: 78, text: "What is the minimum number of electoral votes a state can have?", options: ["1", "3", "5", "10"], correctAnswer: 1, fact: "The minimum is 3 electoral votes — 2 senators plus at least 1 representative.", difficulty: 'medium', category: 'elections' },
  { id: 79, text: "Which states do not use a winner-take-all system for electors?", options: ["Texas and California", "Maine and Nebraska", "New York and Florida", "Ohio and Pennsylvania"], correctAnswer: 1, fact: "Maine and Nebraska allocate electoral votes by congressional district.", difficulty: 'medium', category: 'elections' },
  { id: 80, text: "What is a super PAC?", options: ["A political party organization", "A super fundraising committee", "An independent expenditure-only committee", "A congressional campaign committee"], correctAnswer: 2, fact: "Super PACs are independent expenditure-only committees that can raise unlimited funds.", difficulty: 'medium', category: 'elections' },
  { id: 81, text: "What is the purpose of the Federal Election Commission?", options: ["To conduct elections", "To regulate campaign finance", "To certify election results", "To register voters"], correctAnswer: 1, fact: "The FEC oversees and enforces the Federal Election Campaign Act's provisions.", difficulty: 'medium', category: 'elections' },
  { id: 82, text: "How many votes does Washington DC have in the Electoral College?", options: ["0", "3", "10", "No limit"], correctAnswer: 1, fact: "DC has 3 electoral votes, despite having no voting representation in Congress.", difficulty: 'medium', category: 'elections' },
  { id: 83, text: "What is the purpose of a primary election?", options: ["To elect the President", "To choose party nominees", "To ratify amendments", "To elect judges"], correctAnswer: 1, fact: "Primary elections allow party members to choose their party's candidates for office.", difficulty: 'medium', category: 'elections' },
  { id: 84, text: "What is the line of succession after the Vice President?", options: ["Secretary of State", "Speaker of the House", "Governor of the state", "Chief Justice"], correctAnswer: 1, fact: "After the Vice President, the Speaker of the House is next in line for the presidency.", difficulty: 'medium', category: 'elections' },

  // MEDIUM - Citizenship (ids 85-91)
  { id: 85, text: "What is jus soli (birthright citizenship)?", options: ["Citizenship through parents", "Citizenship through birthplace", "Citizenship through naturalization", "Citizenship through marriage"], correctAnswer: 1, fact: "Jus soli means citizenship is granted by being born on US soil, regardless of parents' citizenship.", difficulty: 'medium', category: 'citizenship' },
  { id: 86, text: "What is jus sanguinis?", options: ["Citizenship through birthplace", "Citizenship through blood/descent", "Citizenship through naturalization", "Citizenship through marriage"], correctAnswer: 1, fact: "Jus sanguinis grants citizenship to children born to citizen parents, even abroad.", difficulty: 'medium', category: 'citizenship' },
  { id: 87, text: "How many questions are on the naturalization test?", options: ["10", "20", "100", "50"], correctAnswer: 2, fact: "The naturalization test has 100 questions; applicants must study all of them.", difficulty: 'medium', category: 'citizenship' },
  { id: 88, text: "What English proficiency test is required for naturalization?", options: ["TOEFL", "GRE", "English and civics tests administered by USCIS", "SAT"], correctAnswer: 2, fact: "USCIS administers English and civics tests as part of the naturalization process.", difficulty: 'medium', category: 'citizenship' },
  { id: 89, text: "What is a certificate of naturalization?", options: ["A voter registration card", "Proof of citizenship granted", "A work permit", "A passport"], correctAnswer: 1, fact: "The Certificate of Naturalization is official proof of US citizenship.", difficulty: 'medium', category: 'citizenship' },
  { id: 90, text: "Can a naturalized citizen be deported?", options: ["Never", "Only for fraud in naturalization", "For any crime", "Only for treason"], correctAnswer: 1, fact: "Naturalized citizenship can be revoked if obtained through fraud or misrepresentation.", difficulty: 'medium', category: 'citizenship' },
  { id: 91, text: "What does it mean to be a dual citizen?", options: ["Citizen of two US states", "Citizen of two countries", "Naturalized citizen", "Citizen with two passports"], correctAnswer: 1, fact: "Dual citizens hold citizenship in two countries simultaneously.", difficulty: 'medium', category: 'citizenship' },

  // HARD questions (ids 92-100)
  { id: 92, text: "Which Supreme Court case established 'separate but equal' as constitutional?", options: ["Brown v. Board of Education", "Plessy v. Ferguson", "Dred Scott v. Sandford", "Sweatt v. Painter"], correctAnswer: 1, fact: "Plessy v. Ferguson (1896) established 'separate but equal' — Brown v. Board (1954) overturned it.", difficulty: 'hard', category: 'constitution' },
  { id: 93, text: "What is the 'ex post facto' prohibition?", options: ["Banning prior restraint of speech", "Prohibiting laws that criminalize acts retroactively", "Requiring equal protection", "Allowing unlimited presidential terms"], correctAnswer: 1, fact: "Article I prohibits Congress from passing ex post facto laws — criminalizing an act after it was committed.", difficulty: 'hard', category: 'constitution' },
  { id: 94, text: "The 'Treason' clause defines treason as:", options: ["Disagreeing with the government", "Waging war against the US or supporting its enemies", "Publishing criticism of officials", "Refusing to pay taxes"], correctAnswer: 1, fact: "Article III defines treason as waging war against the US or adhering to its enemies, requiring two witnesses or confession.", difficulty: 'hard', category: 'constitution' },
  { id: 95, text: "What is the 'origination clause' regarding revenue bills?", options: ["All bills must start in the House", "Revenue bills must start in the House", "Senators can amend any bill", "The President proposes all budgets"], correctAnswer: 1, fact: "Article I requires all revenue bills to originate in the House of Representatives.", difficulty: 'hard', category: 'constitution' },
  { id: 96, text: "What is a 'letter of marque and reprisal'?", options: ["A presidential pardon", "Congressional authority to commission private ships to capture enemy vessels", "A Supreme Court writ", "A type of treaty provision"], correctAnswer: 1, fact: "Article I gives Congress the power to issue letters of marque, allowing privateers to seize enemy ships during war.", difficulty: 'hard', category: 'branches' },
  { id: 97, text: "The 'full faith and credit' clause requires states to:", options: ["Print the same currency", "Recognize each other's public acts and judicial decisions", "Share tax revenue equally", "Maintain identical laws"], correctAnswer: 1, fact: "Article IV requires states to honor each other's laws and court judgments across state lines.", difficulty: 'hard', category: 'constitution' },
  { id: 98, text: "What is the 'nuclear option' in the Senate?", options: ["A presidential veto override", "Invoking the 25th Amendment", "Changing Senate rules by majority vote to end filibuster", "A Supreme Court packing plan"], correctAnswer: 2, fact: "The nuclear option allows the Senate to change rules by majority vote, breaking a filibuster — used for nominations in 2013 and 2017.", difficulty: 'hard', category: 'branches' },
  { id: 99, text: "How many votes are needed to convict in an impeachment trial?", options: ["Simple majority", "Two-thirds majority", "Three-fifths majority", "Unanimous vote"], correctAnswer: 1, fact: "Impeachment requires a two-thirds Senate majority for conviction — a deliberately high bar.", difficulty: 'hard', category: 'branches' },
  { id: 100, text: "What is 'advice and consent' in the context of appointments?", options: ["The President's duty to consult Congress", "The Senate's role in confirming presidential appointments", "The Supreme Court's review power", "The Cabinet's advisory function"], correctAnswer: 1, fact: "Article II gives the President power to appoint officials 'by and with the Advice and Consent of the Senate.'", difficulty: 'hard', category: 'branches' },
];

export function getQuestionsForConfidence(level: ConfidenceLevel): Question[] {
  const config = CONFIDENCE_CONFIG[level];

  // Humble = Easy only
  // Confident = Easy + Medium
  // Arrogant = All difficulties (Easy + Medium + Hard) — all questions are eligible
  const pool = civicsQuiz.filter(q => {
    if (config.difficulty === 'easy') return q.difficulty === 'easy';
    if (config.difficulty === 'medium') return q.difficulty === 'easy' || q.difficulty === 'medium';
    if (config.difficulty === 'hard') return true; // all questions eligible for hard tier
    return true;
  });

  return [...pool].sort(() => Math.random() - 0.5).slice(0, config.questionCount);
}

export const shameMessages = {
  fail: [
    "You're below average — and that's saying something. America's education system might be struggling, but you're not helping. Do better.",
    "Wrong. Your civic ignorance is exactly why democracy is struggling. Imagine being this uninformed in the age of the internet.",
    "Incorrect. You are the living embodiment of the original Greek 'idiot' — someone who completely ignores the workings of their society.",
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

// === CIVIC PERSONA CLASSIFICATION ===
export type PersonaTier = 'saint' | 'citizen' | 'aspiring' | 'numb' | 'idiot';

export interface CivicPersona {
  tier: PersonaTier;
  label: string;
  emoji: string;
  tagline: string;
  color: string;
  borderColor: string;
  glowColor: string;
}

const PERSONA_MAP: Record<PersonaTier, Omit<CivicPersona, 'tier'>> = {
  saint: {
    label: 'The Civic Saint',
    emoji: '🏛️',
    tagline: 'You know your government. The original Greeks would be proud.',
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500',
    glowColor: 'shadow-emerald-500/30',
  },
  citizen: {
    label: 'The Aspiring Citizen',
    emoji: '⚖️',
    tagline: 'Solid civic literacy. You care enough to learn. Now inspire others.',
    color: 'text-green-400',
    borderColor: 'border-green-500',
    glowColor: 'shadow-green-500/30',
  },
  aspiring: {
    label: 'The Comfortably Numb',
    emoji: '🌫️',
    tagline: "You've checked out. Time to check back in — democracy needs you.",
    color: 'text-amber-400',
    borderColor: 'border-amber-500',
    glowColor: 'shadow-amber-500/30',
  },
  numb: {
    label: 'The Comfortably Numb',
    emoji: '🌫️',
    tagline: "You've checked out. Time to check back in — democracy needs you.",
    color: 'text-orange-400',
    borderColor: 'border-orange-500',
    glowColor: 'shadow-orange-500/30',
  },
  idiot: {
    label: 'The Original Idiot',
    emoji: '🗿',
    tagline: 'In ancient Greece, you\'d be the person the polis feared most.',
    color: 'text-red-500',
    borderColor: 'border-red-600',
    glowColor: 'shadow-red-600/40',
  },
};

export function getCivicPersona(percentage: number): CivicPersona {
  const tier = percentage >= 0.9 ? 'saint'
    : percentage >= 0.7 ? 'citizen'
    : percentage >= 0.5 ? 'aspiring'
    : percentage >= 0.3 ? 'numb'
    : 'idiot';
  return { tier, ...PERSONA_MAP[tier] };
}

// === CATEGORY ANALYSIS FOR DCAs ===
export type Category = 'constitution' | 'branches' | 'rights' | 'elections' | 'citizenship';

export interface CategoryScore {
  category: Category;
  label: string;
  icon: string;
  correct: number;
  total: number;
  percentage: number;
  action: string;
  actionUrl: string;
}

export const DCA_ACTIONS: Record<Category, { action: string; actionUrl: string }> = {
  constitution: {
    action: 'Read the Constitution (in 10 minutes)',
    actionUrl: 'https://constitutioncenter.org/the-constitution',
  },
  branches: {
    action: 'Find your representatives',
    actionUrl: 'https://www.congress.gov/members',
  },
  rights: {
    action: 'Check your voter registration',
    actionUrl: 'https://www.usa.gov/voting',
  },
  elections: {
    action: 'See what\'s on your ballot',
    actionUrl: 'https://www.ballotready.org',
  },
  citizenship: {
    action: 'Take a deeper civic course',
    actionUrl: 'https://www.icivics.org/games',
  },
};

export function analyzeCategories(questions: Question[], answers: number[]): CategoryScore[] {
  const categoryMap: Record<Category, { correct: number; total: number }> = {
    constitution: { correct: 0, total: 0 },
    branches: { correct: 0, total: 0 },
    rights: { correct: 0, total: 0 },
    elections: { correct: 0, total: 0 },
    citizenship: { correct: 0, total: 0 },
  };

  questions.forEach((q, i) => {
    categoryMap[q.category].total++;
    if (answers[i] === q.correctAnswer) {
      categoryMap[q.category].correct++;
    }
  });

  const labels: Record<Category, string> = {
    constitution: 'Constitution',
    branches: 'Gov\'t Branches',
    rights: 'Rights',
    elections: 'Elections',
    citizenship: 'Citizenship',
  };

  const icons: Record<Category, string> = {
    constitution: '📜',
    branches: '⚖️',
    rights: '🗽',
    elections: '🗳️',
    citizenship: '🪖',
  };

  return (Object.keys(categoryMap) as Category[]).map(cat => {
    const { correct, total } = categoryMap[cat];
    return {
      category: cat,
      label: labels[cat],
      icon: icons[cat],
      correct,
      total,
      percentage: total > 0 ? correct / total : 0,
      ...DCA_ACTIONS[cat],
    };
  });
}

export function getWeakestCategories(scores: CategoryScore[]): CategoryScore[] {
  return scores
    .filter(s => s.total > 0 && s.percentage < 0.6)
    .sort((a, b) => a.percentage - b.percentage);
}

export function getDCAForUser(scores: CategoryScore[]): CategoryScore | null {
  const weakest = getWeakestCategories(scores);
  return weakest[0] ?? null;
}

// === SHARE TEXT GENERATION ===
export function getShareText(name: string, percentage: number, tier: PersonaTier): string {
  const texts: Record<PersonaTier, string> = {
    saint: `${name} scored ${Math.round(percentage * 100)}% on the civic literacy test and earned "Civic Saint" status. In ancient Greece, an idiot was someone who avoided civic duty. ${name} clearly doesn't. Take the test 👉 amitheidiot.com`,
    citizen: `${name} scored ${Math.round(percentage * 100)}% on the civic literacy test. They know enough to be dangerous AND useful. In ancient Greece, an idiot was someone who avoided civic participation. Take the test 👉 amitheidiot.com`,
    aspiring: `${name} scored ${Math.round(percentage * 100)}% on the civic literacy test. Comfortably numb isn't a civic virtue. In ancient Greece, an idiot was someone who wouldn't show up. Take the test 👉 amitheidiot.com`,
    numb: `${name} scored ${Math.round(percentage * 100)}% on the civic literacy test. The Greeks had a word for people who don't participate: idiot. Take the test 👉 amitheidiot.com`,
    idiot: `${name} scored ${Math.round(percentage * 100)}% on the civic literacy test. They ARE the original Greek idiot. In ancient Greece, you were the person the polis feared most. Take the test 👉 amitheidiot.com`,
  };
  return texts[tier];
}
