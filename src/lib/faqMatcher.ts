import { faqItems, siteConfig, type FaqItem } from "@/data/content";

export interface BotResponse {
  text: string;
  link?: { label: string; href: string };
  faqIds: string[];
}

const STOP_WORDS = new Set([
  "a", "an", "the", "is", "are", "was", "were", "be", "been", "being",
  "do", "does", "did", "can", "could", "will", "would", "should", "may",
  "i", "me", "my", "we", "our", "you", "your", "they", "their", "it", "its",
  "what", "how", "when", "where", "why", "who", "which", "please", "tell",
  "about", "know", "want", "need", "get", "give", "any", "some", "there",
]);

const SYNONYMS: Record<string, string[]> = {
  trial: ["trials", "join", "register", "signup", "apply", "enrol", "enroll"],
  trials: ["trial", "join", "register", "signup", "apply"],
  join: ["trials", "register", "signup", "enrol", "enroll"],
  register: ["trials", "join", "signup", "apply", "enrol"],
  location: ["address", "where", "place", "ground", "venue", "located"],
  where: ["location", "address", "ground", "venue"],
  bombo: ["location", "ground", "luwero", "luweero"],
  kawanda: ["location", "branch"],
  schedule: ["time", "times", "when", "hours", "training"],
  when: ["schedule", "time", "hours"],
  weekend: ["schedule", "saturday", "sunday"],
  holiday: ["schedule", "holidays", "camp"],
  program: ["programs", "training", "course", "camp"],
  programs: ["program", "training", "course"],
  fee: ["fees", "cost", "price", "pricing", "pay"],
  fees: ["fee", "cost", "price", "pricing"],
  cost: ["fees", "price", "pricing"],
  contact: ["email", "phone", "call", "reach", "number"],
  phone: ["contact", "call", "number", "mobile"],
  email: ["contact", "mail"],
  age: ["ages", "old", "year", "years"],
  ages: ["age", "old", "year"],
  kid: ["kids", "child", "children", "age"],
  kids: ["child", "children", "age"],
  girl: ["girls", "women", "female"],
  girls: ["girl", "women", "female", "boys"],
  boy: ["boys", "male"],
  coach: ["coaches", "coaching", "trainer"],
  coaches: ["coach", "coaching", "trainer"],
  uyfa: ["registered", "registration", "official"],
  registered: ["uyfa", "registration", "official"],
  kit: ["uniform", "boots", "jersey", "equipment", "wear"],
  boots: ["kit", "shoes", "footwear"],
  cup: ["chipkizi", "tournament", "competition"],
  chipkizi: ["cup", "tournament"],
  tournament: ["chipkizi", "cup", "competition"],
  goalkeeper: ["keeper", "goalie", "goalkeeping"],
  keeper: ["goalkeeper", "goalie"],
  professional: ["pro", "career", "pathway", "club"],
  academy: ["mentor", "mentorsports", "football"],
  football: ["soccer", "training"],
};

const GREETING_PATTERNS: { pattern: RegExp; response: string }[] = [
  {
    pattern: /^(hi|hello|hey|good morning|good afternoon|good evening|howdy)\b/,
    response:
      "Hello! Welcome to Mentor Sports International Academy — mentoring future professional footballers since 2008. I can help with trials, programs, locations, schedules, fees, and more. What would you like to know?",
  },
  {
    pattern: /^(thanks|thank you|thx|cheers|appreciate)/,
    response:
      "You're welcome! Feel free to ask anything else about the academy — we're here to help. ⚽",
  },
  {
    pattern: /^(bye|goodbye|see you|later)\b/,
    response:
      "Goodbye! We hope to see you at the academy soon. You can always book trials at mentorsportsintug.com. ⚽",
  },
  {
    pattern: /^(who are you|what are you|what can you do|help me)/,
    response:
      "I'm the Mentor Sports assistant. Ask me about age groups, trials, training schedules, our Kampala training ground, programs, tournaments, fees, kit requirements, or how to contact us.",
  },
];

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s+]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(text: string): string[] {
  return normalize(text)
    .split(" ")
    .filter((word) => word.length > 1 && !STOP_WORDS.has(word));
}

function expandTokens(tokens: string[]): Set<string> {
  const expanded = new Set<string>();
  for (const token of tokens) {
    expanded.add(token);
    const syns = SYNONYMS[token];
    if (syns) syns.forEach((s) => expanded.add(s));
  }
  return expanded;
}

function scoreFaq(input: string, tokens: Set<string>, item: FaqItem): number {
  const normalized = normalize(input);
  let score = 0;

  const question = item.question.toLowerCase();
  if (normalized === question) score += 25;
  if (question.includes(normalized) && normalized.length > 8) score += 15;
  if (normalized.includes(question.replace(/\?/g, ""))) score += 12;

  for (const keyword of item.keywords) {
    const kw = keyword.toLowerCase();
    if (normalized.includes(kw)) score += 6;
    if (tokens.has(kw)) score += 5;
    for (const token of tokens) {
      if (token.includes(kw) || kw.includes(token)) score += 2;
    }
  }

  if (item.phrases) {
    for (const phrase of item.phrases) {
      if (normalized.includes(phrase.toLowerCase())) score += 14;
    }
  }

  for (const token of tokens) {
    if (question.includes(token) && token.length > 2) score += 2;
    if (item.answer.toLowerCase().includes(token) && token.length > 3) score += 1;
  }

  return score;
}

function buildCombinedResponse(items: FaqItem[]): BotResponse {
  const text = items.map((item) => item.answer).join("\n\n");
  const link = items.find((item) => item.link)?.link;
  return {
    text,
    link,
    faqIds: items.map((item) => item.id),
  };
}

export function resolveQuestion(input: string): BotResponse {
  const trimmed = input.trim();
  if (!trimmed) {
    return {
      text: "Please type a question and I'll do my best to help!",
      faqIds: [],
    };
  }

  const normalized = normalize(trimmed);

  for (const { pattern, response } of GREETING_PATTERNS) {
    if (pattern.test(normalized)) {
      return { text: response, faqIds: [] };
    }
  }

  const tokens = expandTokens(tokenize(trimmed));

  const scored = faqItems
    .map((item) => ({ item, score: scoreFaq(trimmed, tokens, item) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) {
    return {
      text: `I couldn't find an exact match, but our team can help directly. Mentor Sports trains ages 3–17 at ${siteConfig.trainingVenue}. Email ${siteConfig.email}, call ${siteConfig.phone}, or visit our contact page.`,
      link: { label: "Contact us", href: "/contact" },
      faqIds: [],
    };
  }

  const top = scored[0];
  const threshold = top.score * 0.65;
  const related = scored.filter((entry) => entry.score >= threshold).slice(0, 2);

  if (related.length > 1 && top.score >= 6) {
    return buildCombinedResponse(related.map((r) => r.item));
  }

  const best = top.item;
  return {
    text: best.answer,
    link: best.link,
    faqIds: [best.id],
  };
}
