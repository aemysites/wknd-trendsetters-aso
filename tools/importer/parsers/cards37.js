/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a card anchor or div element
  function extractCardInfo(cardEl) {
    // Find image (mandatory)
    const img = cardEl.querySelector('img');

    // Find all heading elements (h2, h3, h4) and paragraphs
    // Also include any button or .button divs as CTA
    const textParts = [];
    // Collect all heading tags in order
    cardEl.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(h => {
      textParts.push(h.cloneNode(true));
    });
    // Collect all paragraphs
    cardEl.querySelectorAll('p').forEach(p => {
      textParts.push(p.cloneNode(true));
    });
    // Collect all CTA buttons or links
    cardEl.querySelectorAll('.button, button, a.button').forEach(btn => {
      textParts.push(btn.cloneNode(true));
    });

    // Defensive: ensure both image and text content are present
    if (!img || textParts.length === 0) return null;

    return [img.cloneNode(true), textParts];
  }

  // Find all card anchor elements (cards can be <a> or <div>)
  let cardEls = [];
  // Find all grid layouts inside the section
  const grids = element.querySelectorAll(':scope .grid-layout');
  if (grids.length) {
    grids.forEach(grid => {
      cardEls.push(...grid.querySelectorAll(':scope > a.utility-link-content-block, :scope > div.utility-link-content-block'));
    });
  } else {
    // Fallback: find all card anchors or divs directly
    cardEls = Array.from(element.querySelectorAll(':scope > a.utility-link-content-block, :scope > div.utility-link-content-block'));
  }

  // Defensive: if no cards found, try all anchors/divs with card class
  if (cardEls.length === 0) {
    cardEls = Array.from(element.querySelectorAll('a.utility-link-content-block, div.utility-link-content-block'));
  }

  // Build table rows
  const headerRow = ['Cards (cards37)'];
  const rows = [headerRow];

  cardEls.forEach(cardEl => {
    const cardInfo = extractCardInfo(cardEl);
    if (cardInfo) rows.push(cardInfo);
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(block);
}
