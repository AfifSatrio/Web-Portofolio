import React, { useId } from "react";
import { cn } from "@/lib/utils";
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, rows = 4, ...props }, ref) => {
    const generatedId = useId();
    const fieldId = id || generatedId;
    const description =
      [props["aria-describedby"], error ? `${fieldId}-error` : ""]
        .filter(Boolean)
        .join(" ") || undefined;
    return (
      <div className="w-full flex flex-col gap-2">
        {label && (
          <label htmlFor={fieldId} className="text-sm font-medium text-ink">
            {label}
          </label>
        )}
        <textarea
          {...props}
          rows={rows}
          id={fieldId}
          ref={ref}
          aria-invalid={error ? true : props["aria-invalid"]}
          aria-describedby={description}
          className={cn(
            "w-full bg-surface-subtle border border-line-strong text-ink placeholder:text-ink-muted rounded-control px-4 py-3 text-base transition-colors duration-ui focus:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-feedback-error",
            className,
          )}
        />
        {error && (
          <p id={`${fieldId}-error`} className="text-sm text-feedback-error">
            {error}
          </p>
        )}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";
