import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { IconPicker } from ".";

import "../../../../__test__/mock/intersection-observer";

describe("<IconPicker />", () => {
  it("should render the default text", () => {
    const { getByText } = render(<IconPicker>Icon Picker</IconPicker>);
    expect(getByText("Icon Picker")).toBeDefined();
  });

  it("should render the icon menu on click", async () => {
    const user = userEvent.setup();
    const iconPicker = render(<IconPicker>Icon Picker</IconPicker>);
    const ui = screen.getByRole("button");
    await user.click(ui);
    await waitFor(() => {
      expect(iconPicker.getByRole("dialog")).toBeDefined();
    });
  });
});
