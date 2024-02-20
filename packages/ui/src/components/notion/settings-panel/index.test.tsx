import { render } from "@testing-library/react";

import { SettingsPanel } from ".";

describe("<SettingsPanel />", () => {
  it("should render component", () => {
    const { container } = render(<SettingsPanel />);
    expect(container).toBeDefined();
  });
});
