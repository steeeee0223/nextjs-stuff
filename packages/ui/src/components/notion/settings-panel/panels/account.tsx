import { ChangeEvent } from "react";
import { ChevronRight } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Input,
  Label,
  Switch,
} from "@/components/ui";
import { mockUser } from "../../workspace-switcher/mock";
import { Section, SectionItem, SectionSeparator } from "../section";
import { myAccount } from "./account.data";

export const Account = () => {
  const user = mockUser;
  const handleUpdateName = (e: ChangeEvent<HTMLInputElement>) =>
    console.log(`Changed preffered name to ${e.currentTarget.value}`);

  return (
    <>
      <Section title="My profile">
        <div className="flex flex-col">
          <div className="flex items-center">
            <Avatar className="size-[60px]">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="ml-5 w-[250px]">
              <Label
                className="mb-1 block text-xs text-primary/65"
                htmlFor="username"
              >
                Preferred name
              </Label>
              <Input
                type="username"
                id="username"
                value={user.name}
                onChange={handleUpdateName}
                className="bg-primary/6 h-7 select-none rounded-sm text-sm"
              />
            </div>
          </div>
        </div>
      </Section>
      <SectionSeparator />
      <Section title="Account security">
        <SectionItem title={myAccount.email.title} description={user.email}>
          <Button
            variant="outline"
            size="sm"
            className="select-none hover:bg-primary/10"
          >
            Change email
          </Button>
        </SectionItem>
        <SectionSeparator size="sm" />
        <SectionItem {...myAccount.password}>
          <Switch />
        </SectionItem>
        <SectionSeparator size="sm" />
        <SectionItem {...myAccount.verification}>
          <Switch disabled />
        </SectionItem>
      </Section>
      <SectionSeparator />
      <Section title="Support">
        <SectionItem {...myAccount.support}>
          <Switch />
        </SectionItem>
        <SectionSeparator size="sm" />
        <SectionItem {...myAccount.logout}>
          <Button variant="ghost" size="icon-sm" className="text-primary/35">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </SectionItem>
        <SectionSeparator size="sm" />
        <SectionItem {...myAccount.del} titleProps="text-[#eb5757]">
          <Button variant="ghost" size="icon-sm" className="text-primary/35">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </SectionItem>
      </Section>
    </>
  );
};
