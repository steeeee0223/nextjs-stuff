import { useModal } from "@acme/ui/custom";
import { Button, Dialog, DialogClose, DialogContent } from "@acme/ui/shadcn";

export const Modal = () => {
  const { isOpen, setClose } = useModal();
  return (
    <Dialog open={isOpen} onOpenChange={setClose}>
      <DialogContent className="flex items-center text-2xl font-bold">
        Modal
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
};

export const Trigger = () => {
  const { setOpen } = useModal();
  const handleClick = () => void setOpen(<Modal />);
  return (
    <Button onClick={handleClick} variant="outline">
      Open
    </Button>
  );
};
