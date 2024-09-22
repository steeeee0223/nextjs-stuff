"use client";

import { useMemo, useState } from "react";

import { IconBlock, type IconBlockProps } from "./icon-block";
import {
  IconBlockContext,
  type IconBlockContextInterface,
} from "./icon-block-context";
import type { IconInfo } from "./index.types";

export interface IconBlockProviderProps extends IconBlockProps {
  defaultIcon: IconInfo;
  onSelect?: (iconInfo: IconInfo) => void;
  onRemove?: () => void;
  onUpload?: (file: File) => void;
}

export function IconBlockProvider({
  defaultIcon,
  onSelect,
  onRemove,
  onUpload,
  ...props
}: IconBlockProviderProps) {
  const [icon, setIcon] = useState(defaultIcon);

  const contextValue: IconBlockContextInterface = useMemo(
    () => ({
      currentIcon: icon,
      setIcon: (icon) => {
        setIcon(icon);
        onSelect?.(icon);
      },
      setColor: (color) => {
        if (props.editable && icon.type === "lucide") {
          setIcon((icon) => ({ ...icon, color }));
          onSelect?.(icon);
        }
      },
      remove: () => {
        setIcon({ type: "emoji", emoji: " " });
        onRemove?.();
      },
      upload: (file) => {
        const url = URL.createObjectURL(file);
        setIcon({ type: "file", url });
        onUpload?.(file);
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [icon, props.editable],
  );

  return (
    <IconBlockContext.Provider value={contextValue}>
      <IconBlock key={JSON.stringify(defaultIcon)} {...props} />
    </IconBlockContext.Provider>
  );
}
