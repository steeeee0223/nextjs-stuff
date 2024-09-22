"use client";

import { useTransition } from "react";

import { useModal } from "@/components/custom/modal-provider";
import { Spinner } from "@/components/custom/spinner";
import { UserX } from "@/components/notion/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface DeleteMemberProps {
  onDelete?: () => void;
}

export const DeleteMember = ({ onDelete }: DeleteMemberProps) => {
  const { isOpen, setClose } = useModal();
  const [loading, startTransition] = useTransition();

  const onRemove = () =>
    startTransition(() => {
      onDelete?.();
      setClose();
    });

  return (
    <Dialog open={isOpen} onOpenChange={setClose}>
      <DialogContent
        forceMount
        className="flex w-[406px] flex-col items-start justify-center gap-6 p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <div className="flex items-center justify-center">
            <UserX className="size-9 flex-shrink-0 fill-primary/45 p-1" />
          </div>
          <DialogTitle className="px-6 text-lg/[22px]">
            Why are you removing this member from your workspace?
          </DialogTitle>
          <DialogDescription>
            We&apos;d love your input to make Notion better
          </DialogDescription>
        </DialogHeader>
        <Card className="w-full" asButton={false}>
          <CardContent className="flex w-full flex-col items-start gap-4 p-4">
            {options.map((option, i) => (
              <div key={i} className="flex items-center gap-2">
                <Checkbox id={option} size="xs" className="border-[1.5px]" />
                <Label htmlFor={option}>{option} </Label>
              </div>
            ))}
          </CardContent>
        </Card>
        <DialogFooter>
          <Button
            onClick={onRemove}
            variant="blue"
            size="sm"
            className="w-full font-semibold"
          >
            Continue
            {loading && <Spinner className="ml-2 text-white" />}
          </Button>
          <Button
            onClick={setClose}
            variant="hint"
            size="sm"
            className="h-7 w-fit"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const options = [
  "No longer need access to Notion",
  "Not using it enough",
  "Too expensive",
  "Switching to another tool",
  "No longer works here",
  "Switching to another Notion workspace",
  "Other",
];
