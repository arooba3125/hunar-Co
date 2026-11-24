"use client";

// React hook for reading the mock demo session. See demo-session.ts for the
// important warning: this is a UI demonstration, not real authentication.

import { useSyncExternalStore } from "react";
import type { DemoUser } from "@/types";
import {
  endDemoSession,
  findDemoUser,
  getServerSessionSnapshot,
  getSessionSnapshot,
  getSignupDisplayName,
  startDemoSession,
  subscribe,
} from "./demo-session";

export type DemoAuth =
  | { status: "loading"; user: null }
  | { status: "signed-out"; user: null }
  | { status: "signed-in"; user: DemoUser; displayName: string };

export function useDemoAuth(): DemoAuth & {
  signIn: typeof startDemoSession;
  signOut: typeof endDemoSession;
} {
  // Re-renders automatically whenever the demo session starts or ends.
  const session = useSyncExternalStore(subscribe, getSessionSnapshot, getServerSessionSnapshot);
  const actions = { signIn: startDemoSession, signOut: endDemoSession };

  // undefined = still reading the browser's storage (e.g. first render).
  if (session === undefined) return { status: "loading", user: null, ...actions };

  const user = session ? findDemoUser(session.userId) : undefined;
  if (!user) return { status: "signed-out", user: null, ...actions };

  return {
    status: "signed-in",
    user,
    displayName: getSignupDisplayName() ?? user.name,
    ...actions,
  };
}
