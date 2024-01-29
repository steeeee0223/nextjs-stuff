"use client";

import { useEffect, useState } from "react";

import { SettingsModal } from "~/components/modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? (
    <>
      <SettingsModal />
    </>
  ) : null;
};
