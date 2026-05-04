import * as React from "react";
import { cn } from "@/lib/utils";

interface KbdProps extends React.ComponentProps<"kbd"> {
  size?: "sm" | "default";
}

function Kbd({ size = "default", className, children, ...props }: KbdProps) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "inline-flex items-center justify-center rounded-md border border-border bg-muted font-mono font-medium text-foreground shadow-[0_1px_0_0] shadow-border select-none",
        size === "default" && "h-6 min-w-[1.5rem] px-1.5 text-[11px]",
        size === "sm" && "h-5 min-w-[1.25rem] px-1 text-[10px]",
        className
      )}
      {...props}
    >
      {children}
    </kbd>
  );
}

export { Kbd };
