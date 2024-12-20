import { DatabaseIcon, Ellipsis, Plus } from "lucide-react";

import {
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@swy/ui/shadcn";

import { TableView } from "../table-view";
import { ButtonGroup } from "./button-group";
import { ViewWrapper } from "./view-wrapper";

export const Database = () => {
  return (
    <Tabs
      defaultValue="members"
      className="group/database relative mt-1 w-full"
    >
      <TabsList className="gap-3 overflow-y-auto p-0">
        <div className="flex grow items-center">
          <TabsTrigger value="members">Members</TabsTrigger>
          <Button
            variant="nav"
            size="icon-md"
            className="size-6 opacity-0 group-hover/database:opacity-100"
          >
            <Plus className="size-3.5 flex-shrink-0 text-primary/45 dark:text-primary/45" />
          </Button>
        </div>
        <ButtonGroup className="opacity-0 group-hover/database:opacity-100" />
      </TabsList>
      <div className="flex w-full items-center justify-between pt-2">
        <div className="mx-1 flex items-center gap-1">
          <DatabaseIcon className="relative size-6 flex-shrink-0" />
          <div className="w-full max-w-full whitespace-pre-wrap break-words text-[22px] font-bold caret-primary">
            Title
          </div>
          <Button
            variant="nav"
            size="icon-md"
            className="size-6 flex-shrink-0 opacity-0 group-hover/database:opacity-100"
          >
            <Ellipsis className="size-3.5 flex-shrink-0 text-primary/45 dark:text-primary/45" />
          </Button>
        </div>
      </div>
      <TabsContent value="members" className="mt-0">
        <ViewWrapper>
          <TableView />
        </ViewWrapper>
      </TabsContent>
    </Tabs>
  );
};
