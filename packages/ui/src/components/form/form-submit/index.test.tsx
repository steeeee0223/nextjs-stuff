import { render } from "@testing-library/react";

import { FormSubmit } from ".";

describe("<FormSubmit />", () => {
  it("should render the default text", () => {
    const { getByText } = render(<FormSubmit>Submit</FormSubmit>);
    expect(getByText("Submit")).toBeDefined();
  });
});
