import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonGroupProps extends React.ComponentProps<"div"> {
  orientation?: "horizontal" | "vertical";
  size?: "xs" | "sm" | "default" | "lg";
}

function ButtonGroup({
  className,
  orientation = "horizontal",
  size,
  children,
  ...props
}: ButtonGroupProps) {
  return (
    <div
      data-slot="button-group"
      data-orientation={orientation}
      data-size={size}
      role="group"
      className={cn(
        "inline-flex",
        orientation === "horizontal"
          ? "flex-row [&>[data-slot=button]:not(:first-child)]:rounded-l-none [&>[data-slot=button]:not(:last-child)]:rounded-r-none [&>[data-slot=button]:not(:first-child)]:-ml-px"
          : "flex-col [&>[data-slot=button]:not(:first-child)]:rounded-t-none [&>[data-slot=button]:not(:last-child)]:rounded-b-none [&>[data-slot=button]:not(:first-child)]:-mt-px",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { ButtonGroup };
