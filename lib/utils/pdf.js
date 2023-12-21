import PDFDocument from "pdfkit";
import assert from "assert";

class PDF extends PDFDocument {
  table(rows, opts = {}) {
    assert(opts.header, "opts.header is not defined");
    assert(opts.date, "opts.date is not defined");
    assert(rows && rows.length, "rows is null or empty");
    if (opts.rowHeaders) {
      assert(
        opts.rowHeaders && opts.rowHeaders.length === Object.keys(rows[0]).length,
        "'opts[headers]' count is not equal to row count"
      );
    }
    const rowHeaders = opts.rowHeaders || Object.keys(rows[0]);
    assert(rowHeaders && rowHeaders.length, "unable to get headers");

    const { size, layout, margins } = this.options;
    const defaultOptions = { size, layout, margins };
    const pageLayout = opts.layout || layout;

    const preHeaderFontSize = 8;
    const headerFontSize = 14;
    const subHeaderFontSize = 10;
    const standardFontSize = opts.standardFontSize || 10;

    const columnCount = rowHeaders.length;
    const rowSpacing = 5;
    const columnSpacing = 15;
    if (!opts.isFirstPage) {
      this.addPage({ ...defaultOptions, layout: pageLayout });
    }
    const usableWidth = this.page.width - this.page.margins.left - this.page.margins.right;

    if (opts.preHeader) {
      this.font("Courier");
      this.fontSize(preHeaderFontSize);
      this.text(opts.preHeader, this.page.margins.left);
    }
    this.font("Courier-Bold");
    this.fontSize(headerFontSize);
    this.text(`${opts.header} ${opts.date}`, 0, 10, { align: "center" });
    if (opts.subHeaders) {
      this.fontSize(subHeaderFontSize);
      assert(Array.isArray(opts.subHeaders), "'opts[subHeaders]' is not an array, dont know what to do");
      opts.subHeaders.forEach((s) => {
        this.text(s, this.page.margins.left);
      });
    }

    this.font("Courier");
    this.fontSize(standardFontSize);

    const startX = this.page.margins.left;
    let startY = this.y;
    let rowBottomY = 0;
    const widerColumnMultiplier = opts.widerColumnMultiplier || 2;
    const columnContainerWidth = usableWidth / (columnCount + (opts.widerColumnIndex ? widerColumnMultiplier - 1 : 0));
    const columnWidth = columnContainerWidth - columnSpacing;
    const computeRowHeight = (row) => {
      let result = 0;
      row.forEach((cell, i) => {
        const cellHeight = this.heightOfString(cell, {
          width: columnWidth * (opts.widerColumnIndex === i ? widerColumnMultiplier : 1),
          align: "left",
        });
        result = Math.max(result, cellHeight);
      });
      return result + rowSpacing;
    };

    const maxY = this.page.height - this.page.margins.bottom;
    this.on("pageAdded", () => {
      startY = this.page.margins.top;
      rowBottomY = 0;
    });

    if (startY + 3 * computeRowHeight(rowHeaders) > maxY) {
      this.addPage({ ...defaultOptions, layout: pageLayout });
    }

    this.font("Courier-Bold");
    rowHeaders.forEach((header, i) => {
      const newI = i + (i > opts.widerColumnIndex ? widerColumnMultiplier - 1 : 0);
      this.text(header, startX + newI * columnContainerWidth, startY, {
        width: columnWidth * (opts.widerColumnIndex === i ? widerColumnMultiplier : 1),
        align: "left",
      });
    });

    rowBottomY = Math.max(startY + computeRowHeight(rowHeaders), rowBottomY);

    this.moveTo(startX, rowBottomY - rowSpacing * 0.5)
      .lineTo(startX + usableWidth, rowBottomY - rowSpacing * 0.5)
      .lineWidth(2)
      .stroke();

    this.font("Courier");
    rows.forEach((row) => {
      const rowValues = Object.values(row);
      const rowHeight = computeRowHeight(rowValues);
      if (startY + 3 * rowHeight < maxY) {
        startY = rowBottomY + rowSpacing;
      } else {
        this.addPage({ ...defaultOptions, layout: pageLayout });
      }

      rowValues.forEach((cell, i) => {
        const newI = i + (i > opts.widerColumnIndex ? widerColumnMultiplier - 1 : 0);
        this.text(cell, startX + newI * columnContainerWidth, startY, {
          width: columnWidth * (opts.widerColumnIndex === i ? widerColumnMultiplier : 1),
          align: "left",
        });
      });

      rowBottomY = Math.max(startY + rowHeight, rowBottomY);
      this.moveTo(startX, rowBottomY - rowSpacing * 0.5)
        .lineTo(startX + usableWidth, rowBottomY - rowSpacing * 0.5)
        .lineWidth(1)
        .opacity(0.7)
        .stroke()
        .opacity(1);
    });

    if (opts.footer && opts.footerFn) {
      const footer = opts.footerFn(rows);

      this.font("Courier-Bold");
      const footerValues = Object.values(footer);
      const rowHeight = computeRowHeight(footerValues);
      if (startY + 3 * rowHeight < maxY) {
        startY = rowBottomY + rowSpacing;
      } else {
        this.addPage({ ...defaultOptions, layout: pageLayout });
      }

      rowBottomY = Math.max(startY + rowHeight, rowBottomY);
      footerValues.forEach((cell, i) => {
        const newI = i + (i > opts.widerColumnIndex ? widerColumnMultiplier - 1 : 0);
        this.text(cell, startX + newI * columnContainerWidth, startY, {
          width: columnWidth * (opts.widerColumnIndex === i ? widerColumnMultiplier : 1),
          align: "left",
        });
      });
    }
    this.removeAllListeners("pageAdded");
  }
  topsheetPage(topsheetData = {}) {
    assert(topsheetData, "topsheetData is missing");

    const { size, layout, margins } = this.options;
    this.addPage({ size, layout, margins });

    const subTextFontSize = 8;
    const headerFontSize = 40;
    const subHeaderFontSize = 25;
    const standardFontSize = 20;

    const lineOffset = 10;
    const sectionOffsetMultiplier = 2;

    let lineY = this.page.margins.top + lineOffset;
    this.font("Courier-Bold");
    this.fontSize(headerFontSize);
    this.text(topsheetData.brand, 50, lineY, { align: "left" });
    this.text(topsheetData.paperName, 100, lineY, { align: "center" });
    this.fontSize(subHeaderFontSize);
    this.text(topsheetData.issueDate, 0, lineY, { align: "right" });

    lineY = lineY + this._fontSize + lineOffset * sectionOffsetMultiplier;
    this.font("Courier");
    this.fontSize(subTextFontSize);
    this.text("HUVUDLINJE", 50, lineY, { align: "left" });
    this.text("ANSL. LINJE", 600, lineY, { align: "left" });
    this.text("KUND NR.", 600, lineY, { align: "right" });

    lineY = lineY + this._fontSize + lineOffset;
    this.font("Courier-Bold");
    this.fontSize(subHeaderFontSize);
    this.text(`${topsheetData.truckNumber} ${topsheetData.truckName}`, 50, lineY, { align: "left" });
    this.text(topsheetData.orderTruckNumber, 600, lineY, { align: "left" });
    this.text(topsheetData.dropNumber, 600, lineY, { align: "right" });

    lineY = lineY + this._fontSize + lineOffset * 2;
    this.font("Courier");
    this.fontSize(subTextFontSize);
    this.text("LEV. ADRESS", 50, lineY, { align: "left" });
    lineY = lineY + this._fontSize + lineOffset;

    this.font("Courier-Bold");
    this.fontSize(standardFontSize);
    this.text(topsheetData.deliveryInstructionsLine1, 50, lineY, { align: "left" });
    lineY = lineY + this._fontSize + lineOffset;
    this.text(topsheetData.deliveryInstructionsLine2, 50, lineY, { align: "left" });
    lineY = lineY + this._fontSize + lineOffset;
    this.text(topsheetData.deliveryInstructionsLine3, 50, lineY, { align: "left" });
    lineY = lineY + this._fontSize + lineOffset;
    if (topsheetData.posterName) {
      this.font("Courier");
      this.fontSize(headerFontSize);
      this.text(`Löp: ${topsheetData.posterName}`, 150, lineY, { align: "right" });
      this.fontSize(standardFontSize);
    }
    this.text(topsheetData.deliveryInstructionsLine4, 50, lineY, { align: "left" });
    lineY = lineY + this._fontSize + lineOffset;
    this.text(topsheetData.deliveryInstructionsLine5, 50, lineY, { align: "left" });
    lineY = lineY + this._fontSize + lineOffset;
    this.text(topsheetData.deliveryInstructionsLine6, 50, lineY, { align: "left" });

    lineY = lineY + this._fontSize + lineOffset * sectionOffsetMultiplier;
    this.font("Courier");
    this.fontSize(subTextFontSize);
    this.text("TRANSPORT/ MEDDELANDE", 50, lineY, { align: "left" });

    lineY = lineY + this._fontSize + lineOffset;
    this.font("Courier-Bold");
    this.fontSize(standardFontSize);
    this.text(topsheetData.transportMessageLine1, 50, lineY, { align: "left" });
    lineY = lineY + this._fontSize + lineOffset;
    this.text(topsheetData.transportMessageLine2, 50, lineY, { align: "left" });
    lineY = lineY + this._fontSize + lineOffset;
    this.text(topsheetData.transportMessageLine3, 50, lineY, { align: "left" });
    lineY = lineY + this._fontSize + lineOffset;
    this.text(topsheetData.transportMessageLine4, 50, lineY, { align: "left" });

    lineY = lineY + this._fontSize + lineOffset * sectionOffsetMultiplier;
    this.font("Courier");
    this.fontSize(subTextFontSize);
    this.text("STD BUNT", 50, lineY, { align: "left" });
    this.text("ADR. BUNTAR", 150, lineY, { align: "left" });
    this.text("DENNA BUNT", 250, lineY, { align: "left" });
    this.text("TOTALT ANTAL EX.", 350, lineY, { align: "left" });
    this.text("LÖPSEDLAR", 500, lineY, { align: "left" });

    lineY = lineY + this._fontSize + lineOffset;
    this.font("Courier-Bold");
    this.fontSize(standardFontSize);
    this.text(topsheetData.bundles, 50, lineY, { align: "left" });
    this.text(topsheetData.packages, 150, lineY, { align: "left" });
    this.text(topsheetData.oddsQuantity, 250, lineY, { align: "left" });
    this.text(topsheetData.quantity, 350, lineY, { align: "left" });
    this.text(topsheetData.posters, 500, lineY, { align: "left" });
  }
}

export default PDF;
