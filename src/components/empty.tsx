import * as React from "react";
import { cn } from "@/lib/utils";

interface EmptyProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

function Empty({ icon, title, description, action, className }: EmptyProps) {
  return (
    <div
      data-slot="empty"
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-[10px] px-6 py-12 text-center",
        className
      )}
    >
      {icon && (
        <div className="flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground [&>svg]:size-7">
          {icon}
        </div>
      )}
      {title && (
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-foreground">{title}</p>
          {description && (
            <p className="max-w-xs text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

export { Empty };
