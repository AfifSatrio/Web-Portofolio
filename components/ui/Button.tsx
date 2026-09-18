import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const buttonStyles = ({
  variant = "primary",
  size = "md",
  className = "",
}: {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
} = {}) =>
  cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-control border font-sans font-semibold transition-colors duration-ui focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4 disabled:opacity-50 disabled:cursor-not-allowed",
    {
      primary:
        "bg-white text-black border-white hover:bg-mono-200 hover:border-mono-200 active:bg-mono-300",
      outline:
        "bg-transparent text-ink border-line-strong hover:border-white hover:bg-mono-900 active:bg-mono-800",
      ghost:
        "bg-transparent text-ink-secondary border-transparent hover:text-white hover:bg-mono-900 active:bg-mono-800",
    }[variant],
    {
      sm: "px-4 py-2 text-sm",
      md: "px-5 py-3 text-sm",
      lg: "px-6 py-3.5 text-base",
    }[size],
    className,
  );

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", children, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        className={buttonStyles({ variant, size, className })}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
