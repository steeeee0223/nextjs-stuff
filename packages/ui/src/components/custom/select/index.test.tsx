import { render } from "@testing-library/react";

import { Select, type SelectProps } from ".";

const options = {
  on: { label: "On" },
  off: { label: "Off" },
};

describe("<Select />", () => {
  it("should render with default option", () => {
    const select = render(<Select value="on" options={options} />);
    expect(select.container).toBeInTheDocument();

    const display = select.getByRole("combobox");
    expect(display).toHaveTextContent("On");
  });

  it("should render with custom display", () => {
    const CustomDisplay: SelectProps["customDisplay"] = ({ option }) => (
      <div>{`Currently ${typeof option === "string" ? option : option?.label}`}</div>
    );
    const select = render(
      <Select value="on" options={options} customDisplay={CustomDisplay} />,
    );
    const display = select.getByRole("combobox");
    expect(display).toHaveTextContent(/^Currently On$/i);
  });
});
