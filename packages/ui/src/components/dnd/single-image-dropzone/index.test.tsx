import { render } from "@testing-library/react";

import { SingleImageDropzone } from ".";

describe("<SingleImageDropzone />", () => {
  it("should render the default component", () => {
    const { container } = render(<SingleImageDropzone />);
    expect(container).toBeDefined();
  });
});
