import { render } from "@testing-library/react";

import { Unsplash } from ".";

describe("<Unsplash />", () => {
  it("should render the default text", () => {
    const { getByText } = render(<Unsplash apiKey="" />);
    expect(getByText("Unsplash")).toBeDefined();
  });
});
