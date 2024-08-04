"use client";

import React from "react";
import type { CustomTypeOptions } from "i18next";
import { I18nextProvider, useTranslation } from "react-i18next";

import i18n from "./config";

export type LOCALE = "en" | "de" | "es" | "fr";
export { useTranslation };

export interface I18nProviderProps extends React.PropsWithChildren {
  defaultNS?: CustomTypeOptions["defaultNS"];
}

export const I18nProvider = ({ children, defaultNS }: I18nProviderProps) => {
  return (
    <I18nextProvider i18n={i18n} defaultNS={defaultNS}>
      {children}
    </I18nextProvider>
  );
};
