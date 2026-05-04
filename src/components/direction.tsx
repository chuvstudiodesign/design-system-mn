import * as React from "react";
import { cn } from "@/lib/utils";

type Direction = "ltr" | "rtl";

interface DirectionProviderProps {
  dir: Direction;
  children: React.ReactNode;
  className?: string;
}

function DirectionProvider({ dir, children, className }: DirectionProviderProps) {
  return (
    <div dir={dir} className={cn(className)}>
      {children}
    </div>
  );
}

export { DirectionProvider, type Direction };
