export type Availability = "low" | "med" | "high";

export interface Candidate {
  id: string;
  name: string;
  skills: string[];
  pastWork: string;
  availability: Availability;
}

export interface ProjectInput {
  title: string;
  description: string;
  requiredSkills: string[];
  teamSize: number;
  rolesFilled: string;
}

export interface MatchResult {
  candidate: Candidate;
  score: number;
  reasoning: string;
}

export interface MatchPayload {
  project: ProjectInput;
  results: MatchResult[];
}
