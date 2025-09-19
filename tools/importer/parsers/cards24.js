/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from each <a>
  function extractCard(a) {
    // Find image (first .utility-aspect-2x3 img)
    const imgWrapper = a.querySelector('.utility-aspect-2x3');
    let img = imgWrapper ? imgWrapper.querySelector('img') : null;
    // Defensive: if no img, skip card
    if (!img) return null;

    // Find tag/date row (second child div)
    const infoRow = a.querySelector('.flex-horizontal');
    let tag = null, date = null;
    if (infoRow) {
      const infoDivs = infoRow.querySelectorAll('div');
      tag = infoDivs[0] || null;
      date = infoDivs[1] || null;
    }

    // Find heading (h3)
    const heading = a.querySelector('h3');

    // Compose text cell: tag/date row, then heading
    const textCellContent = [];
    if (infoRow) textCellContent.push(infoRow);
    if (heading) textCellContent.push(heading);

    return [img, textCellContent];
  }

  // Get all cards (direct children <a> of the grid)
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  // Build table rows
  const headerRow = ['Cards (cards24)'];
  const rows = [headerRow];
  cards.forEach((a) => {
    const cardCells = extractCard(a);
    if (cardCells) rows.push(cardCells);
  });

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
