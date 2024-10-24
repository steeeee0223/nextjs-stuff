import { render } from "@testing-library/react";

import { CRUDItem } from ".";

describe("<CRUDItem />", () => {
  it("should render the default text", () => {
    const { getByText } = render(<CRUDItem label="Item" />);
    expect(getByText("Item")).toBeDefined();
  });
});
