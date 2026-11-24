import { roleLabels } from "@/features/demo/labels";
import { demoUsers } from "@/features/demo/demo-data";

const descriptions = {
  buyer: "Has registered interest in a few sample designs.",
  creator: "Linked to Sample Creator One, with designs in different review stages.",
  admin: "Opens the demo admin panel. Admin accounts can't be created through sign-up.",
};

// Lists the fictional accounts that work on the demo login page.
export function DemoAccountsPanel() {
  const accounts = demoUsers.filter((user) => user.loginable);

  return (
    <aside aria-labelledby="demo-accounts" className="rounded-card border border-line bg-surface p-6 sm:p-8">
      <h2 id="demo-accounts" className="text-2xl font-medium">
        Demo accounts
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        These fictional accounts exist only in this demo. Use the email with any password of
        8 or more characters, or the one-click buttons under the form.
      </p>
      <ul className="mt-6 space-y-4">
        {accounts.map((user) => (
          <li key={user.id} className="rounded-media border border-line bg-paper p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              {roleLabels[user.role]}
            </p>
            <p className="mt-1 break-all font-mono text-sm">{user.email}</p>
            <p className="mt-1 text-sm text-muted">{descriptions[user.role]}</p>
          </li>
        ))}
      </ul>
    </aside>
  );
}
