import { Plan, Role, Scope } from "../types";

export function getScopes(plan: Plan, role: Role): Set<Scope> {
  const scopes = new Set<Scope>();

  if (role === Role.OWNER) {
    addToSet(scopes, [
      Scope.WorkspaceUpdate,
      Scope.MemberRead,
      Scope.MemberUpdate,
      Scope.Upgrade,
    ]);

    if (plan !== Plan.EDUCATION) {
      addToSet(scopes, [Scope.MemberInvite, Scope.MemberAdd]);
      if (plan !== Plan.FREE) {
        addToSet(scopes, [Scope.GroupEnable]);
      }
    }
  }
  if (role === Role.MEMBER) {
    addToSet(scopes, [Scope.MemberRead]);
    if (plan !== Plan.EDUCATION) {
      addToSet(scopes, [Scope.MemberAddRequest]);
      if (plan !== Plan.FREE) {
        addToSet(scopes, [Scope.GroupEnable]);
      }
    }
  }

  return scopes;
}

const addToSet = <T>(set: Set<T>, items: T[]) =>
  items.forEach((item) => set.add(item));
