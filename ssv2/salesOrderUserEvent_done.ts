/**
 * salesOrderUserEvent_done.ts
 *
 * @NScriptName Sales Order - User Event - Done
 * @NScriptType UserEventScript
 * @NApiVersion 2.1
 */

import {EntryPoints} from "N/types";
import runtime = require('N/runtime');

export function beforeLoad(context: EntryPoints.UserEvent.beforeLoadContext) {
  if (context.type == context.UserEventType.VIEW) {
    if (runtime.executionContext == runtime.ContextType.USER_INTERFACE) {
      context.form.addButton({ id: 'custpage_close', label: 'Close (Custom)', functionName: 'closeOrderBtn' });
      context.form.clientScriptModulePath = './salesOrderClient_done.js';
    }
  }
}
