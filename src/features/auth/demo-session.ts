// ⚠️ MOCK AUTHENTICATION FOR THE FRONTEND DEMO ONLY. NOT SECURE.
//
// This file pretends to "sign in" by remembering which demo account is
// active. It exists only so the buyer, creator and admin screens can be
// demonstrated locally. It is NOT authentication and NOT authorization:
// anyone can change sessionStorage in their browser and become any role.
//
// What it stores: only { userId, role } in sessionStorage (cleared when the
// tab closes). It never stores names, emails or passwords.
//
// BEFORE A REAL LAUNCH: replace this whole file with server-verified sessions
// (e.g. Supabase Auth with HTTP-only cookies), and enforce every permission
// on the server. Client-side checks only change what the UI shows.

import type { DemoUser, Role } from "@/types";
import { demoUsers } from "@/features/demo/demo-data";

const STORAGE_KEY = "hunarco-demo-session";

export type DemoSession = { userId: string; role: Role };

// `undefined` means "not read yet". `null` means "signed out".
let cachedSession: DemoSession | null | undefined;

// A name typed during demo sign-up. Kept in memory only (never stored),
// so it disappears on page reload.
let signupDisplayName: string | null = null;

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

export function findDemoUser(userId: string): DemoUser | undefined {
  return demoUsers.find((user) => user.id === userId);
}

export function findDemoUserByEmail(email: string): DemoUser | undefined {
  const normalised = email.trim().toLowerCase();
  return demoUsers.find((user) => user.email === normalised);
}

function readFromStorage(): DemoSession | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<DemoSession>;
    // Only accept sessions that point at a known demo user with the same role.
    const user = parsed.userId ? findDemoUser(parsed.userId) : undefined;
    if (!user || user.role !== parsed.role) return null;
    return { userId: user.id, role: user.role };
  } catch {
    return null;
  }
}

// --- Functions used by React's useSyncExternalStore (see use-demo-auth.ts) ---

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSessionSnapshot(): DemoSession | null {
  if (cachedSession === undefined) cachedSession = readFromStorage();
  return cachedSession;
}

/** On the server there is no browser storage, so the session is unknown. */
export function getServerSessionSnapshot(): DemoSession | null | undefined {
  return undefined;
}

export function getSignupDisplayName() {
  return signupDisplayName;
}

// --- Actions ---

export function startDemoSession(user: DemoUser, displayName?: string) {
  const session: DemoSession = { userId: user.id, role: user.role };
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  signupDisplayName = displayName?.trim() || null;
  cachedSession = session;
  notify();
}

export function endDemoSession() {
  window.sessionStorage.removeItem(STORAGE_KEY);
  signupDisplayName = null;
  cachedSession = null;
  notify();
}

// --- Where each role lands after signing in ---

export const dashboardPaths: Record<Role, string> = {
  buyer: "/buyer/dashboard",
  creator: "/creator/dashboard",
  admin: "/admin/dashboard",
};

/** The URL prefix each role is allowed to open in the demo */
const areaPrefixes: Record<Role, string> = {
  buyer: "/buyer",
  creator: "/creator",
  admin: "/admin",
};

/**
 * Where to send someone after demo sign-in. Uses `next` only if it is a
 * safe in-site path (not "//evil.example") inside that role's own area.
 */
export function landingPathFor(role: Role, next?: string | null) {
  const isSafeLocalPath = !!next && next.startsWith("/") && !next.startsWith("//");
  if (isSafeLocalPath && next.startsWith(areaPrefixes[role])) return next;
  return dashboardPaths[role];
}
