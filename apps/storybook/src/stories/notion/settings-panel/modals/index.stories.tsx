import type { Meta, StoryObj } from "@storybook/react";

import { ModalProvider, useModal } from "@swy/ui/custom";
import {
  AddMembers,
  DeleteAccount,
  DeleteGuest,
  DeleteMember,
  DeleteWorkspace,
  EmailSettings,
  PasswordForm,
} from "@swy/ui/notion";
import { Button, type ButtonProps } from "@swy/ui/shadcn";

import { mockMemberships, user, workspaces } from "../../__mock__";

const ModalTrigger = ({
  text,
  variant,
  children,
}: Pick<ButtonProps, "children" | "variant"> & { text: string }) => {
  const { setOpen } = useModal();
  const onClick = () => setOpen(children);
  return (
    <Button variant={variant} size="sm" onClick={onClick}>
      {text}
    </Button>
  );
};

const meta = {
  title: "notion/Settings Panel/Modals",
  component: ModalTrigger,
  parameters: { layout: "centered" },
  render: (props) => (
    <ModalProvider>
      <ModalTrigger {...props} />
    </ModalProvider>
  ),
} satisfies Meta<typeof ModalTrigger>;
export default meta;

type Story = StoryObj<typeof meta>;

const { members, guests } = mockMemberships;
export const AddMembersModal: Story = {
  args: {
    children: (
      <AddMembers
        invitedMembers={[
          ...members.map(({ user }) => user),
          ...guests.map(({ user }) => user),
        ]}
        onAdd={(emails, role) => console.log(`Adding ${role}s: `, emails)}
      />
    ),
    text: "Add Members",
    variant: "blue",
  },
};
export const DeleteAccountModal: Story = {
  args: {
    children: <DeleteAccount email={user.email} />,
    text: "Delete Account",
    variant: "red:fill",
  },
};
export const DeleteGuestModal: Story = {
  args: {
    children: <DeleteGuest name={user.name} />,
    text: "Delete Guest",
    variant: "red:fill",
  },
};
export const DeleteMemberModal: Story = {
  args: {
    children: <DeleteMember />,
    text: "Delete Member",
    variant: "red:fill",
  },
};
export const DeleteWorkspaceModal: Story = {
  args: {
    children: <DeleteWorkspace name={workspaces[0]!.name} />,
    text: "Delete Workspace",
    variant: "red:fill",
  },
};
export const EmailSettingsModal: Story = {
  args: {
    children: <EmailSettings email={user.email} />,
    text: "Update Email",
  },
};
export const SetPasswordModal: Story = {
  args: {
    children: <PasswordForm hasPassword={false} />,
    text: "Set Password",
  },
};
export const ChangePasswordModal: Story = {
  args: {
    children: <PasswordForm hasPassword />,
    text: "Change Password",
  },
};
