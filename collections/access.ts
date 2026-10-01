import type { Access, FieldAccess } from "payload";

/** Writes require a logged-in admin user. */
export const isLoggedIn: Access = ({ req }) => Boolean(req.user);

/** Public can read only published/active documents; admins read everything. */
export const publicActiveOnly: Access = ({ req }) =>
  req.user ? true : { status: { equals: "active" } };

/** Field-level variant of isLoggedIn. */
export const isLoggedInField: FieldAccess = ({ req }) => Boolean(req.user);
