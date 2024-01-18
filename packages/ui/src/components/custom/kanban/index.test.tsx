import { render } from "@testing-library/react";

import { KanbanProvider } from ".";

describe("<KanbanProvider />", () => {
  it("should render the component", () => {
    const fetchLists = vi.fn().mockResolvedValue({ data: [] });
    const { getByRole } = render(
      <KanbanProvider fetchLists={fetchLists}>Kanban</KanbanProvider>,
    );
    expect(getByRole("list")).toBeDefined();
  });
});
