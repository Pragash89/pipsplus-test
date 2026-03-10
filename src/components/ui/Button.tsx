"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "emerald";
  size?: "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading,
      leftIcon,
      rightIcon,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none";

    const variants = {
      primary:
        "bg-[#1E40AF] text-white hover:bg-[#1E3A8A] focus-visible:ring-[#1E40AF] shadow-sm hover:shadow-md active:scale-[0.98]",
      secondary:
        "bg-[#F9FAFB] text-[#111827] border border-[#E5E7EB] hover:bg-[#F3F4F6] focus-visible:ring-[#1E40AF]",
      outline:
        "border-2 border-[#1E40AF] text-[#1E40AF] hover:bg-[#EFF6FF] focus-visible:ring-[#1E40AF] active:scale-[0.98]",
      ghost:
        "text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#111827] focus-visible:ring-[#1E40AF]",
      danger:
        "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 shadow-sm active:scale-[0.98]",
      emerald:
        "bg-[#10B981] text-white hover:bg-[#059669] focus-visible:ring-[#10B981] shadow-sm hover:shadow-md active:scale-[0.98]",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm h-8",
      md: "px-4 py-2 text-sm h-10",
      lg: "px-6 py-3 text-base h-11",
      xl: "px-8 py-4 text-lg h-14",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="animate-spin" size={size === "sm" ? 14 : size === "xl" ? 20 : 16} />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button };
