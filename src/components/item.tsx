import * as React from "react";
import { cn } from "@/lib/utils";

interface ItemProps extends React.ComponentProps<"div"> {
  icon?: React.ReactNode;
  label?: string;
  description?: string;
  trailing?: React.ReactNode;
  interactive?: boolean;
}

function Item({
  icon,
  label,
  description,
  trailing,
  interactive = false,
  className,
  children,
  ...props
}: ItemProps) {
  return (
    <div
      data-slot="item"
      className={cn(
        "flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm",
        interactive &&
          "cursor-pointer transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      tabIndex={interactive ? 0 : undefined}
      role={interactive ? "button" : undefined}
      {...props}
    >
      {icon && (
        <span className="flex size-5 shrink-0 items-center justify-center text-muted-foreground [&>svg]:size-4">
          {icon}
        </span>
      )}
      {(label || description || children) && (
        <div className="flex min-w-0 flex-1 flex-col">
          {label && (
            <span className="truncate font-medium text-foreground">{label}</span>
          )}
          {description && (
            <span className="truncate text-xs text-muted-foreground">
              {description}
            </span>
          )}
          {children}
        </div>
      )}
      {trailing && (
        <span className="ml-auto shrink-0 text-muted-foreground">{trailing}</span>
      )}
    </div>
  );
}

export { Item };
