"use client";

import { useEffect, useState } from "react";
import { SettingsIcon } from "lucide-react";

import { Button, SettingsPanel, useSettings } from "@acme/ui/components";

export const Settings = () => {
  const settings = useSettings();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <Button variant="outline" size="icon" onClick={settings.onOpen}>
        <SettingsIcon />
      </Button>
      {isMounted && <SettingsPanel />}
    </>
  );
};
