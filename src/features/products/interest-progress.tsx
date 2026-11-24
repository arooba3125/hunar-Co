import { progressPercent } from "@/lib/format";

type InterestProgressProps = {
  current: number;
  target: number;
  /** "lg" for the product detail page */
  size?: "md" | "lg";
  /** Adds "(sample)" so placeholder numbers are never mistaken for real ones */
  isSample?: boolean;
};

// A bar showing how many people registered interest compared with the target.
export function InterestProgress({
  current,
  target,
  size = "md",
  isSample = true,
}: InterestProgressProps) {
  const percent = progressPercent(current, target);
  const barHeight = size === "lg" ? "h-2.5" : "h-1.5";

  return (
    <div>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={target}
        aria-valuenow={Math.min(current, target)}
        aria-valuetext={`${current} of ${target} interests registered`}
        aria-label="Interest progress"
        className={`${barHeight} overflow-hidden rounded-control bg-line`}
      >
        <div
          className={`h-full rounded-control ${percent >= 100 ? "bg-sage" : "bg-brand"}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <p
        className={`mt-2 flex justify-between gap-3 text-muted ${size === "lg" ? "text-base" : "text-sm"}`}
      >
        <span>
          <strong className="font-semibold text-ink">{current}</strong> of{" "}
          {target} interests{isSample && " (sample)"}
        </span>
        <span>{percent}%</span>
      </p>
    </div>
  );
}
