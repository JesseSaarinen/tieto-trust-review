// The two model calls. Claude writes the story and its claims (the author side);
// Gemini, a different vendor, only tries to break those claims (the breaker side).
// Both calls return their raw text, token usage and duration so every pack can be
// priced and regraded offline without calling a model again.
import Anthropic from "@anthropic-ai/sdk";
import { GoogleGenAI } from "@google/genai";

export const CLAUDE_MODEL = process.env.CLAUDE_MODEL ?? "claude-opus-5-5";
/** Bumped whenever a system prompt or schema changes, so packs from different prompts are never mixed in one table. */
export const PROMPT_VERSION = "v3";

export type Citation = { path: string; start_line: number; end_line: number };
export type Claim = {
  id: string;
  text: string;
  requirement_quote: string;
  kind: "behavior" | "scope" | "test" | "docs" | "generated";
  confidence: "high" | "medium" | "low";
  citations: Citation[];
  tests: string[];
  static_checks: string[];
};
export type Concern = { path: string; line: number; description: string; severity: "high" | "medium" | "low" };
export type RefusalCandidate = { rule: "contracts" | "safety" | "honesty"; what: string; why: string; path: string; start_line?: number; end_line?: number };
export type AuthorOutput = {
  story: { summary: string; why: string; touches_beyond_requirement: string[]; confidence_overview: string };
  claims: Claim[];
  concerns: Concern[];
  out_of_scope: { path: string; description: string }[];
  refusal_candidates: RefusalCandidate[];
};
export type Verdict = { claim_id: string; verdict: "upheld" | "disputed" | "cannot_tell"; reason: string; citations: { path: string; line: number }[] };
export type BreakerOutput = { verdicts: Verdict[]; missed_problems: Concern[] };

export type Usage = { input_tokens: number; output_tokens: number; cache_read_tokens: number; cache_write_tokens: number; thinking_tokens?: number };
export type ModelCall<T> = { out: T; model: string; usage: Usage; raw: string; seconds: number; attempts: number; /** The provider's own usage record, unedited. */ usage_raw?: unknown };

/** A failed model call. Carries whatever came back, so the pack can still save it and route up. */
export class ModelCallError extends Error {
  raw?: string;
  usage?: Usage;
  model?: string;
  constructor(message: string, extra: { raw?: string; usage?: Usage; model?: string } = {}) {
    super(message);
    this.name = "ModelCallError";
    Object.assign(this, extra);
  }
}

// USD per million tokens, list prices checked 14 Nov 2026.
// Claude: platform.claude.com pricing. Gemini: aistudio.google.com/docs/pricing
// (Gemini 4 Carbon and Argon are $2/$10 through 30 Nov 2026, $4/$20 after).
export const PRICES: Record<string, { in: number; out: number; cache_read: number; cache_write: number }> = {
  "claude-opus-5-5": { in: 4, out: 20, cache_read: 0.2, cache_write: 5 },
  "gemini-4-carbon": { in: 2, out: 10, cache_read: 0.1, cache_write: 0 },
  "gemini-4-argon": { in: 2, out: 10, cache_read: 0.1, cache_write: 0 },
  "gemini-3.8-flash": { in: 0.75, out: 3.75, cache_read: 0.075, cache_write: 0 },
};

/** List-price cost of one call, or null when the model has no entry in PRICES (never guessed). */
export function costUsd(model: string, u: Usage | null | undefined): number | null {
  if (!u) return null;
  const key = Object.keys(PRICES).find((k) => model.startsWith(k));
  if (!key) return null;
  const p = PRICES[key];
  const usd = (u.input_tokens * p.in + u.output_tokens * p.out + u.cache_read_tokens * p.cache_read + u.cache_write_tokens * p.cache_write) / 1e6;
  return Math.round(usd * 10000) / 10000;
}

const str = { type: "string" } as const;
const int = { type: "integer" } as const;
const obj = (properties: Record<string, unknown>) => ({ type: "object", properties, required: Object.keys(properties), additionalProperties: false });
const arr = (items: unknown) => ({ type: "array", items });
const en = (...v: string[]) => ({ type: "string", enum: v });
const concernSchema = obj({ path: str, line: int, description: str, severity: en("high", "medium", "low") });

const AUTHOR_SCHEMA = obj({
  story: obj({ summary: str, why: str, touches_beyond_requirement: arr(str), confidence_overview: str }),
  claims: arr(
    obj({
      id: str,
      text: str,
      requirement_quote: str,
      kind: en("behavior", "scope", "test", "docs", "generated"),
      confidence: en("high", "medium", "low"),
      citations: arr(obj({ path: str, start_line: int, end_line: int })),
      tests: arr(str),
      static_checks: arr(str),
    }),
  ),
  concerns: arr(concernSchema),
  out_of_scope: arr(obj({ path: str, description: str })),
  refusal_candidates: arr(obj({ rule: en("contracts", "safety", "honesty"), what: str, why: str, path: str, start_line: int, end_line: int })),
});

const BREAKER_SCHEMA = obj({
  verdicts: arr(obj({ claim_id: str, verdict: en("upheld", "disputed", "cannot_tell"), reason: str, citations: arr(obj({ path: str, line: int })) })),
  missed_problems: arr(concernSchema),
});

const AUTHOR_SYSTEM = `You write the "story" of a code change for a named human owner who will approve it without reading the whole diff.
The change was written by an AI coding agent against the requirement given. You are a reviewer, not the author's advocate.

Produce:
- story: what the change does, why, what it touches beyond the requirement, and how sure you are about each part. Plain language, short.
- claims: atomic, checkable statements the change relies on, as many as the change needs (usually 6-16). One behaviour or one test method per claim; a claim about a test cites that test method and names it. Each claim must:
  - quote the exact sentence or phrase of the requirement it serves, copied word for word (requirement_quote; use "" only for scope/side claims that serve no requirement text),
  - cite the new-file line ranges that back it (line numbers are the left column of the annotated diff; cite only lines you can see),
  - list test method names FROM THE DIFF that exercise it (tests; [] if none - never invent names),
  - list static check ids from the provided list that support it (static_checks; only if the check really covers the claim).
  Mark confidence honestly. Include at least one claim that the tests really test the requirement, and one about scope.
- concerns: concrete defects or risks you see (file, new-file line, what goes wrong). Report real problems only; an empty list is fine.
- out_of_scope: changes not needed by the requirement.
- refusal_candidates: things a model should not decide alone under these rules:
  contracts = public API, serialized output (wire format), new user-visible analyzer rules;
  safety = code that handles untrusted input;
  honesty = changes beyond the requirement, tests changed to pass or that check nothing, generated files that don't match their templates.
  Give the new-file line range the problem sits in (start_line, end_line), or 0 and 0 when it is the whole file.

How your output is used. Every changed line of non-generated code starts on the owner's reading list. A line comes off the list only when a claim that cites it is backed by a test the tool itself finds passing in the real test run, and an independent breaker model fails to break that claim. Lines no claim cites stay on the list. So:
- keep claims narrow. A dispute puts every line of the disputed claim back on the list, so one broad claim over a whole file is worth less than several small ones;
- give each claim the full line ranges it really accounts for, and try to leave no changed code range without a claim (shared helpers, usings and setup lines belong to a claim of their own that says what they do);
- never stretch a citation over lines the claim does not describe, and never name a test that does not exercise the claim. The breaker disputes both.
Your confidence moves nothing. Never say a change is "fine" or "approved". You give evidence; the human decides.`;

const BREAKER_SYSTEM = `You are an independent breaker. Another AI (a different vendor) wrote claims about a code change. Your only job is to find claims the code does NOT back, and problems the author missed.
You are not asked whether the change is good. Assume each claim is wrong until the diff shows it is right.
A claim that survives you takes its cited lines off a human owner's reading list, so the lines it cites must really be explained by it.
For each claim give exactly one verdict:
- "disputed": the cited lines do not do what the claim says, the citation is wrong, the citation covers changed lines the claim does not describe (over-citation), the named test does not test it, or the requirement is only partly met. Say exactly why, with file and line.
- "upheld": you tried to break it and could not; say what you checked.
- "cannot_tell": the diff alone is not enough (e.g. depends on code not shown).
A claim you give no verdict for counts as unchallenged and its lines stay with the human.
Then list missed_problems: concrete bugs or risks (file, new-file line, what goes wrong) that no claim mentions. Only real problems, no style notes. Empty is fine.`;

export function haveKeys() {
  return { anthropic: !!process.env.ANTHROPIC_API_KEY, gemini: !!process.env.GEMINI_API_KEY };
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const RETRY_WAIT_MS = Number(process.env.MODEL_RETRY_WAIT_MS ?? 15000);

/** 408, 409, 429, 5xx, dropped connections, and errors raised mid-stream (no HTTP status, e.g. overloaded). */
function claudeRetryable(e: unknown): boolean {
  if (e instanceof ModelCallError) return false;
  if (e instanceof Anthropic.APIConnectionError) return true;
  if (e instanceof Anthropic.APIError) return e.status === undefined || e.status === 408 || e.status === 409 || e.status === 429 || e.status >= 500;
  return /fetch failed|ECONNRESET|ETIMEDOUT|socket hang up|terminated/i.test(String(e));
}

export async function runAuthor(input: string): Promise<ModelCall<AuthorOutput>> {
  const client = new Anthropic();
  const t0 = Date.now();
  for (let attempt = 1; ; attempt++) {
    try {
      const stream = client.messages.stream({
        model: CLAUDE_MODEL,
        max_tokens: 32000,
        system: AUTHOR_SYSTEM,
        output_config: { effort: "high", format: { type: "json_schema", schema: AUTHOR_SCHEMA } },
        messages: [{ role: "user", content: input }],
      } as Anthropic.MessageStreamParams);
      const msg = await stream.finalMessage();
      const raw = msg.content.filter((b) => b.type === "text").map((b) => (b as Anthropic.TextBlock).text).join("");
      const usage: Usage = {
        input_tokens: msg.usage.input_tokens,
        output_tokens: msg.usage.output_tokens,
        cache_read_tokens: msg.usage.cache_read_input_tokens ?? 0,
        cache_write_tokens: msg.usage.cache_creation_input_tokens ?? 0,
      };
      const got = { raw, usage, model: msg.model };
      if (msg.stop_reason === "refusal") throw new ModelCallError("Claude declined the request (stop_reason=refusal)", got);
      if (msg.stop_reason === "max_tokens") throw new ModelCallError("Claude output hit max_tokens before the JSON was complete", got);
      let out: AuthorOutput;
      try {
        out = JSON.parse(raw) as AuthorOutput;
      } catch {
        throw new ModelCallError("Claude output was not valid JSON", got);
      }
      if (!out || typeof out.story !== "object" || !Array.isArray(out.claims)) throw new ModelCallError("Claude output is missing the story or the claims list", got);
      return { out, model: msg.model, usage, raw, seconds: Math.round((Date.now() - t0) / 1000), attempts: attempt };
    } catch (e) {
      if (attempt < 3 && claudeRetryable(e)) {
        await sleep(RETRY_WAIT_MS * attempt);
        continue;
      }
      throw e;
    }
  }
}

// Gemini 4 Carbon: Google's strongest model as of Nov 2026 (checked against the key's model list).
const GEMINI_CHAIN = [process.env.GEMINI_MODEL, "gemini-4-carbon", "gemini-4-argon", "gemini-3.8-flash"].filter(Boolean) as string[];

export async function runBreaker(input: string): Promise<ModelCall<BreakerOutput>> {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const t0 = Date.now();
  let lastErr: unknown = new Error("no Gemini model configured");
  for (const model of [...new Set(GEMINI_CHAIN)]) {
    try {
      let res;
      let attempt = 1;
      for (; ; attempt++) {
        try {
          res = await ai.models.generateContent({
            model,
            contents: input,
            config: { systemInstruction: BREAKER_SYSTEM, responseMimeType: "application/json", responseJsonSchema: BREAKER_SCHEMA },
          });
          break;
        } catch (e) {
          if (attempt < 4 && /429|500|503|RESOURCE_EXHAUSTED|UNAVAILABLE|INTERNAL|fetch failed/i.test(String(e))) {
            await sleep(RETRY_WAIT_MS * attempt);
            continue;
          }
          throw e;
        }
      }
      const raw = res.text ?? "";
      const m = res.usageMetadata;
      const cached = m?.cachedContentTokenCount ?? 0;
      const thinking = m?.thoughtsTokenCount ?? 0;
      const usage: Usage = {
        input_tokens: Math.max(0, (m?.promptTokenCount ?? 0) - cached),
        output_tokens: (m?.candidatesTokenCount ?? 0) + thinking, // Gemini bills thinking tokens as output
        cache_read_tokens: cached,
        cache_write_tokens: 0,
        thinking_tokens: thinking,
      };
      const got = { raw, usage, model };
      let out: BreakerOutput;
      try {
        out = JSON.parse(raw) as BreakerOutput;
      } catch {
        throw new ModelCallError("Gemini output was not valid JSON", got);
      }
      if (!out || !Array.isArray(out.verdicts)) throw new ModelCallError("Gemini output is missing the verdict list", got);
      out.missed_problems ??= [];
      return { out, model, usage, raw, seconds: Math.round((Date.now() - t0) / 1000), attempts: attempt, usage_raw: m };
    } catch (e) {
      lastErr = e;
      if (e instanceof ModelCallError || !/404|not found|NOT_FOUND|not supported/i.test(String(e))) throw e;
    }
  }
  throw lastErr;
}
