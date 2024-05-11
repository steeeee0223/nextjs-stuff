import { act, render, screen } from "@testing-library/react";
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
    await act(() => user.click(ui));
    expect(iconPicker.getByRole("dialog")).toBeDefined();
  });
});
