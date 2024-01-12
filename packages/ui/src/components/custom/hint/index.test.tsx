import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Hint } from ".";

const description = "Shows some messages";

describe("<Hint />", () => {
  it("should render the default text", () => {
    const { getByText } = render(<Hint description={description}>Hover</Hint>);
    expect(getByText("Hover")).toBeDefined();
  });

  it("should render description on hover", async () => {
    const user = userEvent.setup();
    const hint = render(<Hint description={description}>Hover</Hint>);
    const ui = screen.getByRole("button");
    await user.hover(ui);
    await waitFor(() => {
      expect(hint.getByRole("tooltip")).toHaveTextContent(description);
    });
  });
});
