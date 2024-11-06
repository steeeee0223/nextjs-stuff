import { act, render, type RenderResult } from "@testing-library/react";
import userEvent, { type UserEvent } from "@testing-library/user-event";

import "../../../../__test__/mock/intersection-observer";

import { IconBlock, type IconInfo } from "../icon-block";
import { IconMenu } from "./icon-menu";

describe("<IconMenu />", () => {
  let rendered: RenderResult;
  let user: UserEvent;

  beforeEach(async () => {
    user = userEvent.setup();
    const icon: IconInfo = { type: "emoji", emoji: "🚀" };
    rendered = render(
      <IconMenu>
        <IconBlock icon={icon} />
      </IconMenu>,
    );
    const display = rendered.getByRole("button");
    await act(() => user.click(display));
  });

  it("should render the default menu: Emojis", () => {
    const menu = rendered.getByRole("dialog");
    expect(menu).toBeInTheDocument();

    const tab = rendered.getByRole("tab", { selected: true });
    expect(tab).toHaveTextContent(/Emojis/);
    const tabPanel = rendered.getByRole("tabpanel");
    expect(tabPanel.id).toMatch(/content-emoji/);
  });

  it("should switch to Lucide icon picker", async () => {
    const tab = rendered.getByRole("tab", { name: "Icons" });
    await act(() => user.click(tab));
    expect(tab.ariaSelected).toBeTruthy();
    const tabPanel = rendered.getByRole("tabpanel");
    expect(tabPanel.id).toMatch(/content-lucide/);
  });
});
