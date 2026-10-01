import "server-only";
import config from "@payload-config";
import { getPayload } from "payload";

/** Cached Payload instance (Local API: queries the DB directly, no HTTP hop). */
export const getPayloadClient = () => getPayload({ config });
