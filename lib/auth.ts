export type AppRole = "LEARNER" | "INSTRUCTOR" | "ADMIN";

export function isInstructor(role: AppRole) {
  return role === "INSTRUCTOR" || role === "ADMIN";
}

export function canManageContent(role: AppRole) {
  return role === "ADMIN" || role === "INSTRUCTOR";
}
