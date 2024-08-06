import { act, render, type RenderResult } from "@testing-library/react";
import userEvent, { type UserEvent } from "@testing-library/user-event";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { ModalProvider, useModal } from ".";

const Modal = () => {
  const { isOpen, setClose } = useModal();
  return (
    <Dialog open={isOpen} onOpenChange={setClose}>
      <DialogContent noTitle>
        Modal
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
};

const Trigger = () => {
  const { setOpen } = useModal();
  const handleClick = () => void setOpen(<Modal />);
  return <Button onClick={handleClick}>Open</Button>;
};

describe("<ModalProvider />", () => {
  let rendered: RenderResult;
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
    rendered = render(
      <ModalProvider>
        <Trigger />
      </ModalProvider>,
    );
  });

  it("should render the modal trigger button", () => {
    const trigger = rendered.getByRole("button", { name: "Open" });
    expect(trigger).toBeInTheDocument();
  });

  it("should open the modal on trigger button", async () => {
    const trigger = rendered.getByRole("button", { name: "Open" });
    await act(() => user.click(trigger));

    const modal = rendered.getByRole("dialog");
    expect(modal).toHaveTextContent("Modal");
  });

  it("should close the modal on trigger the close button in modal", async () => {
    const trigger = rendered.getByRole("button", { name: "Open" });
    await act(() => user.click(trigger));

    const close = rendered.getByRole("button", { name: "Close" });
    await act(() => user.click(close));
    const modal = rendered.queryByRole("dialog");
    expect(modal).not.toBeInTheDocument();
  });
});
