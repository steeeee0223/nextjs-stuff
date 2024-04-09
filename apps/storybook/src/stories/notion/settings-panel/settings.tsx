"use client";

import { useEffect, useState } from "react";
import { SettingsIcon } from "lucide-react";

import { SettingsPanel, useSettings } from "@acme/ui/notion";
import { Button } from "@acme/ui/shadcn";

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
