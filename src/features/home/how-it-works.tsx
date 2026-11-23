import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const steps = [
  {
    title: "Creators share original work",
    body: "Designers, artists, and craftspeople publish their designs with the story behind them and an interest goal.",
  },
  {
    title: "Buyers register interest",
    body: "Browse by creator or craft and register interest in the pieces you would like to own. It is not a purchase.",
  },
  {
    title: "Goals unlock production",
    body: "When a design reaches its interest goal, HunarCo may work with the creator to coordinate a production run.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-sand py-section">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="Interest first, then production"
          description="HunarCo lets demand show up before anything is made, so creators can focus on the work people actually want."
        />

        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="rounded-card border border-line bg-surface p-7"
            >
              <span className="font-display text-4xl text-brand">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-xl font-medium">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
