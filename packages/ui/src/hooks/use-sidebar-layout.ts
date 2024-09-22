"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  getPanelElement,
  getPanelGroupElement,
  ImperativePanelHandle,
} from "react-resizable-panels";
import { useMediaQuery } from "usehooks-ts";

/**
 * Custom hook to get the width of a panel from `react-resizable-panels`.
 * @param groupId The id of the panel group.
 * @param panelId The id of the panel to get the width of.
 * @param minWidthPixels The min width on the panel (in pixels).
 */
export function useSidebarLayout(
  groupId: string,
  panelId: string,
  minWidthPixels: number,
) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [width, setWidth] = useState<number>();
  const [minSize, setMinSize] = useState<number>(10);

  const ref = useRef<ImperativePanelHandle>(null);
  const [isResizing, setIsResizing] = useState(false);

  const collapse = () => {
    setIsResizing(true);
    ref.current?.collapse();
    setTimeout(() => setIsResizing(false), 300);
  };
  const expand = () => {
    setIsResizing(true);
    ref.current?.resize(minSize);
    setTimeout(() => setIsResizing(false), 300);
  };

  useEffect(() => {
    const panel = getPanelElement(panelId);
    if (panel) {
      const observer = new ResizeObserver(() => {
        setWidth(panel.offsetWidth);
      });
      observer.observe(panel);
      return () => observer.disconnect();
    }
  });

  useLayoutEffect(() => {
    const panelGroup = getPanelGroupElement(groupId);
    if (panelGroup) {
      const observer = new ResizeObserver(() =>
        setMinSize((minWidthPixels / panelGroup.offsetWidth) * 100),
      );
      observer.observe(panelGroup);
      return () => observer.disconnect();
    }
  }, [groupId, minWidthPixels]);

  useLayoutEffect(() => {
    const panel = ref.current;
    if (panel) {
      panel.resize(minSize);
    }
  }, [minSize, ref]);

  return {
    width,
    minSize,
    collapse,
    expand,
    ref,
    isResizing,
    isMobile,
    isCollapsed: ref.current?.isCollapsed(),
  };
}
