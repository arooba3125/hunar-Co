import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ApplicationForm } from "@/features/creators/application-form";

export const metadata: Metadata = {
  title: "Join as a creator",
  description:
    "Pakistani fashion designers, artists, and craftspeople can apply to show their original work on HunarCo.",
};

const whoCanApply = [
  {
    title: "Fashion designers",
    body: "Clothing, accessories and textiles you have designed yourself.",
  },
  {
    title: "Artists",
    body: "Paintings, prints, illustration, calligraphy and other original artwork.",
  },
  {
    title: "Craftspeople",
    body: "Handmade work such as ceramics, woodwork, block printing and embroidery.",
  },
];

const reviewSteps = [
  {
    title: "You apply",
    body: "Tell us about your work and share a link where we can see it.",
  },
  {
    title: "We look at your portfolio",
    body: "We check that the work is original, made by you, and a good fit for HunarCo buyers.",
  },
  {
    title: "We get in touch",
    body: "We email you with a decision. If it's a yes, we explain the next steps and answer your questions.",
  },
  {
    title: "You prepare a listing",
    body: "Together we set a price and an interest target for your first design.",
  },
];

export default function JoinAsCreatorPage() {
  return (
    <>
      {/* Intro */}
      <section className="border-b border-line bg-sand">
        <Container className="py-14 md:py-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            Join as a creator
          </p>
          <h1 className="max-w-4xl text-display font-medium">
            Your work, in front of the people who want it
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            HunarCo is for Pakistani creators who make original work. List your
            designs, let buyers register interest, and find out what people want
            before you invest in making it.
          </p>
        </Container>
      </section>

      {/* Who can apply */}
      <section className="py-section" aria-labelledby="who-can-apply">
        <Container>
          <h2 id="who-can-apply" className="text-title font-medium">
            Who can apply
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-muted">
            Independent creators based in Pakistan whose work is their own original
            design. You don&rsquo;t need a shop, a studio, or a large following.
          </p>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {whoCanApply.map((item) => (
              <li key={item.title} className="rounded-card border border-line bg-surface p-7">
                <h3 className="text-xl font-medium">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Review process */}
      <section className="bg-sand py-section" aria-labelledby="review-process">
        <Container>
          <SectionHeading
            eyebrow="How we review"
            title="What happens after you apply"
            description="A short overview of the planned review process. Details may change as HunarCo develops."
          />
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reviewSteps.map((step, index) => (
              <li key={step.title} className="rounded-card border border-line bg-surface p-6">
                <span className="font-display text-3xl text-brand">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-medium">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Application form */}
      <section className="py-section" aria-labelledby="apply-form-heading" id="apply">
        <Container className="grid gap-12 lg:grid-cols-[1fr_minmax(0,40rem)] lg:gap-16">
          <div>
            <h2 id="apply-form-heading" className="text-title font-medium">
              Apply to join
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              It takes about five minutes. All fields are required.
            </p>
            <div className="mt-8 rounded-card border border-line bg-surface p-6 text-sm leading-relaxed">
              <h3 className="font-sans text-sm font-semibold">What we won&rsquo;t ask for</h3>
              <p className="mt-2 text-muted">
                This form never asks for identity documents, bank or payment
                details, phone numbers, or your home address. If anyone claiming
                to be HunarCo asks for these, please don&rsquo;t share them.
              </p>
            </div>
          </div>

          <div className="rounded-card border border-line bg-surface/60 p-6 sm:p-8">
            <ApplicationForm />
          </div>
        </Container>
      </section>
    </>
  );
}
