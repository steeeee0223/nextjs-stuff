import { render } from "@testing-library/react";

import { KanbanProvider } from ".";

describe("<KanbanProvider />", () => {
  it("should render the component", () => {
    const { getByRole } = render(
      <KanbanProvider initialLists={[]}>Kanban</KanbanProvider>,
    );
    expect(getByRole("list")).toBeDefined();
  });
});
