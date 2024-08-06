/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useRef, type ChangeEvent } from "react";
import { ChevronRight, X } from "lucide-react";
import { useHover } from "usehooks-ts";

import { useTranslation } from "@acme/i18n";

import { Hint } from "@/components/custom/hint";
import { useModal } from "@/components/custom/modal-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Section, SectionItem, SectionSeparator } from "../_components";
import { DeleteAccount, EmailSettings, PasswordForm } from "../modals";
import { useSettings } from "../settings-context";

export const Account = () => {
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const avatarRef = useRef<HTMLSpanElement>(null);
  const avatarIsHover = useHover(avatarRef);
  const avatarCancelRef = useRef<HTMLDivElement>(null);
  const avatarCancelIsHover = useHover(avatarCancelRef);
  /** i18n */
  const { t } = useTranslation("settings", { keyPrefix: "my-account" });
  const myProfile = t("my-profile", { returnObjects: true });
  const accSec = t("account-security", { returnObjects: true });
  const support = t("support", { returnObjects: true });
  /** Handlers */
  const {
    settings: { account },
    updateSettings: update,
    uploadFile,
    deleteAccount,
  } = useSettings();
  const onUpdateAvatar = () => avatarInputRef.current?.click();
  const onRemoveAvatar = () => void update({ account: { avatarUrl: "" } });
  const onSelectImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const replaceTargetUrl = account.avatarUrl;
      const url = URL.createObjectURL(file);
      await update({ account: { avatarUrl: url } });
      const res = await uploadFile?.(file, { replaceTargetUrl });
      if (res?.url) await update({ account: { avatarUrl: res.url } });
    }
  };
  const onUpdateName = (e: ChangeEvent<HTMLInputElement>) =>
    update({ account: { preferredName: e.target.value } });
  /** Modals */
  const { setOpen } = useModal();
  const handleEmailSettings = () =>
    setOpen(<EmailSettings email={account.email} />);
  const handlePasswordForm = () =>
    setOpen(
      <PasswordForm
        hasPassword={account.hasPassword}
        onSubmit={() => update({ account: { hasPassword: true } })}
      />,
    );
  const handleDeleteAccount = () =>
    setOpen(
      <DeleteAccount
        email={account.email}
        onSubmit={(email) => deleteAccount?.({ accountId: account.id, email })}
      />,
    );

  return (
    <>
      <Section title={myProfile.title}>
        <div className="flex flex-col">
          <div className="flex items-center">
            <div className="relative">
              <Hint
                description={
                  myProfile[
                    avatarCancelIsHover ? "remove-photo" : "replace-photo"
                  ]
                }
                variant="notion"
                size="sm"
                sideOffset={12}
              >
                <Avatar
                  ref={avatarRef}
                  className="size-[60px] border-[1px] border-solid border-primary/20"
                  onClick={onUpdateAvatar}
                >
                  <AvatarImage src={account.avatarUrl} />
                  <AvatarFallback className="bg-primary/5">
                    image
                  </AvatarFallback>
                </Avatar>
                <div
                  ref={avatarCancelRef}
                  role="button"
                  onClick={onRemoveAvatar}
                  className={cn(
                    "absolute right-[-2px] top-[-2px] z-10 hidden rounded-full border border-solid border-primary/10  bg-primary-foreground p-1 text-primary/65 hover:bg-primary/10",
                    (avatarIsHover || avatarCancelIsHover) && "block",
                  )}
                >
                  <X size={8} strokeWidth={2} />
                </div>
              </Hint>
              <Input
                type="file"
                ref={avatarInputRef}
                className="hidden"
                accept="image/*"
                onChange={onSelectImage}
              />
            </div>
            <div className="ml-5 w-[250px]">
              <Label
                className="mb-1 block text-xs text-primary/65"
                htmlFor="username"
              >
                {myProfile["preferred-name"]}
              </Label>
              <Input
                variant="notion"
                type="username"
                id="username"
                value={account.preferredName}
                onChange={onUpdateName}
              />
            </div>
          </div>
        </div>
      </Section>
      <SectionSeparator />
      <Section title={accSec.title}>
        <SectionItem title={accSec.email.title} description={account.email}>
          <Button variant="notion" size="sm" onClick={handleEmailSettings}>
            {accSec.email.button}
          </Button>
        </SectionItem>
        <SectionSeparator size="sm" />
        <SectionItem {...accSec.password}>
          {account.hasPassword ? (
            <Button variant="notion" size="sm" onClick={handlePasswordForm}>
              {accSec.password.button}
            </Button>
          ) : (
            <Switch
              size="sm"
              onCheckedChange={handlePasswordForm}
              checked={false}
            />
          )}
        </SectionItem>
        <SectionSeparator size="sm" />
        <SectionItem {...accSec.verification}>
          <Switch size="sm" disabled />
        </SectionItem>
      </Section>
      <SectionSeparator />
      <Section title={support.title}>
        <SectionItem {...support.support}>
          <Switch size="sm" />
        </SectionItem>
        <SectionSeparator size="sm" />
        <SectionItem {...support.logout}>
          <Button variant="ghost" size="icon-sm" className="text-primary/35">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </SectionItem>
        <SectionSeparator size="sm" />
        <SectionItem {...support.delete} titleProps="text-[#eb5757]">
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-primary/35"
            onClick={handleDeleteAccount}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </SectionItem>
      </Section>
    </>
  );
};
