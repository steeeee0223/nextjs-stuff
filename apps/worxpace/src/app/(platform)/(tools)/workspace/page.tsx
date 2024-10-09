"use client";

import { useEffect } from "react";

import { useInitialWorkspace } from "~/hooks";

const Workspace = () => {
  const { initialize } = useInitialWorkspace();

  useEffect(() => {
    initialize().catch((e) =>
      console.log(`[/workspace] Unexpected error: ${e}`),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default Workspace;
