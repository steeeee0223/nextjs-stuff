"use client";

import React from "react";
import { Excalidraw, WelcomeScreen } from "@excalidraw/excalidraw";
import type { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import type { ExcalidrawProps } from "@excalidraw/excalidraw/types/types";
import { useTheme } from "next-themes";

import { SaveButton } from "./_components";

interface CanvasProps {
  data: readonly ExcalidrawElement[];
  onChange?: ExcalidrawProps["onChange"];
  onSave?: () => void;
}

export const Canvas: React.FC<CanvasProps> = ({ data, onChange, onSave }) => {
  const { resolvedTheme } = useTheme();

  return (
    <Excalidraw
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      initialData={{ elements: data }}
      onChange={onChange}
      renderTopRightUI={() => <SaveButton onClick={onSave} />}
      UIOptions={{}}
    >
      <WelcomeScreen>
        <WelcomeScreen.Hints.MenuHint />
        <WelcomeScreen.Hints.MenuHint />
        <WelcomeScreen.Hints.ToolbarHint />
        <WelcomeScreen.Hints.HelpHint />
        <WelcomeScreen.Center>
          <WelcomeScreen.Center.Heading>
            Draw Something!
          </WelcomeScreen.Center.Heading>
        </WelcomeScreen.Center>
      </WelcomeScreen>
    </Excalidraw>
  );
};

export type { ExcalidrawElement };
