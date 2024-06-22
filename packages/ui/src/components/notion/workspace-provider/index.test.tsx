import { render } from "@testing-library/react";

import { WorkspaceProvider, WorkspaceSwitcher } from ".";
import { user, workspaces } from "../__mock__";

describe("<WorkspaceSwitcher />", () => {
  it("should render the default workspace", () => {
    const { getByText } = render(
      <WorkspaceProvider
        user={user}
        workspaces={workspaces}
        initial="dummy-workspace-personal"
      >
        <WorkspaceSwitcher />
      </WorkspaceProvider>,
    );
    expect(getByText("John's Workspace")).toBeDefined();
  });
});
