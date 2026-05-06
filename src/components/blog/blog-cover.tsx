/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";

const toneStyles = {
  green: {
    background: "linear-gradient(135deg, #0C1C16 0%, #5FC318 54%, #AFF000 100%)",
  },
  dark: {
    background: "linear-gradient(135deg, #0C1C16 0%, #1F1F1F 58%, #5FC318 100%)",
  },
  blue: {
    background: "linear-gradient(135deg, #0C1C16 0%, #58C7FF 58%, #ECECEC 100%)",
  },
  purple: {
    background: "linear-gradient(135deg, #0C1C16 0%, #5C00FF 58%, #C059FF 100%)",
  },
  orange: {
    background: "linear-gradient(135deg, #0C1C16 0%, #F54A00 58%, #FF8B58 100%)",
  },
  gray: {
    background: "linear-gradient(135deg, #1F1F1F 0%, #A3A3A3 58%, #ECECEC 100%)",
  },
} as const;

export function BlogCover({
  src,
  tone,
  label,
  className,
}: {
  src?: string;
  tone: keyof typeof toneStyles;
  label: string;
  className?: string;
}) {
  const hasImage = Boolean(src && (src.startsWith("http") || src.startsWith("/")));

  return (
    <div
      role="img"
      aria-label={label}
      className={cn("relative min-h-[220px] overflow-hidden rounded-[10px]", className)}
      style={toneStyles[tone]}
    >
      {hasImage ? (
        <img
          src={src}
          alt={label}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <>
          <div className="absolute inset-[30px] rounded-[10px] border border-white/45" />
          <div className="absolute left-[30px] top-[30px] h-16 w-16 rounded-[10px] bg-white/90 backdrop-blur-sm" />
          <div className="absolute bottom-[30px] left-[30px] h-2 w-32 rounded-full bg-white/75" />
          <div className="absolute bottom-[48px] left-[30px] h-2 w-52 rounded-full bg-white/50" />
          <div className="absolute right-[30px] top-[30px] grid grid-cols-3 gap-2">
            {Array.from({ length: 9 }).map((_, index) => (
              <span key={index} className="h-3 w-3 rounded-full bg-white/55" />
            ))}
          </div>
          <div className="absolute bottom-0 right-0 h-28 w-28 rounded-tl-[10px] bg-black/25 backdrop-blur-[2px]" />
        </>
      )}
    </div>
  );
}
