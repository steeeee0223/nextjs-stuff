import { render } from "@testing-library/react";

import { Unsplash } from ".";

describe("<Unsplash />", () => {
  it("should render the default text", () => {
    const { getByText } = render(<Unsplash accessKey="" />);
    expect(getByText("Unsplash")).toBeDefined();
  });
});
