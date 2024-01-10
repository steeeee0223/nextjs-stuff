import { render } from "@testing-library/react";

import { BlockEditor } from "../block-editor";

describe("<BlockEditor />", () => {
  it("should render the default text", () => {
    const { getByText } = render(<BlockEditor />);
    expect(getByText("Block-Editor")).toBeDefined();
  });
});
