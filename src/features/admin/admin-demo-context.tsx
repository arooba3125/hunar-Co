"use client";

// Shared demo state for the admin panel (/admin/...).
// It lives in the /admin layout so changes carry across admin pages while
// you click around. NOTHING is saved to a server: reloading the page resets
// everything. A real admin panel would call server endpoints that check the
// user is an admin before changing any data.

import { createContext, useContext, useState } from "react";
import type {
  ApplicationStatus,
  CreatorApplication,
  DemoUser,
  DesignSubmission,
  LaunchStatus,
  ReviewStatus,
} from "@/types";
import {
  defaultDemoSettings,
  demoApplications,
  demoSubmissions,
  demoUsers,
  type DemoSettings,
} from "@/features/demo/demo-data";
import { sampleProducts } from "@/features/products/sample-data";

type AdminDemoState = {
  users: DemoUser[];
  applications: CreatorApplication[];
  submissions: DesignSubmission[];
  /** Current launch status per product id (starts from the sample data) */
  launchStatuses: Record<string, LaunchStatus>;
  settings: DemoSettings;
  setApplicationStatus: (id: string, status: ApplicationStatus) => void;
  setReviewStatus: (id: string, status: ReviewStatus, note?: string) => void;
  setLaunchStatus: (productId: string, status: LaunchStatus) => void;
  saveSettings: (settings: DemoSettings) => void;
};

const AdminDemoContext = createContext<AdminDemoState | null>(null);

export function AdminDemoProvider({ children }: { children: React.ReactNode }) {
  const [applications, setApplications] = useState(demoApplications);
  const [submissions, setSubmissions] = useState(demoSubmissions);
  const [launchStatuses, setLaunchStatuses] = useState<Record<string, LaunchStatus>>(() =>
    Object.fromEntries(sampleProducts.map((product) => [product.id, product.status])),
  );
  const [settings, setSettings] = useState<DemoSettings>(defaultDemoSettings);

  const value: AdminDemoState = {
    users: demoUsers,
    applications,
    submissions,
    launchStatuses,
    settings,
    setApplicationStatus: (id, status) =>
      setApplications((list) => list.map((item) => (item.id === id ? { ...item, status } : item))),
    setReviewStatus: (id, status, note) =>
      setSubmissions((list) =>
        list.map((item) =>
          item.id === id ? { ...item, reviewStatus: status, reviewNote: note || item.reviewNote } : item,
        ),
      ),
    setLaunchStatus: (productId, status) =>
      setLaunchStatuses((map) => ({ ...map, [productId]: status })),
    saveSettings: setSettings,
  };

  return <AdminDemoContext.Provider value={value}>{children}</AdminDemoContext.Provider>;
}

export function useAdminDemo() {
  const value = useContext(AdminDemoContext);
  if (!value) throw new Error("useAdminDemo must be used inside AdminDemoProvider");
  return value;
}
