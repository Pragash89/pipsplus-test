"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  className?: string;
}

const StarIcon = ({
  fill,
  size,
  className,
}: {
  fill: "full" | "half" | "empty";
  size: number;
  className?: string;
}) => {
  const id = `half-${Math.random().toString(36).slice(2, 9)}`;

  if (fill === "full") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className={className}
        aria-hidden="true"
      >
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill="#F59E0B"
          stroke="#F59E0B"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (fill === "half") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className={className}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={id}>
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill={`url(#${id})`}
          stroke="#F59E0B"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill="none"
        stroke="#D1D5DB"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const StarRating = ({
  rating,
  max = 5,
  size = "md",
  showValue = false,
  interactive = false,
  onRatingChange,
  className,
}: StarRatingProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number>(rating);

  const displayRating = interactive ? (hovered ?? selected) : rating;

  const pixelSizes = {
    sm: 14,
    md: 18,
    lg: 24,
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const px = pixelSizes[size];

  const getStarFill = (index: number): "full" | "half" | "empty" => {
    const starValue = index + 1;
    if (displayRating >= starValue) return "full";
    if (displayRating >= starValue - 0.5) return "half";
    return "empty";
  };

  const handleClick = (index: number) => {
    if (!interactive) return;
    const value = index + 1;
    setSelected(value);
    onRatingChange?.(value);
  };

  return (
    <div
      className={cn("inline-flex items-center gap-1", className)}
      role={interactive ? "radiogroup" : undefined}
      aria-label={interactive ? "Star rating" : `Rating: ${rating} out of ${max}`}
    >
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }).map((_, i) => (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            onClick={() => handleClick(i)}
            onMouseEnter={() => interactive && setHovered(i + 1)}
            onMouseLeave={() => interactive && setHovered(null)}
            className={cn(
              "focus:outline-none rounded-sm",
              interactive
                ? "cursor-pointer transition-transform duration-75 hover:scale-110 focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
                : "cursor-default pointer-events-none"
            )}
            aria-label={interactive ? `Rate ${i + 1} out of ${max}` : undefined}
          >
            <StarIcon
              fill={getStarFill(i)}
              size={px}
              className={cn(
                "transition-colors duration-75",
                interactive && hovered !== null && i < hovered ? "drop-shadow-sm" : ""
              )}
            />
          </button>
        ))}
      </div>

      {showValue && (
        <span
          className={cn(
            "font-medium text-[#374151] leading-none",
            textSizes[size]
          )}
        >
          {interactive ? selected.toFixed(1) : rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export { StarRating };
export type { StarRatingProps };
