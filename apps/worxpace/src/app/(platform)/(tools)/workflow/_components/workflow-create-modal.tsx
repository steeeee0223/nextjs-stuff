"use client";

import type { FC, ReactNode } from "react";

import { useModal } from "@swy/ui/custom";
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPortal,
  DrawerTitle,
} from "@swy/ui/shadcn";

export interface WorkflowModalProps {
  title: string;
  subheading: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

const WorkflowModal: FC<WorkflowModalProps> = ({
  children,
  subheading,
  title,
}) => {
  const { isOpen, setClose } = useModal();
  const handleOpenChange = (open: boolean) => {
    if (!open) setClose();
  };

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={handleOpenChange}>
      <DrawerPortal>
        <DrawerContent
          showBar={false}
          className="inset-y-0 left-auto right-0 top-12 mt-0 w-[360px] rounded-none py-6"
        >
          <DrawerHeader>
            <DrawerTitle className="text-center">{title}</DrawerTitle>
            <DrawerDescription className="flex items-center gap-4 text-center">
              {subheading}
            </DrawerDescription>
          </DrawerHeader>
          <div className="h-96 flex-col overflow-scroll">{children}</div>
          <DrawerFooter className="flex flex-col items-center gap-4 border-t border-border">
            <DrawerClose asChild>
              <Button
                variant="subitem"
                className="w-full"
                onClick={() => setClose()}
              >
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
};

export default WorkflowModal;
