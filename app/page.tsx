import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12 gap-8">
      <div className="text-center max-w-[900px] animate-rise">
        <h1 className="font-display font-extrabold text-[60px] sm:text-[88px] leading-[1.02] text-ink inline-block bg-accent px-3 py-1">
          ProjectMatch
        </h1>
        <p className="font-display font-extrabold text-[24px] sm:text-[34px] leading-tight text-white mt-5">
          Find the missing piece of your team.
        </p>
      </div>

      <div className="w-full max-w-[560px] bg-surface rounded-card border-2 border-white shadow-hard p-8 text-center animate-rise">
        <p className="text-ink-soft text-[16px]">
          ProjectMatch ranks teammates who fill the gaps your team actually has —
          not just the most experienced people.
        </p>

        <Link
          href="/match"
          className="mt-8 inline-block bg-accent text-ink font-display font-extrabold text-[16px] rounded-input px-8 py-3 border-2 border-ink shadow-hard transition-transform hover:-translate-y-0.5 active:translate-y-0"
        >
          Find your team
        </Link>

        <div className="mt-6">
          <Link
            href="/how-it-works"
            className="text-white font-semibold text-[13px] uppercase tracking-wide hover:text-ink-soft transition-colors"
          >
            See how it works →
          </Link>
        </div>
      </div>
    </main>
  );
}
