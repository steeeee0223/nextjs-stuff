import type { Meta, StoryObj } from "@storybook/react";

import { ModalProvider, useModal } from "@acme/ui/custom";
import { AddMembers } from "@acme/ui/notion";
import { Button, type ButtonProps } from "@acme/ui/shadcn";

import { mockMemberships } from "../../__mock__";

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
  tags: ["!autodocs"],
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
          ...members.map(({ account }) => account),
          ...guests.map(({ account }) => account),
        ]}
        onAdd={(emails, role) => console.log(`Adding ${role}s: `, emails)}
      />
    ),
    text: "Add Members",
    variant: "blue",
  },
};
