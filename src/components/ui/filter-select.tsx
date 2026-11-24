// A compact labelled dropdown for filtering lists, e.g. "Role: All".

type FilterSelectProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
};

export function FilterSelect({ id, label, value, onChange, options }: FilterSelectProps) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor={id} className="whitespace-nowrap text-sm text-muted">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 rounded-control border border-line bg-surface px-4 text-sm focus:border-ink"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/** Turns a label map like { buyer: "Buyer" } into options with "All" first. */
export function optionsWithAll(labels: Record<string, string>, allLabel = "All") {
  return [
    { value: "all", label: allLabel },
    ...Object.entries(labels).map(([value, label]) => ({ value, label })),
  ];
}
