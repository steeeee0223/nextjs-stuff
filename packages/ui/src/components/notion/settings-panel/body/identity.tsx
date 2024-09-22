/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { CircleHelp } from "lucide-react";
import { toast } from "sonner";
import { useCopyToClipboard } from "usehooks-ts";

import { useTranslation } from "@acme/i18n";

import { Hint } from "@/components/custom/hint";
import { HintButton, Section, SectionItem, Spacing } from "../_components";
import { useSettings } from "../settings-context";

export const Identity = () => {
  const {
    settings: { workspace },
  } = useSettings();
  /** i18n */
  const { t } = useTranslation("settings");
  const { domain, user, saml, scim, setup } = t("identity", {
    returnObjects: true,
  });
  /** Handlers */
  const [, copy] = useCopyToClipboard();
  const handleCopy = async () => {
    await copy(workspace.id);
    toast.success("Copied property to clipboard");
  };

  return (
    <>
      <Section title={domain.title}>
        <SectionItem {...domain.domains} plan="business" />
        <Spacing size="sm" />
        <SectionItem {...domain.creation} plan="enterprise" />
        <Spacing size="sm" />
        <SectionItem {...domain.claim} plan="enterprise" />
      </Section>
      <Spacing />
      <Section title={user.title}>
        <div className="text-sm/4 font-normal text-secondary dark:text-secondary-dark">
          {user.description}
        </div>
        <Spacing size="sm" />
        <HintButton icon={CircleHelp} label={user.buttons.hint} />
        <Spacing size="sm" />
        <SectionItem {...user.dashboard} plan="enterprise" />
        <Spacing size="sm" />
        <SectionItem {...user.profile} plan="enterprise" />
        <Spacing size="sm" />
        <SectionItem {...user.external} plan="enterprise" />
        <Spacing size="sm" />
        <SectionItem {...user.support} plan="enterprise" />
        <Spacing size="sm" />
        <SectionItem {...user.session} plan="enterprise" />
        <Spacing size="sm" />
        <SectionItem {...user.logout} plan="enterprise" />
        <Spacing size="sm" />
        <SectionItem {...user.password} plan="enterprise" />
      </Section>
      <Spacing />
      <Section title={saml.title}>
        <HintButton icon={CircleHelp} label={saml.buttons.hint} />
        <Spacing size="sm" />
        <SectionItem {...saml.saml} plan="business" />
        <Spacing size="sm" />
        <SectionItem {...saml.login} plan="business" />
        <Spacing size="sm" />
        <SectionItem {...saml.creation} />
        <Spacing size="sm" />
        <SectionItem {...saml.linked} />
      </Section>
      <Spacing />
      <Section title={scim.title}>
        <SectionItem {...scim.scim} plan="enterprise" />
      </Section>
      <Spacing />
      <Section title={setup.title}>
        <SectionItem title="" description={setup["workspace-id"].description}>
          <Hint
            description={setup["workspace-id"].tooltip}
            side="top"
            sideOffset={15}
            align="center"
          >
            <div className="min-w-[400px] px-[60px] text-xs/4 text-secondary dark:text-secondary-dark">
              <a
                onClick={handleCopy}
                rel="noopener noreferrer"
                className="hover:text-red-600 inline cursor-pointer select-none underline"
              >
                {workspace.id}
              </a>
            </div>
          </Hint>
        </SectionItem>
      </Section>
    </>
  );
};
