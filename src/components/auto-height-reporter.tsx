"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type AutoHeightReporterProps = {
  targetSelector?: string;
};

export function AutoHeightReporter({
  targetSelector = "[data-embed-height-root]",
}: AutoHeightReporterProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (window.parent === window) return;

    const getContainer = () =>
      document.querySelector<HTMLElement>(targetSelector) || document.body;

    let lastSentHeight = -1;
    let rafId = 0;

    const sendHeight = () => {
      cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        const container = getContainer();
        const height = Math.ceil(
          Math.max(
            container.offsetHeight,
            container.scrollHeight,
            container.getBoundingClientRect().height
          )
        );

        if (height < 1 || height === lastSentHeight) return;

        lastSentHeight = height;

        window.parent.postMessage(
          {
            type: "site:embed-resize",
            height,
            path: window.location.pathname,
          },
          "*"
        );
      });
    };

    document.documentElement.style.height = "auto";
    document.documentElement.style.minHeight = "0";
    document.documentElement.style.overflow = "hidden";
    document.body.style.height = "auto";
    document.body.style.minHeight = "0";
    document.body.style.overflow = "hidden";

    const container = getContainer();
    const resizeObserver = new ResizeObserver(sendHeight);
    const mutationObserver = new MutationObserver(sendHeight);

    resizeObserver.observe(container);
    mutationObserver.observe(container, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    window.addEventListener("load", sendHeight);
    window.addEventListener("resize", sendHeight);

    sendHeight();
    const t1 = setTimeout(sendHeight, 100);
    const t2 = setTimeout(sendHeight, 400);
    const t3 = setTimeout(sendHeight, 900);
    const t4 = setTimeout(sendHeight, 1800);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("load", sendHeight);
      window.removeEventListener("resize", sendHeight);
      document.documentElement.style.height = "";
      document.documentElement.style.minHeight = "";
      document.documentElement.style.overflow = "";
      document.body.style.height = "";
      document.body.style.minHeight = "";
      document.body.style.overflow = "";
    };
  }, [pathname, targetSelector]);

  return null;
}
