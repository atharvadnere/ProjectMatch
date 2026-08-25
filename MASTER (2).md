# MASTER.md — ProjectMatch

## What this is
A tool that helps a project owner find the right teammates — not just skilled
people, but people who fill the gaps their team actually has. Think: LinkedIn
finds you experienced people; ProjectMatch finds you the *missing piece*.

## Core flow (one screen → one screen, nothing else)
1. User fills a form describing their project
2. App scores a seeded list of candidates against that project
3. Top candidates get a short AI-written explanation of why they fit
4. Results page shows ranked candidates with scores + explanations

No auth. No database. No persistence. No live team-building interactivity.
One form, one results page. That's the whole app.

## Data shapes

```ts
type Availability = "low" | "med" | "high";

interface Candidate {
  id: string;
  name: string;
  skills: string[];
  pastWork: string;        // one-line blurb
  availability: Availability;
}

interface ProjectInput {
  title: string;
  description: string;
  requiredSkills: string[];
  teamSize: number;
  rolesFilled: string;     // free text, e.g. "2 frontend, 1 design"
}

interface MatchResult {
  candidate: Candidate;
  score: number;           // 0-100, own logic, not AI
  reasoning: string;       // 1-2 sentence AI text
}
```

## Seed data
- `data/candidates.json` — 12-15 hardcoded candidates, varied skills
  (frontend, backend, design, data, devops, mobile, etc.)

## Logic (plain code, no AI)
- **Scoring function**: given a `ProjectInput` and the candidate list, return
  each candidate with a 0-100 score.
  - Primary weight: overlap between candidate.skills and requiredSkills
  - Reduce score if candidate's main skill area is already covered per
    rolesFilled (gap-awareness — this is the product's core idea)
  - Sort descending, return all scored

## AI integration (the explanation layer)
- After scoring, take the top 4 candidates
- One API call per candidate to the configured model, via a server-side route
  (never expose the API key client-side)
- Prompt contains: requiredSkills, rolesFilled, candidate.skills,
  candidate.pastWork, and the computed score
- Ask for a 1-2 sentence explanation of fit, specifically naming the gap
  being filled if relevant
- On failure: fallback text "Explanation unavailable — showing score only",
  never crash

## Screens

**Form (`/`)**
Fields: Title, Description, Required Skills (tags), Team Size (number),
Roles Already Filled (tags/text). Submit → validates required fields →
runs scoring → calls AI for top 4 → navigates to results.

**Results (`/results`)**
Project summary at top (title + required skills). Ranked list of candidate
cards below: score, name, skills, past work, AI reasoning. Top match
visually distinguished from the rest.

## States to handle
- Loading state while AI calls run (don't let the UI look frozen)
- Error fallback per-candidate if an AI call fails (don't crash the page)
- Basic validation — can't submit with empty required fields

## Explicitly out of scope
- User accounts / registration
- Live add/remove-to-team state
- Multiple saved projects
- Reverse flow (candidate searches for projects)
- Explanations for non-top candidates

## Build order
1. Data model + seed candidates.json
2. Scoring function (test with dummy project input, no UI needed yet)
3. AI route/function (test in isolation, confirm real response)
4. Wire form → scoring → AI → results (unstyled is fine first)
5. Apply DESIGN.md on top, screen by screen
