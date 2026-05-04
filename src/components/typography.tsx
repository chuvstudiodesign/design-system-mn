import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const typographyVariants = cva("text-foreground", {
  variants: {
    variant: {
      display: "text-[48px] font-extrabold tracking-[-0.02em] leading-[1.1]",
      h1: "text-[32px] font-bold tracking-[-0.02em] leading-[1.1]",
      h2: "text-[24px] font-bold tracking-[-0.02em] leading-[1.2]",
      h3: "text-[18px] font-semibold tracking-[-0.02em] leading-[1.25]",
      "body-lg": "text-[18px] leading-[1.6] font-normal text-muted-foreground",
      body: "text-[15px] leading-relaxed font-normal text-muted-foreground",
      "body-sm": "text-[13px] leading-relaxed font-normal text-muted-foreground",
      label: "text-xs font-semibold uppercase tracking-[0.08em] leading-none",
      caption:
        "text-[11px] font-medium uppercase tracking-[0.06em] leading-none text-muted-foreground",
      muted: "text-[15px] leading-[1.6] text-muted-foreground font-normal",
      code: "font-mono text-[12px] leading-[1.5]",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

const defaultElementByVariant = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  "body-lg": "p",
  body: "p",
  "body-sm": "p",
  label: "p",
  caption: "p",
  muted: "p",
  code: "code",
} as const satisfies Record<
  NonNullable<VariantProps<typeof typographyVariants>["variant"]>,
  React.ElementType
>;

type TypographyProps<C extends React.ElementType> = {
  as?: C;
  variant?: VariantProps<typeof typographyVariants>["variant"];
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<C>, "as" | "children" | "className">;

function Typography<C extends React.ElementType = "p">({
  as,
  variant = "body",
  className,
  children,
  ...props
}: TypographyProps<C>) {
  const Component = (as ??
    defaultElementByVariant[variant ?? "body"]) as React.ElementType;

  return (
    <Component
      className={cn(typographyVariants({ variant }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export { Typography, typographyVariants };
