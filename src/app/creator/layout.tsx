import { RoleGate } from "@/features/auth/role-gate";
import { accountLinks } from "@/features/auth/account-links";
import { CreatorDemoProvider } from "@/features/dashboard/creator-demo-context";
import { SectionNav } from "@/features/dashboard/section-nav";

// Every page under /creator is shown only to the demo Creator role.
// ⚠️ Demo only: real access control must happen on the server.
export default function CreatorLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGate role="creator">
      <CreatorDemoProvider>
        <SectionNav label="Creator area" links={accountLinks.creator} />
        {children}
      </CreatorDemoProvider>
    </RoleGate>
  );
}
