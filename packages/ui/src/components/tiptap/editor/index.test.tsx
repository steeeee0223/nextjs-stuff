import { render } from "@testing-library/react";

import { TiptapEditor } from ".";

describe("<TiptapEditor />", () => {
  it("should render the component", () => {
    const meta = {
      settings: { lock: false },
      content: {},
    };
    const { container } = render(<TiptapEditor meta={meta} />);
    expect(container).toBeDefined();
  });
});
