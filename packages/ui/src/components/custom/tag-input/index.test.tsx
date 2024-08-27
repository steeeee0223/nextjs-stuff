import { render, within } from "@testing-library/react";
import userEvent, { type UserEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { z } from "zod";

import { TagInput } from ".";

describe("<TagInput />", () => {
  const inputSchema = z.string().min(1, "Input cannot be empty");

  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it("should render the component", () => {
    const tagInput = render(<TagInput value={{ tags: [], input: "" }} />);
    expect(tagInput.getByRole("textbox")).toBeInTheDocument();
  });

  it("should add a tag on Enter key press", async () => {
    const onTagsChange = vi.fn();
    const onInputChange = vi.fn();

    const tagInput = render(
      <TagInput
        value={{ tags: [], input: "new-tag" }}
        inputSchema={inputSchema}
        onTagsChange={onTagsChange}
        onInputChange={onInputChange}
      />,
    );

    const input = tagInput.getByRole("textbox");
    await user.type(input, "{enter}");
    expect(onTagsChange).toHaveBeenCalledWith(["new-tag"]);
    expect(onInputChange).toHaveBeenCalledWith("");
  });

  it("should prevent adding an empty tag", async () => {
    const onTagsChange = vi.fn();
    const tagInput = render(
      <TagInput
        value={{ tags: [], input: "" }}
        inputSchema={inputSchema}
        onTagsChange={onTagsChange}
        onInputChange={vi.fn()}
      />,
    );

    const input = tagInput.getByRole("textbox");
    await user.type(input, "{enter}");
    expect(onTagsChange).not.toHaveBeenCalled();
  });

  it("should delete a tag when delete button is clicked", async () => {
    const onTagsChange = vi.fn();

    const tagInput = render(
      <TagInput
        value={{ tags: ["tag1", "tag2"], input: "" }}
        inputSchema={inputSchema}
        onTagsChange={onTagsChange}
        onInputChange={vi.fn()}
      />,
    );

    const badge = tagInput.getByRole("listitem", { name: "tag2" });
    const deleteButton = within(badge).getByRole("button");
    await user.click(deleteButton);
    // Remains `tag1`
    expect(onTagsChange).toHaveBeenCalledWith(["tag1"]);
  });

  it("should split comma-separated input into multiple tags", () => {
    const onTagsChange = vi.fn();

    render(
      <TagInput
        value={{ tags: [], input: "tag1, tag2, tag3" }}
        inputSchema={inputSchema}
        onTagsChange={onTagsChange}
        onInputChange={vi.fn()}
      />,
    );

    expect(onTagsChange).toHaveBeenCalledWith(["tag1", "tag2", "tag3"]);
  });

  it("should remove the last tag when Backspace is pressed and input is empty", async () => {
    const onTagsChange = vi.fn();
    const tagInput = render(
      <TagInput
        value={{ tags: ["tag1", "tag2"], input: "" }}
        inputSchema={inputSchema}
        onTagsChange={onTagsChange}
        onInputChange={vi.fn()}
      />,
    );

    const input = tagInput.getByRole("textbox");
    await user.type(input, "{backspace}");
    expect(onTagsChange).toHaveBeenCalledWith(["tag1"]);
  });
});
