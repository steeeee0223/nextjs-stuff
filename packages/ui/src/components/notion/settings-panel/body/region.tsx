import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Section, SectionItem, Select } from "../_components";
import { languageOptions, region } from "./region.data";

export const Region = () => {
  return (
    <>
      <Section title="Language & region">
        <SectionItem {...region.language}>
          <Select
            options={languageOptions}
            defaultValue="en"
            side="bottom"
            align="end"
          />
        </SectionItem>
        <Separator className="my-4 bg-primary/15" />
        <SectionItem {...region.startWeek}>
          <Switch size="sm" defaultChecked />
        </SectionItem>
      </Section>
    </>
  );
};
