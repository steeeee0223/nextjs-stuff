import { render } from "@testing-library/react";
import { File } from "lucide-react";

import { CRUDItem } from ".";

describe("<CRUDItem />", () => {
  it("should render the default text", () => {
    const { getByText } = render(<CRUDItem label="Item" icon={File} />);
    expect(getByText("Item")).toBeDefined();
  });
});
