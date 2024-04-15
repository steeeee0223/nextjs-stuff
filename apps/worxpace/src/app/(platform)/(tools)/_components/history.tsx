"use client";

import { useState } from "react";
import { HistoryIcon } from "lucide-react";

import { ActivityItem, Hint, Spinner } from "@acme/ui/custom";
import { cn } from "@acme/ui/lib";
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
  Separator,
} from "@acme/ui/shadcn";

import { theme } from "~/constants/theme";
import { useHistory } from "~/hooks";

interface HistoryProps {
  pageId: string | null;
}

const History = ({ pageId }: HistoryProps) => {
  const [open, setOpen] = useState(false);
  const { isLoading, logs, trigger } = useHistory(pageId);
  const handleClick = () => void trigger();
  const hint = `${open ? "Close" : "View"} all updates`;

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <Hint description={hint} className={theme.tooltip}>
        <DrawerTrigger asChild onClick={handleClick}>
          <Button variant="ghost" size="icon-nav">
            <HistoryIcon className={theme.size.icon} />
          </Button>
        </DrawerTrigger>
      </Hint>
      <DrawerContent
        showBar={false}
        className="inset-y-0 left-auto right-0 top-12 mt-0 w-[360px] rounded-none py-6"
      >
        <DrawerHeader className="py-2 text-sm font-semibold">
          Updates
        </DrawerHeader>
        <Separator className="mb-2" />
        {isLoading || !logs ? (
          <div className="inset-0 flex items-center justify-center py-4">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col gap-y-0 overflow-x-auto">
            {logs.map((log, i) => (
              <div key={i} className={cn(theme.bg.hover, "p-4")}>
                <ActivityItem data={log} />
              </div>
            ))}
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default History;
