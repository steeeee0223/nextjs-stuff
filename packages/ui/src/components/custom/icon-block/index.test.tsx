import { render, type RenderResult } from "@testing-library/react";
import userEvent, { type UserEvent } from "@testing-library/user-event";

import "../../../../__test__/mock/intersection-observer";

import { IconBlock, type IconInfo } from ".";

describe("<IconBlock />", () => {
  it("should render the emoji", () => {
    const iconInfo: IconInfo = { type: "emoji", emoji: "🚀" };
    const { getByText } = render(
      <IconBlock defaultIcon={iconInfo} editable={false} />,
    );
    expect(getByText(iconInfo.emoji)).toBeDefined();
  });
  // it("should render the image url", async () => {
  //   const iconInfo: IconInfo = {
  //     type: "file",
  //     url: "https://github.com/shadcn.png",
  //   };
  //   const ui = render(<IconBlock defaultIcon={iconInfo} />);
  //   const img = await ui.findByRole("img");
  //   expect(img).toBeInTheDocument();
  // });
});

describe("<IconBlock /> - Menu", () => {
  let rendered: RenderResult;
  let user: UserEvent;

  beforeEach(async () => {
    user = userEvent.setup();
    const iconInfo: IconInfo = { type: "emoji", emoji: "🚀" };
    rendered = render(<IconBlock defaultIcon={iconInfo} editable />);
    const display = rendered.getByRole("button");
    await user.click(display);
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
    await user.click(tab);
    expect(tab.ariaSelected).toBeTruthy();
    const tabPanel = rendered.getByRole("tabpanel");
    expect(tabPanel.id).toMatch(/content-lucide/);
  });
});
