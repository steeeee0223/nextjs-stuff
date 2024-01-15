import { render } from "@testing-library/react";

import type { Log } from "./index.utils";
import { ActivityItem } from ".";

const mockData: Log = {
  username: "John Doe",
  avatar: "https://github.com/shadcn.png",
  action: "CREATE",
  entity: { entityId: "1", title: "README.md", type: "note" },
  createdAt: new Date(),
};

describe("<ActivityItem />", () => {
  it("should render the username", () => {
    const { getByText } = render(<ActivityItem data={mockData} />);
    expect(getByText(mockData.username)).toBeDefined();
  });
});
