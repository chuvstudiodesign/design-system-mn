"use client";

import { useEffect } from "react";

export function InstantHashScroll() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const id = hash.slice(1);
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "instant" as ScrollBehavior });
    });
  }, []);
  return null;
}
