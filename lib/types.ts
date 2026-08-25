export type Availability = "low" | "med" | "high";

export interface ProjectExperience {
  name: string;
  role: string;
  year: string;
  blurb: string;
}

export interface Candidate {
  id: string;
  name: string;
  skills: string[];
  pastWork: string;
  availability: Availability;
  experience?: ProjectExperience[];
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
