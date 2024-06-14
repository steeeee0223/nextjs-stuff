/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { CircleHelp } from "lucide-react";
import { toast } from "sonner";
import { useCopyToClipboard } from "usehooks-ts";

import { Hint } from "@/components/custom/hint";
import {
  HintButton,
  Section,
  SectionItem,
  SectionSeparator,
} from "../_components";
import { useSettings } from "../settings-context";
import { identity } from "./identity.data";

export const Identity = () => {
  const {
    settings: { workspace },
  } = useSettings();
  const [, copy] = useCopyToClipboard();

  const handleCopy = async () => {
    await copy(workspace.id);
    toast.success("Copied property to clipboard");
  };

  return (
    <>
      <Section title="Domain management">
        <SectionItem {...identity.domains} />
        <SectionSeparator size="sm" />
        <SectionItem {...identity.creation} />
        <SectionSeparator size="sm" />
        <SectionItem {...identity.claim} />
      </Section>
      <SectionSeparator />
      <Section title="User management">
        <div className="text-sm/4 font-normal text-primary/65">
          These settings apply to all users with a verified domain, even if they
          are not a member of this workspace.
        </div>
        <SectionSeparator size="sm" />
        <HintButton icon={CircleHelp} label="Learn about managed users" />
        <SectionSeparator size="sm" />
        <SectionItem {...identity.dashboard} />
        <SectionSeparator size="sm" />
        <SectionItem {...identity.profile} />
        <SectionSeparator size="sm" />
        <SectionItem {...identity.external} />
        <SectionSeparator size="sm" />
        <SectionItem {...identity.pervention} />
        <SectionSeparator size="sm" />
        <SectionItem {...identity.session} />
        <SectionSeparator size="sm" />
        <SectionItem {...identity.logout} />
        <SectionSeparator size="sm" />
        <SectionItem {...identity.password} />
      </Section>
      <SectionSeparator />
      <Section title="SAML Single sign-on (SSO)">
        <HintButton icon={CircleHelp} label="Learn about SAML SSO" />
        <SectionSeparator size="sm" />
        <SectionItem {...identity.SAML} />
        <SectionSeparator size="sm" />
        <SectionItem {...identity.login} />
        <SectionSeparator size="sm" />
        <SectionItem {...identity.autoCreation} />
        <SectionSeparator size="sm" />
        <SectionItem {...identity.linked} />
      </Section>
      <SectionSeparator />
      <Section title="SCIM provisioning">
        <SectionItem {...identity.SCIM} />
      </Section>
      <SectionSeparator />
      <Section title="Setup information">
        <SectionItem {...identity.workspaceId}>
          <Hint
            description="Click to copy ID"
            variant="notion"
            size="sm"
            side="top"
            sideOffset={15}
            align="center"
          >
            <div className="min-w-[400px] px-[60px] text-xs/4 text-primary/65">
              <a
                onClick={handleCopy}
                rel="noopener noreferrer"
                className="inline cursor-pointer select-none underline hover:text-red-600"
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
