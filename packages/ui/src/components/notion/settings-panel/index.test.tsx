import { render } from "@testing-library/react";

import { SettingsPanel } from ".";

describe("<SettingsPanel />", () => {
  it("should render the default text", () => {
    const { getByText } = render(<SettingsPanel />);
    expect(getByText("Settings Panel")).toBeDefined();
  });
});
