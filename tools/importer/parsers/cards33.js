/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content
  function extractCardContent(cardAnchor) {
    // Image: always present, first img
    const img = cardAnchor.querySelector('img');

    // Content container (second child div)
    const contentDiv = cardAnchor.querySelector('div:not(.w-layout-grid)') || cardAnchor.querySelector('div');
    const cellContent = [];
    if (contentDiv) {
      // Tag + read time (meta row)
      const metaRow = contentDiv.querySelector('.flex-horizontal');
      if (metaRow) cellContent.push(metaRow);
      // Title (h3 or .h4-heading)
      const heading = contentDiv.querySelector('h3, .h4-heading, h4');
      if (heading) cellContent.push(heading);
      // Description (p)
      const desc = contentDiv.querySelector('p');
      if (desc) cellContent.push(desc);
      // CTA (div with 'Read')
      const cta = Array.from(contentDiv.querySelectorAll('div')).find(div => div.textContent.trim().toLowerCase() === 'read');
      if (cta) cellContent.push(cta);
    }
    return [img, cellContent];
  }

  // Get all card anchors
  const cardAnchors = Array.from(element.querySelectorAll(':scope > a'));
  const rows = [];
  rows.push(['Cards (cards33)']);
  cardAnchors.forEach(cardAnchor => {
    const [img, cellContent] = extractCardContent(cardAnchor);
    if (!img || cellContent.length === 0) return;
    rows.push([img, cellContent]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
