"use client";

import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from "next-themes";

// Known browser extension attributes that cause false hydration warnings (e.g. Grammarly, Bitwarden)
const EXTENSION_INJECTED_ATTRS = ["bis_skin_checked", "bis_register"];

if (typeof window !== "undefined") {
  const originalError = console.error;
  console.error = (...args: any[]) => {
    const msg = typeof args[0] === "string" ? args[0] : "";
    const allArgs = args.map((a) => (typeof a === "string" ? a : "")).join(" ");

    const isExtensionNoise =
      EXTENSION_INJECTED_ATTRS.some((attr) => allArgs.includes(attr)) ||
      // React <18 format
      msg.includes("Extra attributes from the server") ||
      msg.includes("Encountered a script tag while rendering React component") ||
      // React 19 format
      msg.includes("A tree hydrated but some attributes of the server rendered HTML didn't match");

    if (isExtensionNoise) return;

    originalError.apply(console, args);
  };
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
