import Link from "next/link";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function CTAButton({
  href,
  onClick,
  variant = "primary",
  className,
  children,
  type = "button",
  disabled,
}: CTAButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-lg px-6 py-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary: "bg-accent hover:bg-accent-hover text-white",
    secondary:
      "border-2 border-white text-white hover:bg-white hover:text-primary",
  };

  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}
