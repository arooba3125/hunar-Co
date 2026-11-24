"use client";

// Buyer dashboard. Shows the designs the demo buyer registered interest in.
// Data comes from demo-data.ts; profile edits live in component state only.

import { useState } from "react";
import Link from "next/link";
import type { LaunchStatus } from "@/types";
import { ButtonLink, buttonClasses } from "@/components/ui/button";
import { CheckboxField, FormAlert, TextField } from "@/components/ui/form-fields";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { formatDate, formatPrice } from "@/lib/format";
import { useDemoAuth } from "@/features/auth/use-demo-auth";
import { demoBuyerInterests } from "@/features/demo/demo-data";
import { InterestProgress } from "@/features/products/interest-progress";
import { getCreatorById, sampleProducts } from "@/features/products/sample-data";
import { StatusBadge } from "@/features/products/status-badge";
import { DashboardIntro, DemoDataNotice, EmptyState, Panel, StatCard } from "./dashboard-ui";
import { Container } from "@/components/ui/container";

// What each launch status means for the buyer.
const statusNotes: Record<LaunchStatus, string> = {
  open: "Still collecting interest.",
  "closing-soon": "Closing soon. Share it if you'd like it to reach its target.",
  "target-reached": "Target reached. HunarCo may contact you about production.",
  closed: "Closed without reaching its target. Nothing is owed.",
};

export function BuyerDashboard() {
  const auth = useDemoAuth();
  if (auth.status !== "signed-in") return null; // RoleGate handles this case

  const interests = (demoBuyerInterests[auth.user.id] ?? [])
    .map((interest) => ({
      ...interest,
      product: sampleProducts.find((product) => product.id === interest.productId),
    }))
    .filter((item) => item.product !== undefined);

  const activeCount = interests.filter(
    (item) => item.product?.status === "open" || item.product?.status === "closing-soon",
  ).length;
  const reachedCount = interests.filter((item) => item.product?.status === "target-reached").length;

  return (
    <>
      <DashboardIntro
        eyebrow="Buyer dashboard"
        title={`Welcome, ${auth.displayName}`}
        actions={<ButtonLink href="/discover">Discover designs</ButtonLink>}
      >
        Keep track of the designs you&rsquo;ve registered interest in and see how close each one is
        to its target.
      </DashboardIntro>

      <Container className="space-y-8 py-10 md:py-12">
        <DemoDataNotice>
          This dashboard uses fictional sample data. Nothing you change here is saved.
        </DemoDataNotice>

        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard label="Designs you follow" value={interests.length} />
          <StatCard label="Still collecting interest" value={activeCount} />
          <StatCard label="Reached their target" value={reachedCount} />
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-start">
          <Panel
            id="interests"
            title="Your registered interests"
            description="Sample interests for this demo account."
          >
            {interests.length === 0 ? (
              <EmptyState
                title="You haven't registered interest yet"
                action={<ButtonLink href="/discover">Browse designs</ButtonLink>}
              >
                Find a design you love and press &ldquo;Register interest&rdquo;. It will appear
                here so you can follow its progress.
              </EmptyState>
            ) : (
              <ul className="divide-y divide-line">
                {interests.map(({ product, quantity, registeredOn }) => {
                  if (!product) return null;
                  const creator = getCreatorById(product.creatorId);
                  const cover = product.gallery[0];
                  return (
                    <li key={product.id} className="grid gap-4 py-5 first:pt-0 last:pb-0 sm:grid-cols-[6rem_1fr]">
                      <ImagePlaceholder
                        label={cover?.label ?? product.name}
                        tone={cover?.tone ?? "brand"}
                        aspect="aspect-square"
                        className="hidden w-24 sm:block [&>span]:hidden"
                      />
                      <div>
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <h3 className="text-lg font-medium">
                              <Link href={`/discover/${product.slug}`} className="hover:text-brand">
                                {product.name}
                              </Link>
                            </h3>
                            {creator && (
                              <p className="text-sm text-muted">
                                by{" "}
                                <Link href={`/creators/${creator.slug}`} className="hover:text-ink hover:underline">
                                  {creator.name}
                                </Link>
                              </p>
                            )}
                          </div>
                          <StatusBadge status={product.status} />
                        </div>
                        <p className="mt-2 text-sm text-muted">
                          {quantity} {quantity === 1 ? "piece" : "pieces"} ·{" "}
                          {formatPrice(product.pricePkr)} each · registered {formatDate(registeredOn)}
                        </p>
                        <div className="mt-3 max-w-md">
                          <InterestProgress current={product.interestCount} target={product.interestTarget} />
                        </div>
                        <p className="mt-2 text-sm">{statusNotes[product.status]}</p>
                        <Link
                          href={`/discover/${product.slug}`}
                          className="mt-2 inline-block text-sm font-medium text-brand underline-offset-4 hover:underline"
                        >
                          View design<span className="sr-only">: {product.name}</span> →
                        </Link>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </Panel>

          <BuyerProfile initialName={auth.displayName} email={auth.user.email} initialCity={auth.user.city ?? ""} />
        </div>
      </Container>
    </>
  );
}

// Profile summary with an "Edit" mode. Changes stay in this component only.
function BuyerProfile({
  initialName,
  initialCity,
  email,
}: {
  initialName: string;
  initialCity: string;
  email: string;
}) {
  const [profile, setProfile] = useState({ name: initialName, city: initialCity, updates: true });
  const [draft, setDraft] = useState(profile);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const startEditing = () => {
    setDraft(profile);
    setError("");
    setSaved(false);
    setEditing(true);
  };

  const save = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!draft.name.trim()) {
      setError("Please enter your name.");
      document.getElementById("buyer-name")?.focus();
      return;
    }
    setProfile({ ...draft, name: draft.name.trim(), city: draft.city.trim() });
    setEditing(false);
    setSaved(true);
  };

  return (
    <Panel
      id="profile"
      title="Your profile"
      actions={
        !editing && (
          <button type="button" onClick={startEditing} className={buttonClasses("secondary", "md")}>
            Edit
          </button>
        )
      }
    >
      {editing ? (
        <form noValidate onSubmit={save} className="space-y-4">
          <TextField
            id="buyer-name"
            label="Name"
            value={draft.name}
            onChange={(e) => {
              setDraft({ ...draft, name: e.target.value });
              setError("");
            }}
            error={error || undefined}
          />
          <TextField
            id="buyer-city"
            label="City"
            optional
            value={draft.city}
            onChange={(e) => setDraft({ ...draft, city: e.target.value })}
          />
          <CheckboxField
            id="buyer-updates"
            checked={draft.updates}
            onChange={(checked) => setDraft({ ...draft, updates: checked })}
            label="Email me when a design I follow changes status"
          />
          <div className="flex gap-3">
            <button type="submit" className={buttonClasses("primary")}>
              Save
            </button>
            <button type="button" onClick={() => setEditing(false)} className={buttonClasses("secondary")}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          {saved && (
            <div className="mb-4">
              <FormAlert tone="success">
                <p className="text-sm">Saved for this demo session only. Nothing was sent to a server.</p>
              </FormAlert>
            </div>
          )}
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-muted">Name</dt>
              <dd className="font-medium">{profile.name}</dd>
            </div>
            <div>
              <dt className="text-muted">Email</dt>
              <dd className="break-all font-medium">{email}</dd>
            </div>
            <div>
              <dt className="text-muted">City</dt>
              <dd className="font-medium">{profile.city || "Not added"}</dd>
            </div>
            <div>
              <dt className="text-muted">Status updates by email</dt>
              <dd className="font-medium">{profile.updates ? "On" : "Off"}</dd>
            </div>
          </dl>
        </>
      )}
    </Panel>
  );
}
