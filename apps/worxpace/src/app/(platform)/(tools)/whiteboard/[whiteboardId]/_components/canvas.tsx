"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { toast } from "sonner";

import type { Document } from "@swy/prisma";
import { type ExcalidrawElement } from "@swy/ui/shared";

import type { UpdateDocumentHandler } from "~/lib";

interface CanvasProps {
  board: Document;
  onUpdate?: UpdateDocumentHandler;
}

const Canvas = ({ board: { id, title, content }, onUpdate }: CanvasProps) => {
  const [whiteBoardData, setWhiteBoardData] = useState<
    readonly ExcalidrawElement[]
  >(content ? (JSON.parse(content) as readonly ExcalidrawElement[]) : []);
  const handleSave = async () => {
    await onUpdate?.({ id, content: JSON.stringify(whiteBoardData) });
    toast.success(`Updated whiteboard "${title}"`);
  };

  const CanvasPrimitive = useMemo(
    () =>
      dynamic(async () => {
        const { Canvas } = await import("@swy/ui/shared");
        return Canvas;
      }),
    [],
  );

  return (
    <div className="h-[calc(100vh-48px)]">
      <CanvasPrimitive
        data={whiteBoardData}
        onChange={setWhiteBoardData}
        onSave={handleSave}
      />
    </div>
  );
};

export default Canvas;
