"use client";

import { useState } from "react";
import { FilterSelect, optionsWithAll } from "@/components/ui/filter-select";
import { Pill } from "@/components/ui/pill";
import { formatDate } from "@/lib/format";
import { EmptyState } from "@/features/dashboard/dashboard-ui";
import { roleLabels, userStatusLabels, userStatusTone } from "@/features/demo/labels";
import { SearchField } from "@/features/products/catalogue-filters";
import { AdminPageHeader, tableStyles } from "./admin-shell";
import { useAdminDemo } from "./admin-demo-context";

export function AdminUsers() {
  const { users } = useAdminDemo();
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("all");
  const [status, setStatus] = useState("all");

  const search = query.trim().toLowerCase();
  const visible = users.filter(
    (user) =>
      (role === "all" || user.role === role) &&
      (status === "all" || user.status === status) &&
      (!search || user.name.toLowerCase().includes(search) || user.email.includes(search)),
  );

  const reset = () => {
    setQuery("");
    setRole("all");
    setStatus("all");
  };

  return (
    <>
      <AdminPageHeader title="Users">
        Fictional demo accounts. Search by name or email, or filter by role and status.
      </AdminPageHeader>

      <div className="mb-4 flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center">
        <div className="md:w-72">
          <SearchField
            id="user-search"
            label="Search users by name or email"
            placeholder="Search name or email"
            value={query}
            onChange={setQuery}
          />
        </div>
        <FilterSelect id="user-role" label="Role" value={role} onChange={setRole} options={optionsWithAll(roleLabels)} />
        <FilterSelect
          id="user-status"
          label="Status"
          value={status}
          onChange={setStatus}
          options={optionsWithAll(userStatusLabels)}
        />
      </div>

      <p aria-live="polite" className="mb-3 text-sm text-muted">
        Showing {visible.length} of {users.length} users
      </p>

      {visible.length === 0 ? (
        <EmptyState
          title="No users match"
          action={
            <button type="button" onClick={reset} className="text-sm font-medium text-brand underline">
              Clear search and filters
            </button>
          }
        >
          Try a different name or remove a filter.
        </EmptyState>
      ) : (
        <div className={tableStyles.wrapper}>
          <table className={tableStyles.table}>
            <caption className="sr-only">Demo users</caption>
            <thead className={tableStyles.head}>
              <tr>
                <th scope="col" className={tableStyles.th}>Name</th>
                <th scope="col" className={tableStyles.th}>Email</th>
                <th scope="col" className={tableStyles.th}>Role</th>
                <th scope="col" className={tableStyles.th}>Status</th>
                <th scope="col" className={tableStyles.th}>Joined</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((user) => (
                <tr key={user.id} className={tableStyles.row}>
                  <th scope="row" className={`${tableStyles.td} font-medium`}>
                    {user.name}
                    {user.city && <span className="block text-xs font-normal text-muted">{user.city}</span>}
                  </th>
                  <td className={`${tableStyles.td} break-all text-muted`}>{user.email}</td>
                  <td className={tableStyles.td}>{roleLabels[user.role]}</td>
                  <td className={tableStyles.td}>
                    <Pill tone={userStatusTone[user.status]}>{userStatusLabels[user.status]}</Pill>
                  </td>
                  <td className={`${tableStyles.td} whitespace-nowrap text-muted`}>{formatDate(user.joinedOn)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
