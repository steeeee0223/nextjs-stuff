import { render } from "@testing-library/react";

import { WorkspaceSwitcher } from ".";
import { mockUser, mockWorkspace } from "./mock";

describe("<WorkspaceSwitcher />", () => {
  it("should render the default text", () => {
    const { getByText } = render(
      <WorkspaceSwitcher
        initialUser={mockUser}
        initialWorkspace={mockWorkspace}
      />,
    );
    expect(getByText(mockWorkspace.name)).toBeDefined();
  });
});
