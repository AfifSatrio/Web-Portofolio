import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "default" | "solid";
}

export const Badge = ({ className, children, variant = "default", ...props }: BadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 text-xs font-medium rounded-full transition-all duration-200",
        variant === "default" && "bg-mono-900 text-mono-300 border border-mono-700 hover:border-white hover:text-white",
        variant === "solid" && "bg-white text-black font-semibold",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
