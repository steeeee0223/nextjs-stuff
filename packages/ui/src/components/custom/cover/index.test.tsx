import { render } from "@testing-library/react";

import { Cover } from ".";

describe("<Cover />", () => {
  it("should render the default component", () => {
    const { container } = render(<Cover url="/" />);
    expect(container).toBeDefined();
  });
});
