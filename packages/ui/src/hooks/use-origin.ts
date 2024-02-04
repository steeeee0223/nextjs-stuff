"use client";

import { useEffect, useState } from "react";

export const useOrigin = (): string => {
  const [mounted, setMounted] = useState(false);
  const origin = window?.location.origin ? window.location.origin : "";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return "";
  return origin;
};
