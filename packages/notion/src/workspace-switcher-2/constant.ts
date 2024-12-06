import { Plan } from "@swy/validators";

export const planTitle: Record<Plan, string> = {
  [Plan.FREE]: "Free Plan",
  [Plan.EDUCATION]: "Education Plus Plan",
  [Plan.PLUS]: "Plan Plan",
  [Plan.BUSINESS]: "Business Plan",
  [Plan.ENTERPRISE]: "Enterprise Plan",
};
