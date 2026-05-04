import * as React from "react";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "sm" | "default" | "lg";
  className?: string;
  label?: string;
}

function Spinner({ size = "default", className, label = "Carregando..." }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn(
        "inline-flex animate-spin rounded-full border-2 border-current border-t-transparent text-primary",
        size === "sm" && "size-4",
        size === "default" && "size-6",
        size === "lg" && "size-8",
        className
      )}
    >
      <span className="sr-only">{label}</span>
    </span>
  );
}

export { Spinner };
