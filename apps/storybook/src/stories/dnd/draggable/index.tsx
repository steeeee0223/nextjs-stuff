import { useState } from "react";
import {
    DndContext,
    useSensor,
    MouseSensor,
    TouchSensor,
    KeyboardSensor,
    PointerActivationConstraint,
    Modifiers,
    useSensors,
} from "@dnd-kit/core";
import type { Coordinates } from "@dnd-kit/utilities";

import { Axis, DraggableItem } from "./draggable-item";
import { Wrapper } from "../_components";

export interface DraggableProps {
    activationConstraint?: PointerActivationConstraint;
    axis?: Axis;
    handle?: boolean;
    modifiers?: Modifiers;
    buttonStyle?: React.CSSProperties;
    style?: React.CSSProperties;
    label?: string;
}
export function Draggable({
    activationConstraint,
    axis,
    handle,
    label = "Go ahead, drag me.",
    modifiers,
    style,
    buttonStyle,
}: DraggableProps) {
    const [{ x, y }, setCoordinates] = useState<Coordinates>({ x: 0, y: 0 });
    const mouseSensor = useSensor(MouseSensor, { activationConstraint });
    const touchSensor = useSensor(TouchSensor, { activationConstraint });
    const keyboardSensor = useSensor(KeyboardSensor, {});
    const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

    return (
        <DndContext
            sensors={sensors}
            onDragEnd={({ delta }) => {
                setCoordinates(({ x, y }) => ({
                    x: x + delta.x,
                    y: y + delta.y,
                }));
            }}
            modifiers={modifiers}
        >
            <Wrapper>
                <DraggableItem
                    axis={axis}
                    label={label}
                    handle={handle}
                    top={y}
                    left={x}
                    style={style}
                    buttonStyle={buttonStyle}
                />
            </Wrapper>
        </DndContext>
    );
}
