import { render } from "@testing-library/react";
import userEvent, { type UserEvent } from "@testing-library/user-event";

import { Cover } from ".";

const mock = {
  onRemove: vi.fn().mockImplementation(() => console.log(`removing`)),
};

describe("<Cover />", () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render the default component", () => {
    const rendered = render(<Cover url="/" unsplashAPIKey="" />);
    expect(rendered.container).toBeInTheDocument();
  });

  it("should not display buttons in preview state", async () => {
    const rendered = render(<Cover preview url="/" unsplashAPIKey="" />);
    await user.hover(rendered.container);
    const buttons = rendered.queryAllByRole("button");
    expect(buttons.length).toBe(0);
  });

  it("should display buttons on hover", async () => {
    const rendered = render(<Cover url="/" unsplashAPIKey="" />);
    await user.hover(rendered.container);
    const changeCoverButton = await rendered.findByRole("button", {
      name: "Change cover",
    });
    expect(changeCoverButton).toBeInTheDocument();

    const removeButton = await rendered.findByRole("button", {
      name: "Remove",
    });
    expect(removeButton).toBeInTheDocument();
  });

  it("should trigger `onRemove` while clicking the remove button", async () => {
    const rendered = render(
      <Cover url="/" unsplashAPIKey="" onRemove={mock.onRemove} />,
    );
    await user.hover(rendered.container);
    const removeButton = await rendered.findByRole("button", {
      name: "Remove",
    });
    await user.click(removeButton);
    expect(mock.onRemove).toHaveBeenCalledOnce();
  });
});
