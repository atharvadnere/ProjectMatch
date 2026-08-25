import Link from "next/link";

const STEPS = [
  {
    n: "01",
    title: "Describe your project",
    body: "Tell us your title, what you're building, the skills you need, your team size, and the roles you've already filled. No accounts, no setup.",
  },
  {
    n: "02",
    title: "We score the gap",
    body: "Plain scoring (no AI) ranks candidates by skill overlap with your needs, then rewards the areas your team is missing and penalizes the ones you've already covered.",
  },
  {
    n: "03",
    title: "AI explains the fit",
    body: "Your top four matches get a short, human-written explanation of why they fit — naming the specific gap each one fills on your team.",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[760px] flex flex-col gap-6">
        <section className="bg-surface rounded-card shadow-soft p-8 text-center animate-rise">
          <span className="inline-block bg-accent text-ink font-display font-extrabold text-[12px] uppercase tracking-wide rounded-input px-3 py-1 border-2 border-ink">
            How it works
          </span>
          <h1 className="font-display font-extrabold text-[36px] leading-tight text-ink mt-5">
            From project to missing piece.
          </h1>
          <p className="text-ink-soft text-[15px] mt-3 max-w-[560px] mx-auto">
            Three steps. No logins, no dashboards — just the teammate your team
            actually needs.
          </p>
        </section>

        <div className="flex flex-col gap-4">
          {STEPS.map((step, i) => (
            <article
              key={step.n}
              className="bg-surface rounded-card shadow-soft p-6 flex flex-col sm:flex-row gap-4 items-start animate-rise"
              style={{ animationDelay: `${(i + 1) * 80}ms` }}
            >
              <span className="font-display font-extrabold text-[40px] leading-none text-ink">
                {step.n}
              </span>
              <div>
                <h2 className="font-display font-extrabold text-[20px] text-ink">
                  {step.title}
                </h2>
                <p className="text-ink-soft text-[14px] mt-1">{step.body}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/match"
            className="inline-block bg-accent text-ink font-display font-extrabold text-[16px] rounded-input px-8 py-3 shadow-soft transition-transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Find your team
          </Link>
        </div>
      </div>
    </main>
  );
}
