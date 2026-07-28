import { suppliers, inventory, shipments, performanceMetrics } from '../data';

interface PdfLine {
  text: string;
  size: number;
  bold: boolean;
  gapAfter: number;
}

function pdfEscape(s: string): string {
  // Keep PDF ASCII-safe: strip non-latin1 chars, escape PDF delimiters.
  return s
    .replace(/[^\x20-\x7E]/g, '-')
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
}

/** Builds a demo supply-chain report as a real, downloadable PDF (no dependencies). */
export function buildReportPdf(): Blob {
  const latest = performanceMetrics[performanceMetrics.length - 1];

  const lines: PdfLine[] = [
    { text: 'MERIDIAN - SUPPLY CHAIN REPORT', size: 18, bold: true, gapAfter: 4 },
    { text: `Period: ${latest.date}  |  Demo data: June - July 2026`, size: 10, bold: false, gapAfter: 12 },
    { text: 'KEY METRICS', size: 13, bold: true, gapAfter: 4 },
    { text: `Order Fulfillment Rate: ${(latest.orderFulfillmentRate * 100).toFixed(1)}%`, size: 11, bold: false, gapAfter: 2 },
    { text: `Inventory Turnover: ${latest.inventoryTurnover.toFixed(2)}`, size: 11, bold: false, gapAfter: 2 },
    { text: `Supplier Reliability: ${(latest.supplierReliability * 100).toFixed(1)}%`, size: 11, bold: false, gapAfter: 2 },
    { text: `Cost Efficiency: ${(latest.costEfficiency * 100).toFixed(1)}%`, size: 11, bold: false, gapAfter: 12 },
    { text: 'SUPPLIERS', size: 13, bold: true, gapAfter: 4 },
    ...suppliers.map(
      (s): PdfLine => ({
        text: `${s.name} | ${s.location} | Reliability ${(s.reliability * 100).toFixed(1)}% | Lead ${s.leadTime}d | $${s.costPerUnit}/unit`,
        size: 10,
        bold: false,
        gapAfter: 3,
      })
    ),
    { text: '', size: 10, bold: false, gapAfter: 8 },
    { text: 'INVENTORY', size: 13, bold: true, gapAfter: 4 },
    ...inventory.map(
      (i): PdfLine => ({
        text: `${i.productName}: ${i.stockLevel.toLocaleString()} / ${i.maxCapacity.toLocaleString()} units (reorder at ${i.reorderPoint.toLocaleString()})${i.stockLevel <= i.reorderPoint ? '  [REORDER]' : ''}`,
        size: 10,
        bold: false,
        gapAfter: 3,
      })
    ),
    { text: '', size: 10, bold: false, gapAfter: 8 },
    { text: 'SHIPMENTS', size: 13, bold: true, gapAfter: 4 },
    ...shipments.map(
      (s): PdfLine => ({
        text: `${s.origin} -> ${s.destination} | ${s.status.toUpperCase()} | ETA ${s.estimatedArrival}${Number(s.delay) > 0 ? ` | delayed ${s.delay}d` : ''}`,
        size: 10,
        bold: false,
        gapAfter: 3,
      })
    ),
    { text: '', size: 10, bold: false, gapAfter: 12 },
    { text: 'Demo report generated locally by Meridian.', size: 9, bold: false, gapAfter: 0 },
  ];

  // Paginate: A4-ish page 595x842, margins 56pt.
  const PAGE_W = 595;
  const TOP = 786;
  const BOTTOM = 60;
  const X = 56;
  const pages: PdfLine[][] = [[]];
  let y = TOP;
  for (const line of lines) {
    const h = line.size * 1.35 + line.gapAfter;
    if (y - h < BOTTOM) {
      pages.push([]);
      y = TOP;
    }
    (pages[pages.length - 1] as PdfLine[]).push(line);
    y -= h;
  }

  const objects: string[] = [];
  // 1: catalog, 2: pages, 3: helvetica, 4: helvetica-bold, then per page: page + content
  const pageObjNums: number[] = [];
  let nextNum = 5;
  for (let i = 0; i < pages.length; i++) {
    pageObjNums.push(nextNum);
    nextNum += 2;
  }

  objects[1] = '<< /Type /Catalog /Pages 2 0 R >>';
  objects[2] = `<< /Type /Pages /Kids [${pageObjNums.map((n) => `${n} 0 R`).join(' ')}] /Count ${pages.length} >>`;
  objects[3] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>';
  objects[4] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>';

  pages.forEach((pageLines, i) => {
    const pageNum = pageObjNums[i] as number;
    const contentNum = pageNum + 1;
    let cy = TOP;
    const ops: string[] = [];
    for (const line of pageLines) {
      cy -= line.size * 1.35;
      if (line.text) {
        const font = line.bold ? '/F2' : '/F1';
        ops.push(`BT ${font} ${line.size} Tf ${X} ${cy.toFixed(1)} Td (${pdfEscape(line.text)}) Tj ET`);
      }
      cy -= line.gapAfter;
    }
    const stream = ops.join('\n');
    objects[pageNum] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} 842] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentNum} 0 R >>`;
    objects[contentNum] = `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`;
  });

  let pdf = '%PDF-1.4\n';
  const offsets: number[] = [];
  const maxNum = nextNum - 1;
  for (let n = 1; n <= maxNum; n++) {
    offsets[n] = pdf.length;
    pdf += `${n} 0 obj\n${objects[n] as string}\nendobj\n`;
  }
  const xrefPos = pdf.length;
  pdf += `xref\n0 ${maxNum + 1}\n0000000000 65535 f \n`;
  for (let n = 1; n <= maxNum; n++) {
    pdf += `${String(offsets[n]).padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${maxNum + 1} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF`;

  return new Blob([pdf], { type: 'application/pdf' });
}

/** Triggers a browser download of the demo report PDF. Safe no-op if blocked. */
export function downloadReportPdf(): boolean {
  try {
    const blob = buildReportPdf();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'meridian-supply-chain-report.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 5000);
    return true;
  } catch {
    return false;
  }
}
