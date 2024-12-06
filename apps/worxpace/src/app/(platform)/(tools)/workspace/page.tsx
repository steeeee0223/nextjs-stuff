"use client";

import { useEffect } from "react";

import { useInitialWorkspace } from "~/hooks";

const Workspace = () => {
  const { initialize } = useInitialWorkspace();

  useEffect(() => {
    initialize().catch((e) =>
      console.log(`[/workspace] Unexpected error: ${e}`),
    );
  }, [initialize]);

  return null;
};

export default Workspace;
