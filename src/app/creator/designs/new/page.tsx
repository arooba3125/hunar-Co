import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { DashboardIntro, DemoDataNotice } from "@/features/dashboard/dashboard-ui";
import { NewDesignForm } from "@/features/dashboard/new-design-form";

// Shown only after the browser reads the demo session (see RoleGate), so it
// can't be prerendered as an instant page. Opts out of that dev-only check.
export const instant = false;

export const metadata: Metadata = { title: "Submit a design" };

export default function NewDesignPage() {
  return (
    <>
      <DashboardIntro eyebrow="Creator area" title="Submit a new design">
        Tell us about the design you&rsquo;d like to launch. HunarCo reviews each submission before
        it goes live on Discover.
      </DashboardIntro>
      <Container className="space-y-8 py-10 md:py-12">
        <DemoDataNotice>
          Submitting is simulated. Your design and image are not uploaded, sent to HunarCo, or
          published.
        </DemoDataNotice>
        <NewDesignForm />
      </Container>
    </>
  );
}
