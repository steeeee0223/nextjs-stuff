"use client";

import { useState, useTransition } from "react";
import { ChevronsRight, HistoryIcon } from "lucide-react";
import { toast } from "sonner";

import { ActivityItem, type Log } from "@/components/custom/activity-item";
import { Hint } from "@/components/custom/hint";
import { Spinner } from "@/components/custom/spinner";
import type { PageContextInterface } from "@/components/notion/page-provider";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface HistoryProps {
  pageId: string;
  fetchLogs?: PageContextInterface["fetchLogs"];
}

export const History = ({ pageId, fetchLogs }: HistoryProps) => {
  const [open, setOpen] = useState(false);
  const [logs, setLogs] = useState<Log[]>([]);
  const [isLoading, startTransition] = useTransition();
  const handleClick = () =>
    startTransition(
      () =>
        void fetchLogs?.(pageId)
          .then((data) => setLogs(data))
          .catch(() => toast.message("Error while fetching logs")),
    );
  const hint = `${open ? "Close" : "View"} all updates`;

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <Hint description={hint} asChild>
        <DrawerTrigger asChild>
          <Button variant="nav" size="icon-md" onClick={handleClick}>
            <HistoryIcon className="size-4" />
          </Button>
        </DrawerTrigger>
      </Hint>
      <DrawerContent
        showBar={false}
        className="inset-y-0 left-auto right-0 mt-0 h-screen w-[360px] rounded-none border-r-0 border-t-0"
        noTitle
      >
        <div className="absolute left-0 top-0 ml-2.5 flex h-12 items-center">
          <Hint asChild description="Close panel">
            <Button
              variant="hint"
              onClick={() => setOpen(false)}
              className="size-6 p-0 transition"
            >
              <ChevronsRight className="size-4" />
            </Button>
          </Hint>
        </div>
        <div className="relative top-12 flex-1 bg-main">
          <Tabs defaultValue="updates" className="relative my-0.5 w-full">
            <TabsList>
              <TabsTrigger value="updates">Updates</TabsTrigger>
            </TabsList>
            <TabsContent value="updates" className="bg-main pt-3">
              {isLoading ? (
                <div className="inset-0 flex items-center justify-center py-4">
                  <Spinner />
                </div>
              ) : (
                <div className="flex flex-col gap-y-0 overflow-x-auto">
                  {logs.map((log, i) => (
                    <div key={i} className="p-4 hover:bg-primary/5">
                      <ActivityItem data={log} />
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
