import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface ProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  value: number;
  size?: "sm" | "md" | "lg";
  color?: "blue" | "emerald";
  showLabel?: boolean;
  label?: string;
  max?: number;
}

const Progress = ({
  value,
  size = "md",
  color = "blue",
  showLabel = false,
  label,
  max = 100,
  className,
  ...props
}: ProgressProps) => {
  const clampedValue = Math.min(Math.max(value, 0), max);
  const percentage = (clampedValue / max) * 100;

  const trackHeights = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  const fillColors = {
    blue: "bg-[#1E40AF]",
    emerald: "bg-[#10B981]",
  };

  const glowColors = {
    blue: "shadow-[0_0_8px_rgba(30,64,175,0.4)]",
    emerald: "shadow-[0_0_8px_rgba(16,185,129,0.4)]",
  };

  const labelTextSize = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-sm",
  };

  return (
    <div className={cn("w-full flex flex-col gap-1.5", className)} {...props}>
      {(label || showLabel) && (
        <div className="flex items-center justify-between">
          {label && (
            <span className={cn("font-medium text-[#374151]", labelTextSize[size])}>
              {label}
            </span>
          )}
          {showLabel && (
            <span
              className={cn(
                "font-semibold tabular-nums",
                labelTextSize[size],
                color === "blue" ? "text-[#1E40AF]" : "text-[#10B981]"
              )}
            >
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}

      <div
        className={cn(
          "w-full rounded-full bg-[#F3F4F6] overflow-hidden",
          trackHeights[size]
        )}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label ?? "Progress"}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-700 ease-out",
            fillColors[color],
            size === "lg" && glowColors[color]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export { Progress };
export type { ProgressProps };
