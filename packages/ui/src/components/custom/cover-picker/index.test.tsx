import { render, type RenderResult } from "@testing-library/react";
import userEvent, { type UserEvent } from "@testing-library/user-event";

import { Button } from "@/components/ui/button";
import { CoverPicker } from ".";

describe("<CoverPicker />", () => {
  it("should render the default text", () => {
    const { getByText } = render(
      <CoverPicker asChild unsplashAPIKey="">
        <Button variant="outline">Change cover</Button>
      </CoverPicker>,
    );
    expect(getByText("Change cover")).toBeDefined();
  });
});

describe("<CoverPicker /> - Menu", () => {
  let rendered: RenderResult;
  let user: UserEvent;

  beforeEach(async () => {
    user = userEvent.setup();
    rendered = render(
      <CoverPicker asChild unsplashAPIKey="">
        <Button variant="outline">Change cover</Button>
      </CoverPicker>,
    );
    const display = rendered.getByRole("button", { name: "Change cover" });
    await user.click(display);
  });

  it("should render the default menu: Upload", () => {
    const menu = rendered.getByRole("dialog");
    expect(menu).toBeInTheDocument();

    const tab = rendered.getByRole("tab", { selected: true });
    expect(tab).toHaveTextContent(/Upload/);
    const tabPanel = rendered.getByRole("tabpanel");
    expect(tabPanel.id).toMatch(/upload/);
  });

  it("should switch to Link tab", async () => {
    const tab = rendered.getByRole("tab", { name: "Link" });
    await user.click(tab);
    expect(tab.ariaSelected).toBeTruthy();
    const tabPanel = rendered.getByRole("tabpanel");
    expect(tabPanel.id).toMatch(/link/);
  });
});
