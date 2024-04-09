import { render } from "@testing-library/react";

import { Button } from "@/components/ui/button";
import { CoverPicker } from ".";

describe("<CoverPicker />", () => {
  it("should render the default text", () => {
    const { getByText } = render(
      <CoverPicker asChild>
        <Button variant="outline">Change cover</Button>
      </CoverPicker>,
    );
    expect(getByText("Change cover")).toBeDefined();
  });
});
