/* global WebImporter */
export default function parse(element, { document }) {
  if (!element || !document) return;

  // Block header as per spec
  const headerRow = ['Cards (cards7)'];
  const rows = [headerRow];

  // Each card is a direct child div with an img inside
  const cardDivs = element.querySelectorAll(':scope > div');
  cardDivs.forEach((cardDiv) => {
    const img = cardDiv.querySelector('img');
    if (!img) return;
    // Per block spec: must have 2 columns, image and text (even if text is empty)
    // But only add the row if there is at least one non-empty cell (image is present)
    rows.push([img, '']);
  });

  // Only output a table if there is at least one card row
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}
