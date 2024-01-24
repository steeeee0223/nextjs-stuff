import { type PropsWithChildren } from "react";
import { redirect } from "next/navigation";

interface Params extends PropsWithChildren {
  params: { role: string };
}

const RoleLayout = ({ children, params: { role } }: Params) => {
  if (role !== "admin" && role !== "personal" && role !== "organization")
    redirect("/select-role");
  return <>{children}</>;
};

export default RoleLayout;
