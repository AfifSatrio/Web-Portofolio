import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-sans font-semibold tracking-wide transition-all duration-200 ease-out focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-[4px]";

    const variants = {
      primary:
        "bg-white text-black border-2 border-white hover:bg-black hover:text-white active:scale-[0.98]",
      outline:
        "bg-transparent text-white border-2 border-white hover:bg-white hover:text-black active:scale-[0.98]",
      ghost:
        "bg-transparent text-mono-500 hover:text-white hover:bg-mono-900 border border-transparent",
    };

    const sizes = {
      sm: "text-xs px-3 py-1.5 gap-1.5",
      md: "text-sm px-5 py-2.5 gap-2",
      lg: "text-base px-7 py-3.5 gap-2.5 uppercase tracking-wider",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
