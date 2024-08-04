import { useTranslation } from "@acme/i18n";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Section, SectionItem, SectionSeparator } from "../_components";

interface CardItemProps {
  title: string;
  description: string;
  action: string;
  more: string;
}

const CardItem = ({ title, description, action, more }: CardItemProps) => {
  return (
    <section className="max-w-[340px] text-sm">
      <header className="font-semibold">{title}</header>
      <p className="mb-4 mt-1 text-primary/65">{description}</p>
      <footer className="flex flex-wrap gap-x-3 gap-y-2">
        <Button tabIndex={0} variant="blue" size="sm">
          {action}
        </Button>
        <Button tabIndex={0} variant="notion" size="sm">
          {more}
        </Button>
      </footer>
    </section>
  );
};

export const Security = () => {
  /** i18n */
  const { t } = useTranslation("settings");
  const { cards, general, invite } = t("security", { returnObjects: true });

  return (
    <>
      <div className="rounded-sm border-[1px] border-solid border-primary/10 p-4">
        <CardItem {...cards.sso} />
        <SectionSeparator size="sm" />
        <CardItem {...cards.scim} />
      </div>
      <SectionSeparator size="sm" />
      <Section title={general.title}>
        <SectionItem {...general.publish} plan="enterprise">
          <Switch size="sm" disabled />
        </SectionItem>
        <SectionSeparator size="sm" />
        <SectionItem {...general.edit} plan="enterprise">
          <Switch size="sm" disabled />
        </SectionItem>
        <SectionSeparator size="sm" />
        <SectionItem {...general.duplicate} plan="enterprise">
          <Switch size="sm" disabled />
        </SectionItem>
        <SectionSeparator size="sm" />
        <SectionItem {...general.export} plan="enterprise">
          <Switch size="sm" disabled />
        </SectionItem>
      </Section>
      <SectionSeparator size="sm" />
      <Section title={invite.title}>
        <SectionItem {...invite.access} plan="plus">
          <Switch size="sm" disabled checked />
        </SectionItem>
        <SectionSeparator size="sm" />
        <SectionItem
          title={invite.invite.title}
          description={t("security.invite.invite.description", { guests: 0 })}
          plan="enterprise"
        >
          <Switch size="sm" disabled />
        </SectionItem>
        <SectionSeparator size="sm" />
        <SectionItem {...invite.guest} plan="enterprise">
          <Switch size="sm" disabled />
        </SectionItem>
        <SectionSeparator size="sm" />
        <SectionItem {...invite.member} plan="plus">
          <Switch size="sm" disabled />
        </SectionItem>
        <SectionSeparator size="sm" />
        <SectionItem {...invite.user} plan="plus">
          <Switch size="sm" disabled />
        </SectionItem>
      </Section>
    </>
  );
};
