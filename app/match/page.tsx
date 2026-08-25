"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { runMatchAction } from "../actions";
import { savePayload } from "@/lib/store";
import type { ProjectInput } from "@/lib/types";
import TagInput from "@/components/TagInput";
import Spinner from "@/components/Spinner";

export default function FormPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requiredSkills, setRequiredSkills] = useState<string[]>([]);
  const [teamSize, setTeamSize] = useState("3");
  const [rolesFilled, setRolesFilled] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function validate(): string | null {
    if (!title.trim()) return "Project title is required.";
    if (!description.trim()) return "Project description is required.";
    if (requiredSkills.length === 0)
      return "Add at least one required skill.";
    const size = Number(teamSize);
    if (!Number.isFinite(size) || size < 1)
      return "Team size must be at least 1.";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const project: ProjectInput = {
        title: title.trim(),
        description: description.trim(),
        requiredSkills,
        teamSize: Number(teamSize),
        rolesFilled: rolesFilled.trim(),
      };
      const results = await runMatchAction(project);
      savePayload({ project, results });
      router.push("/results");
    } catch {
      setError("Something went wrong while matching. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[560px] bg-surface rounded-card border-2 border-white shadow-hard p-8">
        <h1 className="font-display font-extrabold text-[32px] leading-tight text-ink">
          Describe your project.
        </h1>
        <p className="text-ink-soft text-[15px] mt-2 mb-6">
          Tell us what you&apos;re building and we&apos;ll rank teammates who fill
          the gaps your team actually has.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <Field label="Project title">
            <input
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Budgeting app for freelancers"
            />
          </Field>

          <Field label="Description">
            <textarea
              className="input min-h-[88px] resize-y"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What are you building, and what's the goal?"
            />
          </Field>

          <Field label="Required skills">
            <TagInput
              values={requiredSkills}
              onChange={setRequiredSkills}
              placeholder="Type a skill, press Enter"
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Team size">
              <input
                type="number"
                min={1}
                className="input"
                value={teamSize}
                onChange={(e) => setTeamSize(e.target.value)}
              />
            </Field>
            <Field label="Roles already filled">
              <input
                className="input"
                value={rolesFilled}
                onChange={(e) => setRolesFilled(e.target.value)}
                placeholder="e.g. 2 frontend, 1 design"
              />
            </Field>
          </div>

          {error && (
            <p className="text-warn text-[13px] font-semibold">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full bg-accent text-ink font-display font-extrabold text-[16px] rounded-input py-3 border-2 border-ink shadow-hard transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:translate-y-0"
          >
            {loading ? (
              <span className="inline-flex items-center justify-center gap-2">
                <Spinner />
                Matching teammates…
              </span>
            ) : (
              "Find my team"
            )}
          </button>
        </form>
      </div>

      <style jsx>{`
        :global(.input) {
          width: 100%;
          background: var(--surface);
          border: 2px solid var(--ink);
          border-radius: 8px;
          padding: 10px 12px;
          font-size: 14px;
          color: var(--ink);
          outline: none;
          transition: box-shadow 0.15s;
        }
        :global(.input:focus) {
          box-shadow: 0 0 0 3px rgba(123, 92, 240, 0.25);
        }
      `}</style>
    </main>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block font-body font-semibold text-[12px] uppercase tracking-wide text-ink-soft mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}
