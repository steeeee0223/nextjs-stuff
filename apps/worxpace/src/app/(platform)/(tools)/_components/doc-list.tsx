import { useRouter } from "next/navigation";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";

import {
  CRUDItem as Item,
  TreeList,
  useTree,
  useTreeAction,
} from "@acme/ui/components";
import { useAction } from "@acme/ui/hooks";

import { createDocument } from "~/actions";

interface DocListProps {
  isMobile?: boolean;
}

const DocList = ({ isMobile: _isMobile }: DocListProps) => {
  const _router = useRouter();
  /** Docs */
  const { isLoading } = useTree();
  const { dispatch } = useTreeAction();
  const onError = (e: string) => toast.error(e);
  /** Create */
  const { execute: create } = useAction(createDocument, {
    onSuccess: (data) => {
      const { id, title, parentId, isArchived, icon } = data;
      dispatch({
        type: "add",
        payload: [{ id, title, parentId, isArchived, icon }],
      });
      toast.success(`Document Created: ${title}`);
      // router.push(`/documents/${id}`);
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
          />
        )}
      </div>
    </>
  );
};

export default DocList;
