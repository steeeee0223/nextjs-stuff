import { useRouter } from "next/navigation";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { PlusCircle, Search, Trash } from "lucide-react";
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

import { archiveDocument, createDocument } from "~/actions";
import { useSearch } from "~/hooks";
import TrashBox from "./trash-box";

interface DocListProps {
  isMobile?: boolean;
}

const DocList = ({ isMobile }: DocListProps) => {
  const router = useRouter();
  /** Search */
  const search = useSearch();
  /** Docs */
  const { isLoading } = useTree();
  const { dispatch } = useTreeAction();
  const onError = (e: string) => toast.error(e);
  /** Action: Create */
  const { execute: create } = useAction(createDocument, {
    onSuccess: (data) => {
      const { id, title, parentId, isArchived, icon } = data;
      dispatch({
        type: "add",
        payload: [{ id, title, parentId, isArchived, icon }],
      });
      toast.success(`Document Created: ${title}`);
      router.push(`/documents/${id}`);
    },
    onError,
  });
  /** Action: Archive */
  const { execute: archive } = useAction(archiveDocument, {
    onSuccess: (data) => {
      console.log(`archived`, data);
      dispatch({ type: "archive", payload: data });
      toast.success(`Document "${data.item.title}" Moved to Trash`);
      // router.push(`/documents`);
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
          label="New page"
          icon={PlusCircle}
          onClick={() => create({ title: "Untitled" })}
        />
      </div>
      <div className="mt-4">
        {isLoading ? (
          <>
            <div className="mt-4">
              {Array.from([0, 1, 0, 1, 1]).map((level, i) => (
                <Item.Skeleton key={i} level={level} />
              ))}
            </div>
          </>
        ) : (
          <TreeList
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
