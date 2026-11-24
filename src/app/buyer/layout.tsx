import { RoleGate } from "@/features/auth/role-gate";

// Every page under /buyer is shown only to the demo Buyer role.
// ⚠️ Demo only: real access control must happen on the server.
export default function BuyerLayout({ children }: { children: React.ReactNode }) {
  return <RoleGate role="buyer">{children}</RoleGate>;
}
