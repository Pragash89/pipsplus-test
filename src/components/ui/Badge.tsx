import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "emerald" | "warning" | "error" | "ghost";
  size?: "sm" | "md";
}

const Badge = ({
  variant = "default",
  size = "md",
  children,
  className,
  ...props
}: BadgeProps) => {
  const base =
    "inline-flex items-center justify-center font-medium rounded-full border transition-colors select-none";

  const variants = {
    default:
      "bg-[#F9FAFB] text-[#111827] border-[#E5E7EB]",
    primary:
      "bg-[#EFF6FF] text-[#1E40AF] border-[#BFDBFE]",
    emerald:
      "bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]",
    warning:
      "bg-[#FFFBEB] text-[#92400E] border-[#FDE68A]",
    error:
      "bg-[#FEF2F2] text-[#991B1B] border-[#FECACA]",
    ghost:
      "bg-transparent text-[#6B7280] border-transparent",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-2.5 py-1 text-xs gap-1.5",
  };

  return (
    <span
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </span>
  );
};

export { Badge };
export type { BadgeProps };
