import { render } from "@testing-library/react";

import { TreeProvider } from ".";

describe("<TreeProvider />", () => {
  it("should render the default text", () => {
    const { getByText } = render(
      <TreeProvider initialItems={[]}>Tree</TreeProvider>,
    );
    expect(getByText("Tree")).toBeDefined();
  });
});
