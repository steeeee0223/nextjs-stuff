import { render } from "@testing-library/react";

import { Spinner } from ".";

describe("<Spinner />", () => {
  it("should render the component", () => {
    const { container } = render(<Spinner />);
    expect(container).toBeDefined();
  });
});
