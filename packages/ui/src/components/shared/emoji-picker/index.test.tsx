import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { EmojiPicker } from ".";

import "../../../../__test__/mock/intersection-observer";

describe("<IconPicker />", () => {
  it("should render the default text", () => {
    const { getByText } = render(<EmojiPicker>Icon Picker</EmojiPicker>);
    expect(getByText("Icon Picker")).toBeDefined();
  });

  it("should render the icon menu on click", async () => {
    const user = userEvent.setup();
    const iconPicker = render(<EmojiPicker>Icon Picker</EmojiPicker>);
    const ui = screen.getByRole("button");
    await act(() => user.click(ui));
    expect(iconPicker.getByRole("dialog")).toBeDefined();
  });
});
