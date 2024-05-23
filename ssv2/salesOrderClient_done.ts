/**
 * salesOrderClient_done.ts
 *
 * @NScriptType ClientScript
 * @NApiVersion 2.1
 */

import {EntryPoints} from "N/types";
import currentRecord = require('N/currentRecord');
import https = require('N/https');
import message = require('N/ui/message');
// import record = require('N/record');
import url = require('N/url');

export function pageInit(context: EntryPoints.Client.pageInitContext) {
  console.log('HITC pageInit', context.mode);
}

export async function closeOrderBtn() {
  message.create({
    type: message.Type.INFORMATION,
    title: 'Closing Sales Order',
    message: 'This will take a few seconds, then the page will refresh'
  }).show();

  const rec = await currentRecord.get.promise(); // Gets us the current record type and id

  // Load the sales order, close the lines, and then save it.
  // const salesOrder = await record.load.promise({ type: 'salesorder', id: rec.id });
  // for (let line = 0; line < salesOrder.getLineCount({ sublistId: 'item' }); line++) {
  //   salesOrder.setSublistValue({ sublistId: 'item', fieldId: 'isclosed', line, value: true });
  // }
  // salesOrder.setValue('memo', `Closed at ${new Date()}`);
  // await salesOrder.save.promise();

  const serverTaskSuitelet = url.resolveScript({ scriptId: 'customscript_server_task_suitelet_done', deploymentId: 'customdeploy1' });
  const response = await https.post.promise({ url: serverTaskSuitelet, body: { mode: 'closeSalesOrder', salesOrderId: rec.id } });
  if (response.body != 'success') alert(response.body);

  window.location.reload();
}
