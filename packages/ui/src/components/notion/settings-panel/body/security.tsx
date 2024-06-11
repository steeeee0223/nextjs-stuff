import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Section, SectionItem, SectionSeparator } from "../_components";
import { card, security } from "./security.data";

interface CardItemProps {
  title: string;
  description: string;
  action: string;
}

const CardItem = ({ title, description, action }: CardItemProps) => {
  return (
    <section className="max-w-[340px] text-sm">
      <header className="font-semibold">{title}</header>
      <p className="mb-4 mt-1 text-primary/65">{description}</p>
      <footer className="flex flex-wrap gap-x-3 gap-y-2">
        <Button tabIndex={0} variant="blue" size="sm">
          {action}
        </Button>
        <Button tabIndex={0} variant="notion" size="sm">
          Learn more
        </Button>
      </footer>
    </section>
  );
};

export const Security = () => {
  return (
    <>
      <div className="rounded-sm border-[1px] border-solid border-primary/10 p-4">
        <CardItem {...card.business} />
        <SectionSeparator size="sm" />
        <CardItem {...card.enterprise} />
      </div>
      <SectionSeparator size="sm" />
      <Section title="General">
        <SectionItem {...security.share}>
          <Switch size="sm" disabled />
        </SectionItem>
        <SectionSeparator size="sm" />
        <SectionItem {...security.edit}>
          <Switch size="sm" disabled />
        </SectionItem>
        <SectionSeparator size="sm" />
        <SectionItem {...security.duplicate}>
          <Switch size="sm" disabled />
        </SectionItem>
        <SectionSeparator size="sm" />
        <SectionItem {...security.export}>
          <Switch size="sm" disabled />
        </SectionItem>
      </Section>
      <SectionSeparator size="sm" />
      <Section title="Inviting members & guests">
        <SectionItem {...security.invite}>
          <Switch size="sm" disabled />
        </SectionItem>
        <SectionSeparator size="sm" />
        <SectionItem {...security.guest}>
          <Switch size="sm" disabled />
        </SectionItem>
        <SectionSeparator size="sm" />
        <SectionItem {...security.member}>
          <Switch size="sm" disabled />
        </SectionItem>
      </Section>
    </>
  );
};
