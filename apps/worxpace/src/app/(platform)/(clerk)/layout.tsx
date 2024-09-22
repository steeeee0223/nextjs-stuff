import { PropsWithChildren } from "react";

const ClerkLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-screen items-center justify-center">{children}</div>
  );
};

export default ClerkLayout;
