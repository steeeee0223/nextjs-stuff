import { OrganizationSwitcher } from "@clerk/nextjs";

interface DocListProps {
  isMobile?: boolean;
}

const DocList = ({ isMobile }: DocListProps) => {
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
      </div>
      <div className="mt-4">Doc Items</div>
    </>
  );
};

export default DocList;
