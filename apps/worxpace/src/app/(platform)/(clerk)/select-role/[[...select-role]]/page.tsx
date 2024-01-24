import { OrganizationList } from "@clerk/nextjs";

export default function Page() {
  return (
    <OrganizationList
      afterSelectPersonalUrl="/personal/:id"
      afterSelectOrganizationUrl="/organization/:id"
      afterCreateOrganizationUrl="/organization/:id"
    />
  );
}
