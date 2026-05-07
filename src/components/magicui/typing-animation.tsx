"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

type TypingElement = "span" | "p" | "h1" | "h2" | "h3" | "div";

export interface TypingAnimationProps
  extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  children?: string;
  text?: string;
  as?: TypingElement;
  duration?: number;
  speed?: number;
  delay?: number;
  startOnView?: boolean;
  cursor?: boolean;
  cursorClassName?: string;
}

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timeoutId = window.setTimeout(() => {
      setReducedMotion(mediaQuery.matches);
    }, 0);

    function handleChange() {
      setReducedMotion(mediaQuery.matches);
    }

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      window.clearTimeout(timeoutId);
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return reducedMotion;
}

function useInView(enabled: boolean) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(!enabled);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const element = ref.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [enabled]);

  return { ref, inView };
}

export function TypingAnimation({
  children,
  text,
  as = "span",
  duration,
  speed = 40,
  delay = 0,
  startOnView = false,
  cursor = true,
  cursorClassName,
  className,
  style,
  ...props
}: TypingAnimationProps) {
  const content = text ?? children ?? "";
  const reducedMotion = useReducedMotion();
  const { ref, inView } = useInView(startOnView);
  const [displayedText, setDisplayedText] = useState(reducedMotion ? content : "");
  const Component = as as ElementType;

  const intervalMs = useMemo(() => {
    if (duration && content.length > 0) {
      return Math.max(12, duration / content.length);
    }

    return Math.max(12, speed);
  }, [content.length, duration, speed]);

  useEffect(() => {
    if (reducedMotion || !inView) {
      return;
    }

    let intervalId: number | undefined;
    const delayId = window.setTimeout(() => {
      let index = 0;

      setDisplayedText("");

      intervalId = window.setInterval(() => {
        index += 1;
        setDisplayedText(content.slice(0, index));

        if (index >= content.length) {
          window.clearInterval(intervalId);
        }
      }, intervalMs);
    }, delay);

    return () => {
      window.clearTimeout(delayId);

      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [content, delay, inView, intervalMs, reducedMotion]);

  const typingStyle = {
    ...style,
    "--typing-animation-delay": `${delay}ms`,
    "--typing-animation-duration": `${duration ?? Math.round(intervalMs * content.length)}ms`,
  } as CSSProperties;
  const renderedText = reducedMotion || displayedText.length > content.length
    ? content
    : displayedText;

  return (
    <Component
      ref={ref}
      aria-label={content}
      className={cn("inline-block text-foreground", className)}
      style={typingStyle}
      {...props}
    >
      <span aria-hidden="true">{inView ? renderedText : ""}</span>
      {cursor && !reducedMotion && inView && renderedText.length < content.length && (
        <span
          aria-hidden="true"
          className={cn(
            "ml-1 inline-block h-[1em] w-[0.08em] translate-y-[0.12em] bg-current motion-safe:animate-pulse",
            cursorClassName,
          )}
        />
      )}
    </Component>
  );
}
