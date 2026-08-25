import type { MatchPayload } from "./types";

const KEY = "projectmatch:payload";

export function savePayload(payload: MatchPayload): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(KEY, JSON.stringify(payload));
}

export function loadPayload(): MatchPayload | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as MatchPayload;
  } catch {
    return null;
  }
}

export function clearPayload(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(KEY);
}
