import type { Candidate, ProjectInput } from "./types";

export const AREAS = [
  "frontend",
  "backend",
  "design",
  "data",
  "devops",
  "mobile",
] as const;

export type Area = (typeof AREAS)[number];

const AVAILABILITY_BONUS: Record<Candidate["availability"], number> = {
  high: 15,
  med: 7,
  low: 0,
};

export function primaryArea(candidate: Candidate): string {
  const hit = candidate.skills.find((s) =>
    (AREAS as readonly string[]).includes(s.toLowerCase())
  );
  return hit ? hit.toLowerCase() : "other";
}

export function parseRolesFilled(text: string): Record<string, number> {
  const counts: Record<string, number> = {};
  const lower = text.toLowerCase();
  for (const area of AREAS) {
    let total = 0;
    const numbered = new RegExp(`(\\d+)\\s*${area}`, "g");
    let m: RegExpExecArray | null;
    while ((m = numbered.exec(lower)) !== null) {
      total += parseInt(m[1], 10);
    }
    if (!total) {
      const bare = new RegExp(`\\b${area}\\b`, "g");
      if (bare.test(lower)) total = 1;
    }
    if (total) counts[area] = total;
  }
  return counts;
}

export interface ScoredCandidate {
  candidate: Candidate;
  score: number;
  area: string;
}

export function scoreCandidate(
  candidate: Candidate,
  project: ProjectInput,
  filled: Record<string, number>
): number {
  const required = project.requiredSkills.map((s) => s.toLowerCase());
  const requiredCount = required.length || 1;

  const overlap = candidate.skills.filter((s) =>
    required.includes(s.toLowerCase())
  ).length;
  const skillScore = Math.min(overlap / requiredCount, 1) * 70;

  const availabilityScore = AVAILABILITY_BONUS[candidate.availability];

  const area = primaryArea(candidate);
  let gapScore = 15;
  if (area !== "other" && filled[area]) {
    const filledCount = filled[area];
    gapScore = Math.max(0, 15 - filledCount * 8);
  }

  return Math.round(skillScore + availabilityScore + gapScore);
}

export function scoreAll(
  project: ProjectInput,
  candidates: Candidate[]
): ScoredCandidate[] {
  const filled = parseRolesFilled(project.rolesFilled);
  return candidates
    .map((candidate) => ({
      candidate,
      score: scoreCandidate(candidate, project, filled),
      area: primaryArea(candidate),
    }))
    .sort((a, b) => b.score - a.score);
}
