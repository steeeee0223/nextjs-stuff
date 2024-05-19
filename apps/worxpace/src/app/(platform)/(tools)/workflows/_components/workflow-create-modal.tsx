"use client";

import type { FC, ReactNode } from "react";

import { useModal } from "@acme/ui/custom";
import { cn } from "@acme/ui/lib";
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
} from "@acme/ui/shadcn";

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
            <DrawerDescription
              className={cn("flex items-center gap-4", "text-center")}
            >
              {subheading}
            </DrawerDescription>
          </DrawerHeader>
          <div className="h-96 flex-col overflow-scroll">{children}</div>
          <DrawerFooter
            className={cn(
              "flex items-center gap-4",
              "flex-col border-t-[1px] border-t-muted bg-background",
            )}
          >
            <DrawerClose asChild>
              <Button
                variant="ghost"
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
