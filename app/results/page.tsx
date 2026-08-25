"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadPayload, clearPayload } from "@/lib/store";
import type { MatchPayload } from "@/lib/types";
import Spinner from "@/components/Spinner";
import type { MatchResult } from "@/lib/types";

// Visual-only, made-up per-candidate extras (no real data behind these).
const CANDIDATE_EXTRA: Record<
  string,
  { rating: number; projects: number; phone: string }
> = {
  c1: { rating: 4.3, projects: 23, phone: "+1 (555) 014-2380" },
  c2: { rating: 3.6, projects: 17, phone: "+1 (555) 016-7742" },
  c3: { rating: 4.9, projects: 31, phone: "+1 (555) 019-3155" },
  c4: { rating: 3.1, projects: 14, phone: "+1 (555) 013-0912" },
  c5: { rating: 2.7, projects: 9, phone: "+1 (555) 012-6640" },
  c6: { rating: 4.5, projects: 19, phone: "+1 (555) 017-5561" },
  c7: { rating: 3.8, projects: 12, phone: "+1 (555) 011-3084" },
  c8: { rating: 4.1, projects: 27, phone: "+1 (555) 018-9923" },
  c9: { rating: 2.9, projects: 8, phone: "+1 (555) 010-4771" },
  c10: { rating: 4.6, projects: 15, phone: "+1 (555) 015-1206" },
  c11: { rating: 4.8, projects: 29, phone: "+1 (555) 019-8830" },
  c12: { rating: 3.4, projects: 18, phone: "+1 (555) 017-2419" },
  c13: { rating: 2.5, projects: 7, phone: "+1 (555) 010-6352" },
  c14: { rating: 4.0, projects: 22, phone: "+1 (555) 018-7745" },
  c15: { rating: 3.7, projects: 13, phone: "+1 (555) 014-9038" },
};

function Star({ fill }: { fill: number }) {
  return (
    <span className="relative inline-block w-4 h-4 text-[15px] leading-none text-ink-soft">
      <span className="absolute inset-0">☆</span>
      {fill > 0 && (
        <span
          className="absolute inset-0 overflow-hidden text-ink"
          style={{ width: `${fill * 100}%` }}
        >
          ★
        </span>
      )}
    </span>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span
      className="inline-flex items-center gap-0.5"
      aria-label={`${rating} out of 5`}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} fill={Math.max(0, Math.min(1, rating - i))} />
      ))}
    </span>
  );
}

export default function ResultsPage() {
  const router = useRouter();
  const [payload, setPayload] = useState<MatchPayload | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const data = loadPayload();
    if (!data) {
      router.replace("/match");
      return;
    }
    setPayload(data);
    setReady(true);
  }, [router]);

  if (!ready || !payload) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-bg">
        <p className="text-white text-[15px] inline-flex items-center gap-2">
          <Spinner /> Loading results…
        </p>
      </main>
    );
  }

  const { project, results } = payload;

  return (
    <main className="min-h-screen bg-bg px-4 py-12">
      <div className="mx-auto max-w-[900px] flex flex-col gap-6">
        <button
          onClick={() => {
            clearPayload();
            router.push("/match");
          }}
          className="self-start text-white text-[13px] font-semibold uppercase tracking-wide hover:opacity-80"
        >
          ← New search
        </button>

        <section className="bg-surface rounded-card shadow-soft p-6">
          <h1 className="font-display font-extrabold text-[30px] text-ink">
            {project.title}
          </h1>
          <p className="text-ink-soft text-[14px] mt-1 mb-4">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.requiredSkills.map((skill) => (
              <span
                key={skill}
                className="bg-surface border-line rounded-input px-2 py-1 text-[12px] font-semibold uppercase text-ink"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <div className="flex flex-col gap-4">
          {results.map((result, i) => (
            <CandidateCard
              key={result.candidate.id}
              result={result}
              isTop={i === 0}
              index={i}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

function scoreColor(score: number): string {
  if (score >= 70) return "var(--brand)";
  if (score < 45) return "var(--warn)";
  return "var(--ink)";
}

function CandidateCard({
  result,
  isTop,
  index,
}: {
  result: MatchResult;
  isTop: boolean;
  index: number;
}) {
  const { candidate, score, reasoning } = result;
  const [open, setOpen] = useState(false);
  const extra =
    CANDIDATE_EXTRA[candidate.id] ?? {
      rating: 4.5,
      projects: 10,
      phone: "+1 (555) 010-0000",
    };
  const handle = candidate.name.toLowerCase().replace(/[^a-z]/g, "");
  const linkedin = `https://linkedin.com/in/${handle}`;
  const github = `https://github.com/${handle}`;

  return (
    <article
      className={
        isTop
          ? "bg-surface rounded-card shadow-soft p-5 animate-rise border-l-4 border-accent"
          : "bg-surface rounded-card shadow-soft p-5 animate-rise"
      }
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-display font-extrabold text-[18px] text-ink">
              {candidate.name}
            </h2>
            {isTop && (
              <span className="bg-accent text-ink font-display font-extrabold text-[11px] uppercase tracking-wide rounded-input px-2 py-1">
                Top match
              </span>
            )}
          </div>
          <p className="text-ink-soft text-[13px] mt-1">{candidate.pastWork}</p>
          <div className="flex items-center gap-2 mt-2">
            <Stars rating={extra.rating} />
            <span className="text-ink-soft text-[12px]">
              Worked on {extra.projects} successful projects.
            </span>
          </div>
        </div>
        <div
          className="font-display font-extrabold text-[28px] leading-none"
          style={{ color: scoreColor(score) }}
        >
          {score}
          <span className="text-[13px] text-ink-soft font-body font-medium">
            /100
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {candidate.skills.map((skill) => (
          <span
            key={skill}
                className="bg-surface border-line rounded-input px-2 py-1 text-[12px] font-semibold uppercase text-ink"
          >
            {skill}
          </span>
        ))}
      </div>

      {reasoning && (
          <p className="mt-3 text-[14px] text-ink border-t border-line pt-3">
          {reasoning}
        </p>
      )}

      <div className="mt-4">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="bg-surface text-ink font-display font-extrabold text-[13px] uppercase tracking-wide rounded-input px-4 py-2 border-line shadow-soft transition-transform hover:-translate-y-0.5 active:translate-y-0"
        >
          {open ? "Hide contact" : "Contact"}
        </button>
        {open && (
          <div className="mt-3 bg-surface-2 border-line rounded-input p-3 text-[13px] flex flex-col gap-2">
            <div className="flex gap-3">
              <span className="w-20 shrink-0 text-ink-soft font-semibold uppercase text-[11px] pt-0.5">
                LinkedIn
              </span>
              <a
                className="text-ink underline break-all"
                href={linkedin}
                target="_blank"
                rel="noreferrer"
              >
                {linkedin}
              </a>
            </div>
            <div className="flex gap-3">
              <span className="w-20 shrink-0 text-ink-soft font-semibold uppercase text-[11px] pt-0.5">
                GitHub
              </span>
              <a
                className="text-ink underline break-all"
                href={github}
                target="_blank"
                rel="noreferrer"
              >
                {github}
              </a>
            </div>
            <div className="flex gap-3">
              <span className="w-20 shrink-0 text-ink-soft font-semibold uppercase text-[11px] pt-0.5">
                Phone
              </span>
              <span className="text-ink">{extra.phone}</span>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
