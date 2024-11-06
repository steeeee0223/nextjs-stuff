import { act, render } from "@testing-library/react";

import "../../../../__test__/mock/intersection-observer";

import { IconBlock } from "./icon-block";
import type { IconInfo } from "./types";

describe("<IconBlock />", () => {
  it("should render the emoji", () => {
    const icon: IconInfo = { type: "emoji", emoji: "🚀" };
    const { getByText } = render(<IconBlock icon={icon} />);
    expect(getByText(icon.emoji)).toBeInTheDocument();
  });

  it("should render the first letter", () => {
    const icon: IconInfo = { type: "text", text: "John" };
    const { getByText } = render(<IconBlock icon={icon} />);
    expect(getByText(icon.text[0]!)).toBeInTheDocument();
  });

  it("should render the Lucide icon", async () => {
    const icon: IconInfo = { type: "lucide", name: "apple" };
    const block = await act(() => render(<IconBlock icon={icon} />));
    const lucideIcon = await block.findByLabelText(icon.name);
    expect(lucideIcon).toBeInTheDocument();
  });

  describe("with url type", () => {
    /**
     * @see https://github.com/radix-ui/primitives/blob/main/packages/react/avatar/src/Avatar.test.tsx
     */
    const orignalGlobalImage = window.Image;

    beforeAll(() => {
      (window.Image as unknown) = class MockImage {
        onload = () => console.log("loading");
        src = "";
        constructor() {
          setTimeout(() => this.onload(), 500);
          return this;
        }
      };
    });

    afterAll(() => {
      window.Image = orignalGlobalImage;
    });

    it("should render the fallback loader", () => {
      const icon: IconInfo = {
        type: "file",
        url: "https://github.com/shadcn.png",
      };
      const ui = render(<IconBlock icon={icon} />);
      const loader = ui.getByLabelText("spinner");
      expect(loader).toBeInTheDocument();
    });

    it("should render the image when loaded", async () => {
      const icon: IconInfo = {
        type: "file",
        url: "https://github.com/shadcn.png",
      };
      const ui = render(<IconBlock icon={icon} />);
      const img = await ui.findByRole("img");
      expect(img).toHaveAttribute("src", icon.url);
    });
  });
});
