// Additional hard questions (ids 101-125) to bring hard total to ~30
// These join ids 17-30 (already hard) + 97-100 (4 hard from subagent) = 18 existing + 25 new = 43 total hard
// After removing dupes and balancing: we'll target 28-30 hard total across all 100

export const additionalHardQuestions = [
  // Constitution - Hard (ids 101-108)
  {
    id: 101,
    text: "Which Supreme Court case established 'separate but equal' as constitutional?",
    options: ["Brown v. Board of Education", "Plessy v. Ferguson", "Dred Scott v. Sandford", "Sweatt v. Painter"],
    correctAnswer: 1,
    fact: "Plessy v. Ferguson (1896) established 'separate but equal' — it took Brown v. Board (1954) to overturn it.",
    difficulty: "hard",
    category: "constitution"
  },
  {
    id: 102,
    text: "What is the 'ex post facto' prohibition?",
    options: ["Banning prior restraint of speech", "Prohibiting laws that criminalize acts retroactively", "Requiring equal protection", "Allowing unlimited presidential terms"],
    correctAnswer: 1,
    fact: "Article I prohibits Congress from passing ex post facto laws — criminalizing an act after it was committed.",
    difficulty: "hard",
    category: "constitution"
  },
  {
    id: 103,
    text: "The 'Treason' clause defines treason as:",
    options: ["Disagreeing with the government", "Waging war against the US or supporting its enemies", "Publishing criticism of officials", "Refusing to pay taxes"],
    correctAnswer: 1,
    fact: "Article III defines treason as waging war against the US or adhering to its enemies, requiring two witnesses or confession.",
    difficulty: "hard",
    category: "constitution"
  },
  {
    id: 104,
    text: "Which case ruled that congressional subpoenas require judicial approval?",
    options: ["Marbury v. Madison", "United States v. Nixon", "Clinton v. Jones", "United States v. Microsoft"],
    correctAnswer: 1,
    fact: "United States v. Nixon (1974) required judicial enforcement of congressional subpoenas for presidential documents.",
    difficulty: "hard",
    category: "constitution"
  },
  {
    id: 105,
    text: "What is the 'origination clause' regarding revenue bills?",
    options: ["All bills must start in the House", "Revenue bills must start in the House", "Senators can amend any bill", "The President proposes all budgets"],
    correctAnswer: 1,
    fact: "Article I requires all revenue bills to originate in the House of Representatives.",
    difficulty: "hard",
    category: "constitution"
  },
  {
    id: 106,
    text: "Which amendment ended life imprisonment for crimes?",
    options: ["5th Amendment", "8th Amendment", "13th Amendment", "14th Amendment"],
    correctAnswer: 2,
    fact: "The 13th Amendment abolished slavery and involuntary servitude, ending 'life imprisonment' as a legal status for enslaved people.",
    difficulty: "hard",
    category: "constitution"
  },
  {
    id: 107,
    text: "What is a 'letter of marque and reprisal'?",
    options: ["A presidential pardon", "Congressional authority to commission private ships to capture enemy vessels", "A Supreme Court writ", "A type of treaty provision"],
    correctAnswer: 1,
    fact: "Article I gives Congress the power to issue letters of marque, allowing privateers to seize enemy ships during war.",
    difficulty: "hard",
    category: "constitution"
  },
  {
    id: 108,
    text: "The 'full faith and credit' clause requires states to:",
    options: ["Print the same currency", "Recognize each other's public acts and judicial decisions", "Share tax revenue equally", "Maintain identical laws"],
    correctAnswer: 1,
    fact: "Article IV requires states to honor each other's laws and court judgments across state lines.",
    difficulty: "hard",
    category: "constitution"
  },

  // Branches - Hard (ids 109-116)
  {
    id: 109,
    text: "What is the 'nuclear option' in the Senate?",
    options: ["A presidential veto override", "Invoking the 25th Amendment", "Changing Senate rules by majority vote to end filibuster", "A Supreme Court packing plan"],
    correctAnswer: 2,
    fact: "The nuclear option allows the Senate to change rules by majority vote, breaking a filibuster — used for nominations in 2013 and 2017.",
    difficulty: "hard",
    category: "branches"
  },
  {
    id: 110,
    text: "How many votes are needed to convict in an impeachment trial?",
    options: ["Simple majority", "Two-thirds majority", "Three-fifths majority", " unanimous vote"],
    correctAnswer: 1,
    fact: "Impeachment requires a two-thirds Senate majority for conviction — a deliberately high bar.",
    difficulty: "hard",
    category: "branches"
  },
  {
    id: 111,
    text: "What is 'advice and consent' in the context of appointments?",
    options: ["The President's duty to consult Congress", "The Senate's role in confirming presidential appointments", "The Supreme Court's review power", "The Cabinet's advisory function"],
    correctAnswer: 1,
    fact: "Article II gives the President power to appoint officials 'by and with the Advice and Consent of the Senate.'",
    difficulty: "hard",
    category: "branches"
  },
  {
    id: 112,
    text: "What is a 'continuing resolution' in budgeting?",
    options: ["A permanent tax cut", "Congressional temporary funding to avoid government shutdown", "An executive budget amendment", "A Supreme Court budget ruling"],
    correctAnswer: 1,
    fact: "A continuing resolution extends current funding levels temporarily when Congress fails to pass a new budget.",
    difficulty: "hard",
    category: "branches"
  },
  {
    id: 113,
    text: "Which president first used the 'line item veto'?",
    options: ["George Washington", "Abraham Lincoln", "Donald Trump", "Bill Clinton"],
    correctAnswer: 2,
    fact: "Donald Trump was the first president to use the line item veto (later struck down by the Supreme Court in 2018).",
    difficulty: "hard",
    category: "branches"
  },
  {
    id: 114,
    text: "What is the 'recess appointment' power?",
    options: ["Appointing judges during Senate recesses", "Filling cabinet positions during war", "Appointing Supreme Court justices", "Reappointing expiring officials"],
    correctAnswer: 0,
    fact: "Article II allows presidents to make temporary appointments when the Senate is in recess — used to bypass confirmation battles.",
    difficulty: "hard",
    category: "branches"
  },
  {
    id: 115,
    text: "The 'War Powers Resolution' of 1973 was passed to:",
    options: ["Declare war on Vietnam", "Limit presidential war-making power", "Expand the military budget", "Establish the Selective Service"],
    correctAnswer: 1,
    fact: "The War Powers Resolution requires presidents to withdraw forces after 60-90 days unless Congress authorizes continued hostilities.",
    difficulty: "hard",
    category: "branches"
  },
  {
    id: 116,
    text: "What is the 'commander in chief' clause?",
    options: ["Congress appoints military leaders", "The President leads the armed forces", "The Chief Justice commands federal police", "State governors command the National Guard"],
    correctAnswer: 1,
    fact: "Article II designates the President as Commander in Chief of the US armed forces, giving civilian control over the military.",
    difficulty: "hard",
    category: "branches"
  },

  // Rights - Hard (ids 117-122)
  {
    id: 117,
    text: "Which case established that the Bill of Rights applies to state governments?",
    options: ["Marbury v. Madison", "McDonald v. Chicago", "Barron v. Baltimore", "The Slaughterhouse Cases"],
    correctAnswer: 1,
    fact: "McDonald v. Chicago (2010) incorporated the Second Amendment against the states, applying it to all government levels.",
    difficulty: "hard",
    category: "rights"
  },
  {
    id: 118,
    text: "What is 'strict scrutiny' in constitutional law?",
    options: ["A test for voting eligibility", "The highest level of judicial review requiring compelling government interest", "A standard for jury selection", "A requirement for tax audits"],
    correctAnswer: 1,
    fact: "Strict scrutiny requires the government to prove a law is narrowly tailored to a compelling governmental interest — almost impossible to meet.",
    difficulty: "hard",
    category: "rights"
  },
  {
    id: 119,
    text: "Which case established the 'clear and present danger' test for free speech?",
    options: ["Brandenburg v. Ohio", "Schenck v. United States", "NY Times v. Sullivan", "Cohen v. California"],
    correctAnswer: 1,
    fact: "Schenck v. United States (1919) created the 'clear and present danger' test — later refined by Brandenburg v. Ohio (1969).",
    difficulty: "hard",
    category: "rights"
  },
  {
    id: 120,
    text: "The right to privacy is derived primarily from which amendment's penumbra?",
    options: ["1st Amendment", "4th Amendment", "9th Amendment", "14th Amendment"],
    correctAnswer: 1,
    fact: "Griswold v. Connecticut (1965) found a right to privacy in the 'penumbras' of the Bill of Rights, particularly the 4th Amendment.",
    difficulty: "hard",
    category: "rights"
  },
  {
    id: 121,
    text: "Which amendment case established 'innocent until proven guilty'?",
    options: ["6th Amendment", "5th Amendment", "14th Amendment", "This is a common law principle, not constitutional"],
    correctAnswer: 3,
    fact: "'Innocent until proven guilty' is derived from the 5th Amendment's due process clause and English common law, not explicitly stated in the Constitution.",
    difficulty: "hard",
    category: "rights"
  },
  {
    id: 122,
    text: "What is the 'establishment clause'?",
    options: ["Congress cannot establish a national religion", "The President establishes executive agencies", "States establish local governments", "Courts establish precedent"],
    correctAnswer: 0,
    fact: "The First Amendment's Establishment Clause prohibits the government from establishing or favoring any religion.",
    difficulty: "hard",
    category: "rights"
  },

  // Elections - Hard (ids 123-128)
  {
    id: 123,
    text: "What is the minimum constitutionally mandated voting age?",
    options: ["18", "21", "No minimum is specified", "25"],
    correctAnswer: 2,
    fact: "The Constitution does not specify a minimum voting age — Congress set it at 18 via federal law, later confirmed by the 26th Amendment.",
    difficulty: "hard",
    category: "elections"
  },
  {
    id: 124,
    text: "What is a 'faithless elector'?",
    options: ["A voter who doesn't disclose their choice", "An elector who votes contrary to their state's popular vote", "A candidate who drops out", "A congressman who breaks party lines"],
    correctAnswer: 1,
    fact: "A faithless elector ignores their state's popular vote — the Supreme Court ruled in 2020 they can be fined but not forced to vote correctly.",
    difficulty: "hard",
    category: "elections"
  },
  {
    id: 125,
    text: "What is the 'ballot initiative' process?",
    options: ["A method for Congress to propose amendments", "Citizens propose and vote on state laws directly", "The Electoral College selects the President", "States certify election results"],
    correctAnswer: 1,
    fact: "Ballot initiatives allow citizens to bypass legislatures and directly vote on state laws — a form of direct democracy.",
    difficulty: "hard",
    category: "elections"
  },
  {
    id: 126,
    text: "The 'Reapportionment Act of 1929' fixed the House at:",
    options: ["100 members", "435 members", "538 members", "50 members"],
    correctAnswer: 1,
    fact: "The Reapportionment Act of 1929 capped the House at 435 members — it has not changed since, despite population growth.",
    difficulty: "hard",
    category: "elections"
  },
  {
    id: 127,
    text: "What is the 'twenty-day rule' in presidential elections?",
    options: ["States must certify results within 20 days", "Electors must meet 20 days after the election", "Presidential terms end 20 days after inauguration", "Campaign spending limits apply 20 days before election"],
    correctAnswer: 1,
    fact: "Electors meet on the first Tuesday after the second Wednesday in December — approximately 41 days after the election.",
    difficulty: "hard",
    category: "elections"
  },
  {
    id: 128,
    text: "What did the 'Federalist Papers' primarily argue for?",
    options: ["A bill of rights", "Ratification of the Constitution", "State sovereignty", "A monarchy"],
    correctAnswer: 1,
    fact: "The Federalist Papers (Hamilton, Madison, Jay) argued for ratification of the Constitution, addressing concerns about centralized power.",
    difficulty: "hard",
    category: "citizenship"
  },
  {
    id: 129,
    text: "What is the difference between a 'delegate' and a 'trustee' model of representation?",
    options: ["Delegates vote as instructed; trustees vote their judgment", "Both vote the same way", "Delegates are appointed; trustees are elected", "Trustees represent parties; delegates represent people"],
    correctAnswer: 0,
    fact: "The delegate model requires representatives to vote as their constituents prefer; the trustee model lets them use their own judgment.",
    difficulty: "hard",
    category: "citizenship"
  },
  {
    id: 130,
    text: "What is the 'census' requirement in Article I?",
    options: ["A federal tax on goods", "A population count every 10 years to apportion House seats", "A yearly voter audit", "A military draft registration"],
    correctAnswer: 1,
    fact: "Article I requires a census every 10 years to count population and reapportion House seats among the states.",
    difficulty: "hard",
    category: "citizenship"
  }
];
