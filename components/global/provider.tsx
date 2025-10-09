"use client";
import { ReactNode, useEffect } from "react";
import { logFiglet } from "@/utils/other/art";

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    logFiglet('A D S C');
  }, [])

  return <>{children}</>;
}
