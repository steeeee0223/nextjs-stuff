import { OrganizationList } from "@clerk/nextjs";

export default function Page() {
  return <OrganizationList afterSelectPersonalUrl="/workspace" />;
}
