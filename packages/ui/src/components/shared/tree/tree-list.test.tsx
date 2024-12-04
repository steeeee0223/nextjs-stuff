import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TreeList } from "./tree-list";
import type { TreeItemData, TreeNode } from "./types";

const nodes: TreeNode<TreeItemData>[] = [
  {
    id: "1",
    title: "item-1",
    children: [{ id: "2", parentId: "1", title: "item-2", children: [] }],
  },
  { id: "3", title: "item-3", children: [] },
];

describe("<TreeList />", () => {
  it("should see 2 folders initially", () => {
    const tree = render(<TreeList nodes={nodes} />);
    const items = tree.getAllByRole("button", { name: /item-\d/ });
    expect(items.length).toBe(2);
  });

  it("expand and collapse should work as expected", async () => {
    const user = userEvent.setup();
    const tree = render(<TreeList nodes={nodes} />);
    const item1 = tree.getByRole("button", { name: "item-1" });
    // Expand
    const expandButton = within(item1).getByRole("button", { name: "expand" });
    await user.click(expandButton);
    const item2 = await tree.findByRole("button", { name: "item-2" });
    expect(item2).toBeInTheDocument();
    // Collapse
    const collapseButton = within(item1).getByRole("button", {
      name: "collapse",
    });
    await user.click(collapseButton);
    expect(item2).not.toBeInTheDocument();
  });
});
