/**
 * serverTaskSuitelet_done.ts
 *
 * @NScriptName Server Task Suitelet - Done
 * @NScriptType Suitelet
 * @NApiVersion 2.1
 */

import {EntryPoints} from "N/types";
import log = require('N/log');
import record = require('N/record');

export function onRequest(context: EntryPoints.Suitelet.onRequestContext) {
  const mode = context.request.parameters['mode'];
  log.debug(context.request.method, `Starting mode ${mode} at ${new Date()}.`);
  if (mode == 'closeSalesOrder') {
    context.response.write(closeSalesOrder(context.request.parameters));
  }
}

function closeSalesOrder(params: { salesOrderId: string }): string {
  log.debug('closeSalesOrder', `Loading sales order ${params.salesOrderId} at ${new Date()}.`);
  const salesOrder = record.load({ type: 'salesorder', id: params.salesOrderId });
  for (let line = 0; line < salesOrder.getLineCount({ sublistId: 'item' }); line++) {
    salesOrder.setSublistValue({ sublistId: 'item', fieldId: 'isclosed', line, value: true });
  }
  salesOrder.setValue('memo', `Closed at ${new Date()}`);
  log.debug('closeSalesOrder', `Saving sales order ${params.salesOrderId} at ${new Date()}.`);
  try {
    salesOrder.save();
  } catch(e) {
    log.error('closeSalesOrder', `Failed to save sales order ${params.salesOrderId}: ${e.message}.`);
    return e.message;
  }
  return 'success';
}
