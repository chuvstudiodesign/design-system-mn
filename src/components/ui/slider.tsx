import { Slider as SliderPrimitive } from "@base-ui/react/slider"

import { cn } from "@/lib/utils"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: SliderPrimitive.Root.Props) {
  const _values = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
      ? defaultValue
      : [min, max]

  return (
    <SliderPrimitive.Root
      className={cn("data-horizontal:w-full data-vertical:h-full", className)}
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      thumbAlignment="edge"
      {...props}
    >
      <SliderPrimitive.Control className="relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col">
        <SliderPrimitive.Track
          data-slot="slider-track"
          className="relative grow overflow-hidden rounded-full border border-white/38 bg-white/10 [background-image:linear-gradient(180deg,rgba(255,255,255,0.28)_0%,rgba(255,255,255,0.08)_45%,rgba(255,255,255,0.04)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.48),inset_0_-12px_18px_rgba(255,255,255,0.08),0_8px_24px_rgba(15,23,42,0.08)] backdrop-blur-[24px] select-none data-horizontal:h-4 data-horizontal:w-full data-vertical:h-full data-vertical:w-4"
        >
          <div className="pointer-events-none absolute inset-[1px] rounded-full bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.62),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.04)_62%,rgba(255,255,255,0)_100%)]" />
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className="select-none data-horizontal:h-full data-vertical:w-full bg-[linear-gradient(180deg,rgba(255,255,255,0.32)_0%,rgba(95,195,24,0.18)_30%,rgba(95,195,24,0.42)_100%)]"
          />
        </SliderPrimitive.Track>
        {Array.from({ length: _values.length }, (_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            className="relative block h-7 w-11 shrink-0 rounded-full border border-white/70 bg-white/24 [background-image:radial-gradient(circle_at_30%_24%,rgba(255,255,255,0.95),rgba(255,255,255,0.34)_36%,rgba(255,255,255,0.14)_68%,rgba(255,255,255,0.06)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.92),inset_0_-12px_18px_rgba(255,255,255,0.16),0_10px_24px_rgba(15,23,42,0.12)] backdrop-blur-[24px] ring-ring/50 transition-[box-shadow,transform] select-none before:pointer-events-none before:absolute before:inset-[1px] before:rounded-full before:bg-[linear-gradient(180deg,rgba(255,255,255,0.42)_0%,rgba(255,255,255,0.08)_100%)] before:content-[''] after:absolute after:-inset-2 hover:ring-3 focus-visible:ring-3 focus-visible:outline-hidden active:scale-[0.985] active:ring-3 disabled:pointer-events-none disabled:opacity-50 data-vertical:h-11 data-vertical:w-7"
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export { Slider }
