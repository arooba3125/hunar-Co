"use client";

// Shows its children only when the demo session has the right role.
//
// ⚠️ DEMONSTRATION ONLY. This is a client-side check, so it only decides what
// the browser displays. It does NOT protect any data: anything shipped to the
// browser can be read by the visitor. In production, every buyer, creator and
// admin page and action must be authorized on a trusted server (for example
// in middleware/proxy, server components and API routes, backed by database
// rules), and the server must never send data the user isn't allowed to see.

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Role } from "@/types";
import { Container } from "@/components/ui/container";
import { AccessDenied } from "./access-denied";
import { useDemoAuth } from "./use-demo-auth";

type RoleGateProps = {
  role: Role;
  children: React.ReactNode;
};

export function RoleGate({ role, children }: RoleGateProps) {
  const auth = useDemoAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Logged-out visitors are sent to /login, which brings them back afterwards.
  useEffect(() => {
    if (auth.status === "signed-out") {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [auth.status, pathname, router]);

  if (auth.status !== "signed-in") {
    return (
      <Container className="py-section">
        <p role="status" className="text-center text-muted">
          {auth.status === "loading" ? "Checking your demo session…" : "Redirecting to log in…"}
        </p>
      </Container>
    );
  }

  if (auth.user.role !== role) {
    return <AccessDenied currentRole={auth.user.role} requiredRole={role} />;
  }

  return <>{children}</>;
}
