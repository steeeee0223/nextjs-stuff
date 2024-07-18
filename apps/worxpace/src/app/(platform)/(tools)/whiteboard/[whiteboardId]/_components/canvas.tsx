"use client";

import { useState } from "react";
import { Excalidraw, WelcomeScreen } from "@excalidraw/excalidraw";
import type { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import { SaveIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";

import type { Document } from "@acme/prisma";
import { Button, type ButtonProps } from "@acme/ui/shadcn";

import { type UpdateDocumentHandler } from "~/lib";

interface CanvasProps {
  board: Document;
  onUpdate?: UpdateDocumentHandler;
}

const SaveButton = ({ onClick }: Pick<ButtonProps, "onClick">) => {
  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-lg"
      onClick={onClick}
    >
      <SaveIcon className="h-4 w-4" />
    </Button>
  );
};

const Canvas = ({ board: { id, title, content }, onUpdate }: CanvasProps) => {
  const { resolvedTheme } = useTheme();
  const [whiteBoardData, setWhiteBoardData] = useState<
    readonly ExcalidrawElement[]
  >(content ? (JSON.parse(content) as readonly ExcalidrawElement[]) : []);
  const handleSave = async () => {
    await onUpdate?.({ id, content: JSON.stringify(whiteBoardData) });
    toast.success(`Updated whiteboard "${title}"`);
  };

  return (
    <div className="h-[calc(100vh-48px)]">
      <Excalidraw
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        initialData={{ elements: whiteBoardData }}
        onChange={(excalidrawElements) => setWhiteBoardData(excalidrawElements)}
        renderTopRightUI={() => <SaveButton onClick={handleSave} />}
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
    </div>
  );
};

export default Canvas;
