import Link from "next/link";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "whatsapp" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  external?: boolean;
}

export default function CTAButton({
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  children,
  type = "button",
  disabled,
  external,
}: CTAButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent disabled:opacity-50 disabled:pointer-events-none";

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variants = {
    primary:
      "bg-accent hover:bg-accent-hover text-white shadow-lg shadow-accent/25 hover:shadow-accent/40",
    secondary:
      "border-2 border-white/80 text-white hover:bg-white hover:text-primary",
    outline:
      "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    whatsapp:
      "bg-whatsapp hover:bg-whatsapp-hover text-white shadow-lg shadow-whatsapp/25",
    ghost: "text-primary hover:bg-primary/5",
  };

  const classes = cn(base, sizes[size], variants[variant], className);

  if (href) {
    const isExternal = external ?? /^(https?:|tel:|mailto:|sms:)/.test(href);
    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    }
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
