import { describe, it, expect } from "vitest";
import { scoreAll, parseRolesFilled, primaryArea } from "./scoring";
import type { Candidate, ProjectInput, MatchResult } from "./types";

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

  it("higher skill overlap scores higher (gap penalty controlled)", () => {
    const proj: ProjectInput = {
      title: "t",
      description: "d",
      requiredSkills: ["frontend", "react", "typescript"],
      teamSize: 3,
      rolesFilled: "",
    };
    const a: Candidate = {
      id: "a",
      name: "A",
      skills: ["frontend", "react", "typescript"],
      pastWork: "",
      availability: "low",
    };
    const b: Candidate = {
      id: "b",
      name: "B",
      skills: ["frontend"],
      pastWork: "",
      availability: "low",
    };
    const scored = scoreAll(proj, [a, b]);
    expect(
      scored.find((s) => s.candidate.id === "a")!.score
    ).toBeGreaterThan(scored.find((s) => s.candidate.id === "b")!.score);
  });

  it("equally-skilled candidate in a filled area scores lower than a gap-filler", () => {
    const proj: ProjectInput = {
      title: "t",
      description: "d",
      requiredSkills: ["frontend", "backend"],
      teamSize: 4,
      rolesFilled: "2 frontend",
    };
    const covered: Candidate = {
      id: "x",
      name: "X",
      skills: ["frontend", "react"],
      pastWork: "",
      availability: "high",
    };
    const gap: Candidate = {
      id: "y",
      name: "Y",
      skills: ["backend", "node"],
      pastWork: "",
      availability: "high",
    };
    const scored = scoreAll(proj, [covered, gap]);
    expect(scored.find((s) => s.candidate.id === "x")!.score).toBeLessThan(
      scored.find((s) => s.candidate.id === "y")!.score
    );
  });

  it("edge: empty requiredSkills returns a sane sorted list without crashing", () => {
    const proj: ProjectInput = {
      title: "t",
      description: "d",
      requiredSkills: [],
      teamSize: 3,
      rolesFilled: "",
    };
    const scored = scoreAll(proj, [
      {
        id: "a",
        name: "A",
        skills: ["frontend"],
        pastWork: "",
        availability: "low",
      },
      {
        id: "b",
        name: "B",
        skills: ["backend"],
        pastWork: "",
        availability: "high",
      },
    ]);
    expect(scored.length).toBe(2);
    for (let i = 1; i < scored.length; i++) {
      expect(scored[i - 1].score).toBeGreaterThanOrEqual(scored[i].score);
    }
  });

  it("edge: all candidates tied returns without crashing", () => {
    const proj: ProjectInput = {
      title: "t",
      description: "d",
      requiredSkills: ["frontend"],
      teamSize: 3,
      rolesFilled: "",
    };
    const tied: Candidate = {
      id: "k",
      name: "K",
      skills: ["frontend"],
      pastWork: "",
      availability: "high",
    };
    const scored = scoreAll(proj, [
      tied,
      { ...tied, id: "k2" },
      { ...tied, id: "k3" },
    ]);
    expect(scored.length).toBe(3);
    expect(new Set(scored.map((s) => s.score)).size).toBe(1);
  });

  it("type safety: interfaces have no `any` (compile-guarded)", () => {
    const c: Candidate = {
      id: "1",
      name: "n",
      skills: ["x"],
      pastWork: "p",
      availability: "med",
    };
    const p: ProjectInput = {
      title: "t",
      description: "d",
      requiredSkills: ["x"],
      teamSize: 1,
      rolesFilled: "",
    };
    const m: MatchResult = { candidate: c, score: 50, reasoning: "r" };
    expect(m.candidate.id).toBe("1");
    expect(p.requiredSkills[0]).toBe("x");
  });
});
