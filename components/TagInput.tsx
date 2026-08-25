"use client";

import { useState, type KeyboardEvent } from "react";

interface TagInputProps {
  values: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}

export default function TagInput({
  values,
  onChange,
  placeholder,
}: TagInputProps) {
  const [draft, setDraft] = useState("");

  function addTag() {
    const value = draft.trim().toLowerCase();
    if (!value) return;
    if (!values.includes(value)) {
      onChange([...values, value]);
    }
    setDraft("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && !draft && values.length) {
      onChange(values.slice(0, -1));
    }
  }

  function remove(value: string) {
    onChange(values.filter((v) => v !== value));
  }

  return (
    <div className="flex flex-wrap gap-2 bg-surface border-2 border-ink rounded-input p-2 focus-within:shadow-[0_0_0_3px_rgba(123,92,240,0.25)]">
      {values.map((value) => (
        <span
          key={value}
          className="flex items-center gap-1 bg-surface border-2 border-ink rounded-input px-2 py-1 text-[12px] font-semibold uppercase text-ink"
        >
          {value}
          <button
            type="button"
            onClick={() => remove(value)}
            aria-label={`Remove ${value}`}
            className="text-ink-soft hover:text-warn leading-none font-bold"
          >
            ×
          </button>
        </span>
      ))}
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={addTag}
        placeholder={values.length ? "" : placeholder}
        className="flex-1 min-w-[120px] bg-transparent outline-none text-[14px] text-ink placeholder:text-ink-soft"
      />
    </div>
  );
}
