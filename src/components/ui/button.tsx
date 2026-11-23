import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost" | "light";
type ButtonSize = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-control font-medium transition-colors duration-200 whitespace-nowrap";

const variants: Record<ButtonVariant, string> = {
  // Filled terracotta: the main action on a screen
  primary: "bg-brand text-surface hover:bg-brand-dark",
  // Outlined: a second, quieter action next to a primary one
  secondary: "border border-ink/25 text-ink hover:border-ink hover:bg-ink/5",
  // Text only, for low-emphasis links
  ghost: "text-ink underline-offset-4 hover:underline",
  // Cream button for use on dark (indigo) backgrounds
  light: "bg-paper text-deep hover:bg-sand",
};

const sizes: Record<ButtonSize, string> = {
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

// Returns the class names for a button. Use it when you need button styling
// on something other than a link (for example a <button> in a form).
export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className = "",
) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`.trim();
}

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

// A link that looks like a button.
export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
}: ButtonLinkProps) {
  return (
    <Link href={href} className={buttonClasses(variant, size, className)}>
      {children}
    </Link>
  );
}
