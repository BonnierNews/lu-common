import moment from "moment";
import { promisify } from "util";
import stream from "stream";

import * as streams from "./streams.js";
import PDF from "./pdf.js";

const pipeline = promisify(stream.pipeline);

async function createPDFWithTable(target, indexTable, onlyColumns, sortBy, context) {
  const { rejectIf, rejectUnless } = context;
  rejectUnless(typeof onlyColumns === "function", "onlyColumns must be a function");
  rejectUnless([ "undefined", "function" ].includes(typeof sortBy), "sortBy must be a function or undefined");

  const pageLayout = indexTable.opts.layout || "portrait";
  const doc = new PDF({
    size: "A4",
    bufferPages: true,
    layout: pageLayout,
    margins: {
      top: 10,
      bottom: 10,
      left: 15,
      right: 15,
    },
  });

  indexTable.opts.isFirstPage = true;

  generateTable(indexTable.rows, indexTable.opts);

  const range = doc.bufferedPageRange(); // => { start: 0, count: 2 }

  let i, end;
  for (i = range.start, end = range.start + range.count, range.start <= end; i < end; i++) {
    doc.switchToPage(i);
    doc.fontSize(8);
    doc.font("Courier");
    doc.text(moment().format("YYYY-MM-DD HH:mm:ss"), 1, 1, { align: "left" });
    doc.text(`Sida ${i + 1} av ${range.count}`, 1, 1, { align: "right" });
  }

  doc.end();
  const file = streams.open({ path: target }, context);
  await pipeline(doc, file.writeStream).catch((err) => {
    rejectIf(err, err.message || "pipeline error");
  });

  await file.uploadPromise;

  return { type: "target-path", id: target };

  function generateTable(rows, opts) {
    doc.table(rows.sort(sortBy).map(onlyColumns), opts);
    rows.sort(sortBy).forEach((row) => {
      if (row.subTable) {
        generateTable(row.subTable.rows, row.subTable.opts);
      }
    });
  }
}

async function createPDFWithTopsheets(target, topsheets, sortBy, context) {
  const { rejectIf, rejectUnless } = context;
  rejectUnless([ "undefined", "function" ].includes(typeof sortBy), "sortBy must be a function or undefined");

  const doc = new PDF({
    autoFirstPage: false,
    size: "A4",
    bufferPages: true,
    layout: "landscape",
    margins: {
      top: 10,
      bottom: 10,
      left: 15,
      right: 15,
    },
  });

  topsheets.sort(sortBy).forEach((topsheet) => {
    doc.topsheetPage(topsheet);
  });

  const range = doc.bufferedPageRange(); // => { start: 0, count: 2 }

  let i, end;
  for (i = range.start, end = range.start + range.count, range.start <= end; i < end; i++) {
    doc.switchToPage(i);
    doc.fontSize(8);
    doc.font("Courier");
    doc.text(moment().format("YYYY-MM-DD HH:mm:ss"), 1, 1, { align: "left" });
    doc.text(`Sida ${i + 1} av ${range.count}`, 1, 1, { align: "right" });
  }

  doc.end();
  const file = streams.open({ path: target }, context);
  await pipeline(doc, file.writeStream).catch((err) => {
    rejectIf(err, err.message || "pipeline error");
  });

  await file.uploadPromise;

  return { type: "target-path", id: target };
}

export { createPDFWithTable, createPDFWithTopsheets };
