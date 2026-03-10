import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: "sm" | "md" | "lg" | "none";
  shadow?: "none" | "sm" | "md" | "lg";
  border?: boolean;
}

const Card = ({
  hover = false,
  padding = "none",
  shadow = "sm",
  border = true,
  children,
  className,
  ...props
}: CardProps) => {
  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const shadows = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  };

  return (
    <div
      className={cn(
        "rounded-xl bg-white",
        border && "border border-[#E5E7EB]",
        shadows[shadow],
        paddings[padding],
        hover &&
          "transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  padding?: "sm" | "md" | "lg";
}

const CardHeader = ({
  padding = "md",
  children,
  className,
  ...props
}: CardHeaderProps) => {
  const paddings = {
    sm: "px-4 pt-4 pb-3",
    md: "px-6 pt-6 pb-4",
    lg: "px-8 pt-8 pb-5",
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-1",
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4";
}

const CardTitle = ({
  as: Tag = "h3",
  children,
  className,
  ...props
}: CardTitleProps) => {
  return (
    <Tag
      className={cn(
        "text-lg font-semibold leading-tight text-[#111827] tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
};

const CardDescription = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p
      className={cn("text-sm text-[#6B7280] leading-relaxed", className)}
      {...props}
    >
      {children}
    </p>
  );
};

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  padding?: "sm" | "md" | "lg";
}

const CardContent = ({
  padding = "md",
  children,
  className,
  ...props
}: CardContentProps) => {
  const paddings = {
    sm: "px-4 pb-4",
    md: "px-6 pb-6",
    lg: "px-8 pb-8",
  };

  return (
    <div className={cn(paddings[padding], className)} {...props}>
      {children}
    </div>
  );
};

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  padding?: "sm" | "md" | "lg";
  divided?: boolean;
}

const CardFooter = ({
  padding = "md",
  divided = false,
  children,
  className,
  ...props
}: CardFooterProps) => {
  const paddings = {
    sm: "px-4 py-3",
    md: "px-6 py-4",
    lg: "px-8 py-5",
  };

  return (
    <div
      className={cn(
        "flex items-center",
        paddings[padding],
        divided && "border-t border-[#E5E7EB]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
export type { CardProps, CardHeaderProps, CardTitleProps, CardContentProps, CardFooterProps };
