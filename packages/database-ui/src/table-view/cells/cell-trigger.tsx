import React from "react";

interface CellTriggerProps extends React.PropsWithChildren {
  onPointerDown: React.PointerEventHandler<HTMLDivElement>;
}

export const CellTrigger: React.FC<CellTriggerProps> = (props) => {
  return (
    <div
      role="button"
      tabIndex={0}
      className="transition-background-in relative block min-h-8 w-full cursor-pointer select-none overflow-clip whitespace-normal px-2 py-[5px] text-sm"
      {...props}
    />
  );
};
