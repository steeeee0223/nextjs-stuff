import { CSSProperties } from "react";
import { useDraggable } from "@dnd-kit/core";
import { GripVertical, Move, MoveHorizontal, MoveVertical } from "lucide-react";

import { Button, Label } from "@acme/ui/components";
import { cn } from "@acme/ui/lib";

import { Action } from "../_components/action";
import styles from "../_components/draggable.module.css";

export enum Axis {
  All,
  Vertical,
  Horizontal,
}
export interface DraggableItemProps {
  label: string;
  handle?: boolean;
  style?: CSSProperties;
  buttonStyle?: CSSProperties;
  axis?: Axis;
  top?: number;
  left?: number;
}
const MoveIcon = ({ axis, className }: { axis?: Axis; className?: string }) => {
  switch (axis) {
    case Axis.Horizontal:
      return <MoveHorizontal className={className} />;
    case Axis.Vertical:
      return <MoveVertical className={className} />;
    default:
      return <Move className={className} />;
  }
};

export function DraggableItem({
  axis,
  label,
  style,
  top,
  left,
  handle,
  buttonStyle,
}: DraggableItemProps) {
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useDraggable({ id: "draggable" });

  return (
    <div
      className={cn(
        styles.Draggable,
        // dragOverlay && styles.dragOverlay,
        isDragging && styles.dragging,
        handle && styles.handle,
      )}
      style={
        {
          ...style,
          top,
          left,
          "--translate-x": `${transform?.x ?? 0}px`,
          "--translate-y": `${transform?.y ?? 0}px`,
        } as CSSProperties
      }
    >
      <Button
        {...attributes}
        ref={setNodeRef}
        aria-label="Draggable"
        data-cypress="draggable-item"
        {...(handle ? {} : listeners)}
        tabIndex={handle ? -1 : undefined}
        style={buttonStyle}
      >
        <MoveIcon axis={axis} className="mr-2" />
        draggable
        {handle && (
          <Action {...(handle ? listeners : {})}>
            <GripVertical className="ml-2" />
          </Action>
        )}
      </Button>
      {label && <Label>{label}</Label>}
    </div>
  );
}
