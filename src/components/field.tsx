import * as React from "react";
import { cn } from "@/lib/utils";

interface FieldProps {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
}

function Field({
  label,
  description,
  error,
  required,
  htmlFor,
  children,
  className,
}: FieldProps) {
  return (
    <div data-slot="field" className={cn("group/field flex flex-col gap-1.5", className)}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="text-sm font-medium text-foreground group-has-[input:disabled]/field:opacity-50"
        >
          {label}
          {required && (
            <span className="ml-1 text-destructive" aria-hidden>
              *
            </span>
          )}
        </label>
      )}
      {children}
      {description && !error && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      {error && (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export { Field };
