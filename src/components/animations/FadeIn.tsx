"use client";

import { cn } from "@/lib/utils";
import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  className?: string;
}

const directionOffsets: Record<NonNullable<FadeInProps["direction"]>, { x?: number; y?: number }> = {
  up: { y: 24 },
  down: { y: -24 },
  left: { x: 24 },
  right: { x: -24 },
};

const FadeIn = ({
  children,
  delay = 0,
  direction = "up",
  duration = 0.5,
  className,
}: FadeInProps) => {
  const offset = directionOffsets[direction];

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: offset.x ?? 0,
      y: offset.y ?? 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};

export { FadeIn };
export type { FadeInProps };
