import { cn } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  containerClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      containerClassName,
      className,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className={cn("flex flex-col gap-1.5 w-full", containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "text-sm font-medium leading-none",
              error ? "text-red-600" : "text-[#111827]",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <span
              className={cn(
                "pointer-events-none absolute left-3 flex items-center",
                error ? "text-red-400" : "text-[#6B7280]"
              )}
            >
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={cn(
              "w-full rounded-lg border bg-white text-sm text-[#111827] placeholder:text-[#9CA3AF]",
              "px-3.5 py-2.5 h-10",
              "transition-all duration-150",
              "outline-none focus:ring-2 focus:ring-offset-0",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#F9FAFB]",
              error
                ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                : "border-[#E5E7EB] focus:border-[#1E40AF] focus:ring-[#1E40AF]/20 hover:border-[#9CA3AF]",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className
            )}
            {...props}
          />

          {rightIcon && (
            <span
              className={cn(
                "absolute right-3 flex items-center",
                error ? "text-red-400" : "text-[#6B7280]"
              )}
            >
              {rightIcon}
            </span>
          )}
        </div>

        {(error || helperText) && (
          <p
            className={cn(
              "text-xs leading-tight",
              error ? "text-red-600" : "text-[#6B7280]"
            )}
          >
            {error ?? helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
export type { InputProps };
