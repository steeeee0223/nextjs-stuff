import { render } from "@testing-library/react";

import { user, workspaces } from "../__mock__";
import { WorkspaceSwitcher2 } from "./switcher";

describe("<WorkspaceSwitcher2 />", () => {
  it("should render the default workspace", () => {
    const { getByText } = render(
      <WorkspaceSwitcher2
        user={user}
        workspaces={workspaces}
        activeWorkspace={workspaces[0]!}
      />,
    );
    expect(getByText("John's Private")).toBeDefined();
  });
});
