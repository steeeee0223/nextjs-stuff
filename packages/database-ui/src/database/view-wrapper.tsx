import React from "react";

import { paddingX } from "./constant";

export const ViewWrapper: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <div
      contentEditable={false}
      data-content-editable-void
      className="max-h-inherit relative flex w-screen shrink-0 grow flex-col"
      style={{ left: `-${paddingX}px` }}
    >
      <div className="relative">
        <div className="z-10 mb-0 mr-0 h-full shrink-0 grow overflow-x-auto overflow-y-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};
