"use client";

import { cn } from "@/lib/utils";
import { motion, Variants } from "framer-motion";
import React, { ReactNode } from "react";

interface StaggerChildrenProps {
  children: ReactNode;
  staggerDelay?: number;
  duration?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

const StaggerChildren = ({
  children,
  staggerDelay = 0.1,
  duration = 0.4,
  className,
  as: Tag = "div",
}: StaggerChildrenProps) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.05,
      },
    },
  };

  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={cn(className)}
    >
      {children}
    </MotionTag>
  );
};

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  as?: keyof React.JSX.IntrinsicElements;
}

const directionOffsets: Record<NonNullable<StaggerItemProps["direction"]>, { x?: number; y?: number }> = {
  up: { y: 20 },
  down: { y: -20 },
  left: { x: 20 },
  right: { x: -20 },
  none: {},
};

const StaggerItem = ({
  children,
  className,
  direction = "up",
  as: Tag = "div",
}: StaggerItemProps) => {
  const offset = directionOffsets[direction];

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      x: offset.x ?? 0,
      y: offset.y ?? 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
      },
    },
  };

  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag variants={itemVariants} className={cn(className)}>
      {children}
    </MotionTag>
  );
};

export { StaggerChildren, StaggerItem };
export type { StaggerChildrenProps, StaggerItemProps };
