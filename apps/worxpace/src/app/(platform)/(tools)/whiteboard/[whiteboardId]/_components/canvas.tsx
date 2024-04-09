"use client";

import { useState } from "react";
import { Excalidraw, WelcomeScreen } from "@excalidraw/excalidraw";
import type { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import { SaveIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

import type { Document } from "@acme/prisma";
import { Button, type ButtonProps } from "@acme/ui/shadcn";

import { updateInternalDocument } from "~/actions";

interface CanvasProps {
  board: Document;
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

const Canvas = ({ board: { id, content } }: CanvasProps) => {
  const { resolvedTheme } = useTheme();
  const [whiteBoardData, setWhiteBoardData] = useState<
    readonly ExcalidrawElement[]
  >(content ? (JSON.parse(content) as readonly ExcalidrawElement[]) : []);

  const { trigger: update } = useSWRMutation(
    [id, false],
    updateInternalDocument,
    {
      onSuccess: ({ title }) => toast.success(`Updated whiteboard "${title}"`),
      onError: (e: Error) => toast.error(e.message),
    },
  );
  const handleSave = () =>
    void update({ id, content: JSON.stringify(whiteBoardData) });

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
