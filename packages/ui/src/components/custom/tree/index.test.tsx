import { render } from "@testing-library/react";

import { TreeProvider } from ".";

describe("<TreeProvider />", () => {
  it("should render the default text", () => {
    const fetchItems = vi.fn().mockResolvedValue({ data: [] });
    const { getByText } = render(
      <TreeProvider fetchItems={fetchItems}>Tree</TreeProvider>,
    );
    expect(getByText("Tree")).toBeDefined();
  });
});
