import { SCOPES } from "@/constants/scopes";
import { getScopes } from "./scopes";
import { Plan, Role } from "./types";

const testData = Object.values(Plan).flatMap((plan) =>
  Object.values(Role).map((role) => ({
    plan,
    role,
    expected: SCOPES[role][plan],
  })),
);

describe("getScopes", () => {
  it.each(testData)(
    "[$plan] Member of role $role should have scopes: $expected",
    ({ plan, role, expected }) => {
      const result = getScopes(plan, role);
      expect(result).toEqual(expected);
    },
  );
});
