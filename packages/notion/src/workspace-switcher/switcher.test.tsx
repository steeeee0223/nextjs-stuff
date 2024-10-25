import { render } from "@testing-library/react";

import { user, workspaces } from "../__mock__";
import { WorkspaceProvider } from "../workspace-provider";
import { WorkspaceSwitcher } from "./switcher";

describe("<WorkspaceSwitcher />", () => {
  it("should render the default workspace", () => {
    const { getByText } = render(
      <WorkspaceProvider
        user={user}
        workspaces={workspaces}
        initial="workspace-0"
      >
        <WorkspaceSwitcher />
      </WorkspaceProvider>,
    );
    expect(getByText("John's Private")).toBeDefined();
  });
});
