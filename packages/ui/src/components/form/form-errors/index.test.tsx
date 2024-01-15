import { render } from "@testing-library/react";

import { FormErrors } from ".";

const mockData = {
  id: "email",
  errors: { email: ["Email should contain an `@` sign"] },
};

describe("<FormErrors />", () => {
  it("should render the default text", () => {
    const { getByText } = render(<FormErrors {...mockData} />);
    expect(getByText(mockData.errors.email.toString())).toBeDefined();
  });
});
