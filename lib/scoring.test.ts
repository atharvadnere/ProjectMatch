import { describe, it, expect } from "vitest";
import { scoreAll, parseRolesFilled, primaryArea } from "./scoring";
import type { Candidate, ProjectInput } from "./types";

const candidates: Candidate[] = [
  {
    id: "a",
    name: "Frontend A",
    skills: ["frontend", "react"],
    pastWork: "x",
    availability: "high",
  },
  {
    id: "b",
    name: "Backend B",
    skills: ["backend", "node"],
    pastWork: "x",
    availability: "med",
  },
  {
    id: "c",
    name: "Design C",
    skills: ["design", "figma"],
    pastWork: "x",
    availability: "low",
  },
];

const project: ProjectInput = {
  title: "App",
  description: "d",
  requiredSkills: ["frontend", "backend"],
  teamSize: 4,
  rolesFilled: "2 frontend",
};

describe("scoring", () => {
  it("parses roles filled counts", () => {
    expect(parseRolesFilled("2 frontend, 1 design")).toEqual({
      frontend: 2,
      design: 1,
    });
    expect(parseRolesFilled("backend")).toEqual({ backend: 1 });
  });

  it("detects primary area", () => {
    expect(primaryArea(candidates[0])).toBe("frontend");
    expect(primaryArea(candidates[1])).toBe("backend");
  });

  it("ranks by score and applies gap penalty", () => {
    const scored = scoreAll(project, candidates);
    expect(scored[0].candidate.id).toBe("b"); // backend: matches a required skill, area not filled -> gap bonus
    const frontend = scored.find((s) => s.candidate.id === "a")!;
    const backend = scored.find((s) => s.candidate.id === "b")!;
    expect(frontend.score).toBeLessThan(backend.score); // frontend area already filled -> penalty
  });

  it("returns all candidates sorted descending", () => {
    const scored = scoreAll(project, candidates);
    expect(scored.length).toBe(3);
    for (let i = 1; i < scored.length; i++) {
      expect(scored[i - 1].score).toBeGreaterThanOrEqual(scored[i].score);
    }
  });
});
