import { createPlateEditor, Plate, PlateContent } from "@udecode/plate/react";

const emptyNode = [
  {
    children: [],
    type: "",
  },
];

export function PlateEditor() {
  const editor = createPlateEditor({
    value: emptyNode,
    plugins: [],
  });

  return (
    <Plate editor={editor}>
      <PlateContent className="p-4" />
    </Plate>
  );
}
