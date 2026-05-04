"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  size = "default",
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 items-center overflow-hidden rounded-full border border-white/40 bg-white/10 [background-image:linear-gradient(180deg,rgba(255,255,255,0.34)_0%,rgba(255,255,255,0.12)_42%,rgba(255,255,255,0.04)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.52),inset_0_-12px_20px_rgba(255,255,255,0.08),0_12px_28px_rgba(15,23,42,0.12)] backdrop-blur-[24px] supports-backdrop-filter:bg-white/8 transition-all duration-300 outline-none before:pointer-events-none before:absolute before:inset-[1px] before:rounded-full before:bg-[radial-gradient(circle_at_28%_22%,rgba(255,255,255,0.72),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0.05)_58%,rgba(255,255,255,0)_100%)] before:opacity-100 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[size=default]:h-[28px] data-[size=default]:w-[46px] data-[size=sm]:h-[24px] data-[size=sm]:w-[38px] dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary/20 data-checked:bg-primary/12 data-unchecked:bg-white/10 data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none absolute left-[2px] top-1/2 block -translate-y-1/2 rounded-full border border-white/70 bg-white/28 [background-image:radial-gradient(circle_at_30%_24%,rgba(255,255,255,0.92),rgba(255,255,255,0.36)_38%,rgba(255,255,255,0.16)_66%,rgba(255,255,255,0.08)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.88),inset_0_-10px_18px_rgba(255,255,255,0.18),0_10px_24px_rgba(15,23,42,0.12)] backdrop-blur-[20px] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] before:pointer-events-none before:absolute before:inset-[1px] before:rounded-full before:bg-[linear-gradient(180deg,rgba(255,255,255,0.46)_0%,rgba(255,255,255,0.1)_100%)] before:content-[''] group-data-[size=default]/switch:h-[24px] group-data-[size=default]/switch:w-[24px] group-data-[size=sm]/switch:h-[20px] group-data-[size=sm]/switch:w-[20px] group-data-[size=default]/switch:data-checked:translate-x-[18px] group-data-[size=sm]/switch:data-checked:translate-x-[14px] group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
