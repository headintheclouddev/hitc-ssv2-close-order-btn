/**
 * salesOrderClient.ts
 *
 * @NScriptType ClientScript
 * @NApiVersion 2.1
 */

import {EntryPoints} from "N/types";

export function pageInit(context: EntryPoints.Client.pageInitContext) {
  console.log('HITC pageInit', context.mode);
}
