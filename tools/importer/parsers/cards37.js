/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a card anchor
  function extractCardInfo(cardEl) {
    // Find image (mandatory)
    const imgContainer = cardEl.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    let img = null;
    if (imgContainer) {
      img = imgContainer.querySelector('img');
    }
    // Find heading (optional)
    let heading = cardEl.querySelector('h3, .h2-heading, .h4-heading');
    // Find description (optional)
    let desc = cardEl.querySelector('p');
    // Find CTA (optional)
    let cta = cardEl.querySelector('.button');
    // Compose text cell
    const textCellContent = [];
    if (heading) textCellContent.push(heading);
    if (desc) textCellContent.push(desc);
    if (cta) textCellContent.push(cta);
    return [img, textCellContent];
  }

  // Get all cards (anchor tags)
  const cards = [];
  // The main grid contains the first card and a nested grid with the rest
  const mainGrid = element.querySelector('.grid-layout');
  if (!mainGrid) return;
  // Get all direct children of mainGrid
  const mainGridChildren = Array.from(mainGrid.children);
  // First card is a direct anchor child
  const firstCardAnchor = mainGridChildren.find(el => el.tagName === 'A');
  if (firstCardAnchor) {
    cards.push(firstCardAnchor);
  }
  // The rest are inside a nested grid
  const nestedGrid = mainGridChildren.find(el => el.classList.contains('grid-layout'));
  if (nestedGrid) {
    // Each card is an anchor child of nested grid
    const nestedAnchors = Array.from(nestedGrid.querySelectorAll(':scope > a'));
    cards.push(...nestedAnchors);
  }

  // Compose table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards37)']);
  // Card rows
  cards.forEach(cardEl => {
    const [img, textCellContent] = extractCardInfo(cardEl);
    // Defensive: only add row if image and text
    if (img && textCellContent.length) {
      rows.push([img, textCellContent]);
    }
  });

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
