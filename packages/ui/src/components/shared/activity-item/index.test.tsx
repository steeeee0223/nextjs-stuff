import { render } from "@testing-library/react";

import { ActivityItem } from ".";
import { generateLogMessage, type Log } from "./index.utils";

const mockData: Log = {
  username: "John Doe",
  avatar: "https://github.com/shadcn.png",
  action: "CREATE",
  entity: { entityId: "1", title: "README.md", type: "note" },
  createdAt: new Date(),
};

describe("<ActivityItem />", () => {
  it("should render the log message", () => {
    const { container } = render(<ActivityItem data={mockData} />);
    expect(container).toHaveTextContent(generateLogMessage(mockData));
  });
});
