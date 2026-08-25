const ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";

interface ExplanationArgs {
  requiredSkills: string[];
  rolesFilled: string;
  candidate: {
    name: string;
    skills: string[];
    pastWork: string;
  };
  score: number;
}

const FALLBACK = "Explanation unavailable — showing score only";

export async function explainCandidate(
  args: ExplanationArgs,
  apiKey: string,
  model: string
): Promise<string> {
  if (!apiKey) return FALLBACK;

  const prompt = [
    "You help a project owner decide which teammate to add.",
    "Given the project's required skills and the roles already filled, write a concise 1-2 sentence explanation of why this candidate fits.",
    "Specifically name the gap they fill if their skill area is not yet covered.",
    "",
    `Project required skills: ${args.requiredSkills.join(", ") || "none"}`,
    `Roles already filled: ${args.rolesFilled || "none"}`,
    `Candidate: ${args.candidate.name}`,
    `Candidate skills: ${args.candidate.skills.join(", ")}`,
    `Candidate past work: ${args.candidate.pastWork}`,
    `Computed match score (0-100): ${args.score}`,
    "",
    "Reply with only the 1-2 sentence explanation, no preamble or quotes.",
  ].join("\n");

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer":
          process.env.OPENROUTER_SITE_URL || "http://localhost:3000",
        "X-Title": process.env.OPENROUTER_APP_NAME || "ProjectMatch",
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.4,
        max_tokens: 120,
      }),
    });

    if (!res.ok) return FALLBACK;

    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = data.choices?.[0]?.message?.content?.trim();
    return text || FALLBACK;
  } catch {
    return FALLBACK;
  }
}
