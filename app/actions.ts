"use server";

import type { MatchResult, ProjectInput, MatchPayload } from "@/lib/types";
import { runMatch } from "@/lib/match";

export async function runMatchAction(
  project: ProjectInput
): Promise<MatchResult[]> {
  return runMatch(project);
}
