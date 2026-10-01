/** Primary navigation shared by the desktop sidebar, mobile menu and footer. */
export const NAV = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "About", href: "/about" },
  { label: "Agents", href: "/agents" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
] as const;

/** True when `pathname` belongs to the nav item (so /agents/jo keeps Agents active). */
export function isActive(pathname: string, href: string): boolean {
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);
}
