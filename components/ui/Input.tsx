import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, type = "text", ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-2">
        {label && (
          <label className="text-xs font-semibold uppercase tracking-wider text-mono-300">
            {label}
          </label>
        )}
        <input
          type={type}
          ref={ref}
          className={cn(
            "w-full bg-mono-900 border border-mono-700 text-white placeholder-mono-500 rounded-[4px] px-4 py-3 text-sm transition-colors duration-200 focus:outline-none focus:border-white focus:ring-1 focus:ring-white disabled:opacity-50",
            error && "border-mono-300 focus:border-white",
            className
          )}
          {...props}
        />
        {error && <span className="text-xs text-mono-300 mt-0.5">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
