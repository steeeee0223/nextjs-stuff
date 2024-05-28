import { render, renderHook } from "@testing-library/react";

import { SettingsPanel, useSettingsStore } from ".";

describe("<SettingsPanel />", () => {
  it("should render component", () => {
    const { result } = renderHook(() => useSettingsStore());
    const { container } = render(<SettingsPanel settings={result.current} />);
    expect(container).toBeDefined();
  });
});
