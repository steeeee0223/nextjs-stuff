import { Button, Dialog, DialogClose, DialogContent } from "@swy/ui/shadcn";
import { useModal } from "@swy/ui/shared";

export const Modal = () => {
  const { isOpen, setClose } = useModal();
  return (
    <Dialog open={isOpen} onOpenChange={setClose}>
      <DialogContent noTitle className="flex items-center text-2xl font-bold">
        Modal
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
};

export const Trigger = () => {
  const { setOpen } = useModal();
  const handleClick = () => void setOpen(<Modal />);
  return <Button onClick={handleClick}>Open</Button>;
};
