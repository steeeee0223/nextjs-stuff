import { render } from "@testing-library/react";

import { Button } from "./button";

describe("<Button />", () => {
  it("should render the default text", () => {
    const { getByText } = render(<Button>Button</Button>);
    expect(getByText("Button")).toBeDefined();
  });
});
