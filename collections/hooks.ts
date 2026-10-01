import { revalidatePath } from "next/cache";
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from "payload";

/**
 * Refresh the public site when an editor changes content.
 * Wrapped because hooks also run from standalone scripts (seeding),
 * where Next's cache APIs are unavailable.
 */
function refresh() {
  try {
    revalidatePath("/", "layout");
  } catch {
    /* not running inside Next (e.g. seed script) */
  }
}

export const revalidateSite: CollectionAfterChangeHook &
  CollectionAfterDeleteHook = ({ doc }) => {
  refresh();
  return doc;
};

export const revalidateGlobal: GlobalAfterChangeHook = ({ doc }) => {
  refresh();
  return doc;
};
