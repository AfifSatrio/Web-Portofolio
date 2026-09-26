import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export const Badge = ({ className, children, ...props }: BadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 text-xs font-medium rounded-full leading-relaxed",
        "bg-surface-subtle text-ink-secondary border border-line",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
};
