import { Plan, Role } from "@swy/validators";

import { SCOPES } from "./constants";
import { getScopes } from "./scopes";

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
