import type { Candidate, MatchResult, ProjectInput } from "./types";
import { scoreAll } from "./scoring";
import { explainCandidate } from "./openrouter";
import candidatesData from "./candidates.json";

const candidates = candidatesData.candidates as Candidate[];
const TOP_N = 4;

export async function runMatch(project: ProjectInput): Promise<MatchResult[]> {
  const ranked = scoreAll(project, candidates);

  const apiKey = process.env.OPENROUTER_API_KEY || "";
  const model = process.env.OPENROUTER_MODEL || "meta-llama/llama-3.3-8b-instruct:free";

  const top = ranked.slice(0, TOP_N);
  const rest = ranked.slice(TOP_N);

  const explanations = await Promise.allSettled(
    top.map((r) =>
      explainCandidate(
        {
          requiredSkills: project.requiredSkills,
          rolesFilled: project.rolesFilled,
          candidate: {
            name: r.candidate.name,
            skills: r.candidate.skills,
            pastWork: r.candidate.pastWork,
          },
          score: r.score,
        },
        apiKey,
        model
      )
    )
  );

  const topResults: MatchResult[] = top.map((r, i) => ({
    candidate: r.candidate,
    score: r.score,
    reasoning:
      explanations[i].status === "fulfilled"
        ? explanations[i].value
        : "Explanation unavailable — showing score only",
  }));

  const restResults: MatchResult[] = rest.map((r) => ({
    candidate: r.candidate,
    score: r.score,
    reasoning: "",
  }));

  return [...topResults, ...restResults];
}
