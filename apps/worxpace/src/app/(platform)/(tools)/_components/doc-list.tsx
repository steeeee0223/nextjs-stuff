/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useRouter } from "next/navigation";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { Plus, PlusCircle, Search, Settings, Trash } from "lucide-react";
import { toast } from "sonner";

import {
  CRUDItem as Item,
  Popover,
  PopoverContent,
  PopoverTrigger,
  TreeList,
  useTree,
  useTreeAction,
} from "@acme/ui/components";
import { useAction } from "@acme/ui/hooks";
import { cn } from "@acme/ui/lib";

import { archiveDocument, createDocument } from "~/actions";
import { theme } from "~/constants/theme";
import { useClient, useSearch, useSettings } from "~/hooks";
import TrashBox from "./trash-box";

interface DocListProps {
  isMobile?: boolean;
}

const DocList = ({ isMobile }: DocListProps) => {
  const router = useRouter();
  const { path } = useClient();
  /** Search & Settings */
  const search = useSearch();
  const settings = useSettings();
  /** Docs */
  const { isLoading } = useTree();
  const { dispatch } = useTreeAction();
  const onError = (e: string) => toast.error(e);
  /** Action: Create */
  const { execute: create } = useAction(createDocument, {
    onSuccess: (data) => {
      const { id, title, parentId, icon } = data;
      dispatch({
        type: "add",
        payload: [{ id, title, parentId, icon, group: "document" }],
      });
      toast.success(`Document Created: ${title}`);
      router.push(`/documents/${id}`);
    },
    onError,
  });
  /** Action: Archive */
  const { execute: archive } = useAction(archiveDocument, {
    onSuccess: ({ item, ids }) => {
      dispatch({ type: "update:group", payload: { ids, group: "trash" } });
      toast.success(`Document "${item.title}" Moved to Trash`);
      router.push(path);
    },
    onError,
  });

  return (
    <>
      <div>
        <OrganizationSwitcher
          afterSelectPersonalUrl="/personal/:id"
          afterCreateOrganizationUrl="/organization/:id"
          afterSelectOrganizationUrl="/organization/:id"
          afterLeaveOrganizationUrl="/select-role"
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 6,
                padding: "14px 8px",
              },
              avatarBox: {
                borderRadius: 9999,
                height: "20px",
                width: "20px",
              },
              organizationSwitcherPopoverCard: {
                zIndex: 99999,
              },
            },
          }}
        />
        <Item
          label="Search"
          icon={Search}
          onClick={search.onOpen}
          shortcut="⌘K"
        />
        <Item
          label="Settings"
          icon={Settings}
          onClick={settings.onOpen}
          shortcut="⌘,"
        />
        <Item
          label="New page"
          icon={PlusCircle}
          onClick={() => create({ title: "Untitled" })}
        />
      </div>
      <div className="mt-4">
        <div className={cn(theme.flex.center, "px-3 py-1")}>
          <span className="grow pl-1.5 text-xs font-semibold text-primary/50">
            Documents
          </span>
          <div
            role="button"
            onClick={() => create({ title: "Untitled" })}
            className={cn(
              theme.bg.hover,
              "ml-auto h-full grow-0 rounded-sm p-0.5 opacity-0 hover:opacity-100",
            )}
          >
            <Plus className={cn(theme.size.icon, "text-muted-foreground")} />
          </div>
        </div>
        {isLoading ? (
          <>
            <div className="mt-2">
              {Array.from([0, 1, 0, 1, 1]).map((level, i) => (
                <Item.Skeleton key={i} level={level} />
              ))}
            </div>
          </>
        ) : (
          <TreeList
            group="document"
            parentId={null}
            onAddItem={(parentId) => create({ title: "Untitled", parentId })}
            onDeleteItem={(id) => archive({ id })}
          />
        )}
        <Popover>
          <PopoverTrigger className="mt-4 w-full">
            <Item label="Trash" icon={Trash} />
          </PopoverTrigger>
          <PopoverContent
            className="z-[99999] w-72 p-0"
            side={isMobile ? "bottom" : "right"}
          >
            <TrashBox />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default DocList;
