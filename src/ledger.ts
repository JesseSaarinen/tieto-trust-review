// Trust ledger: a track record per code area. Trust is earned by clean reviews and
// withdrawn after an escape (a bug that got through review).
import { existsSync, readFileSync, writeFileSync } from "node:fs";

export type AreaRecord = {
  reviews: number;
  signoffs: number;
  findings_accepted: number;
  findings_rejected: number; // false alarms
  escapes: number;
  clean_since_escape: number;
  status: "earning" | "trusted" | "probation";
  history: { at: string; event: string; ref?: string }[];
};
export type Ledger = { version: 1; earn_back_after: number; trusted_after: number; areas: Record<string, AreaRecord> };

const blank = (): AreaRecord => ({ reviews: 0, signoffs: 0, findings_accepted: 0, findings_rejected: 0, escapes: 0, clean_since_escape: 0, status: "earning", history: [] });

/** An empty ledger. Measurement runs use this, so they neither read nor write the real one. */
export const newLedger = (): Ledger => ({ version: 1, earn_back_after: 5, trusted_after: 10, areas: {} });

export function loadLedger(path: string): Ledger {
  if (!existsSync(path)) return newLedger();
  return JSON.parse(readFileSync(path, "utf8"));
}
export function saveLedger(path: string, l: Ledger) {
  writeFileSync(path, JSON.stringify(l, null, 2) + "\n");
}
export function area(l: Ledger, name: string): AreaRecord {
  return (l.areas[name] ??= blank());
}

function restatus(l: Ledger, a: AreaRecord) {
  if (a.escapes > 0 && a.clean_since_escape < l.earn_back_after) a.status = "probation";
  else if (a.signoffs >= l.trusted_after && a.findings_accepted >= a.findings_rejected) a.status = "trusted";
  else a.status = "earning";
}

export function recordSignoff(l: Ledger, areas: string[], ref: string) {
  const at = new Date().toISOString();
  for (const n of areas) {
    const a = area(l, n);
    a.signoffs++;
    if (a.escapes > 0) a.clean_since_escape++;
    a.history.push({ at, event: "signoff", ref });
    restatus(l, a);
  }
}
export function recordReview(l: Ledger, areas: string[], ref: string) {
  const at = new Date().toISOString();
  for (const n of areas) {
    const a = area(l, n);
    a.reviews++;
    a.history.push({ at, event: "review", ref });
  }
}
export function recordFinding(l: Ledger, areaName: string, accepted: boolean, ref: string) {
  const a = area(l, areaName);
  if (accepted) a.findings_accepted++;
  else a.findings_rejected++;
  a.history.push({ at: new Date().toISOString(), event: accepted ? "finding-accepted" : "finding-rejected", ref });
  restatus(l, a);
}
export function recordEscape(l: Ledger, areaName: string, note: string) {
  const a = area(l, areaName);
  a.escapes++;
  a.clean_since_escape = 0;
  a.history.push({ at: new Date().toISOString(), event: "escape", ref: note });
  restatus(l, a);
}
