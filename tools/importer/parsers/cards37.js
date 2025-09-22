/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image and text content from a card anchor
  function extractCardContent(cardAnchor) {
    // Find image container (aspect ratio div)
    const imgDiv = cardAnchor.querySelector('div[class*="utility-aspect"]');
    let imgEl = imgDiv ? imgDiv.querySelector('img') : null;
    // Find text content container
    let textContainer = cardAnchor.querySelector('div.utility-padding-all-2rem');
    // If not found, fallback to direct children (for smaller cards)
    if (!textContainer) {
      let heading = cardAnchor.querySelector('h3, .h4-heading');
      let desc = cardAnchor.querySelector('p');
      let textCell = [];
      if (heading) textCell.push(heading);
      if (desc) textCell.push(desc);
      // Only return row if at least one cell has content
      if ((imgEl && imgEl.src) || textCell.length) {
        return [imgEl, textCell];
      }
      return null;
    }
    let heading = textContainer.querySelector('h3, .h2-heading');
    let desc = textContainer.querySelector('p');
    let cta = textContainer.querySelector('.button');
    let textCell = [];
    if (heading) textCell.push(heading);
    if (desc) textCell.push(desc);
    if (cta) textCell.push(cta);
    if ((imgEl && imgEl.src) || textCell.length) {
      return [imgEl, textCell];
    }
    return null;
  }

  const mainGrid = element.querySelector('.grid-layout');
  if (!mainGrid) return;

  const cardAnchors = [];
  const mainGridChildren = mainGrid.querySelectorAll(':scope > *');
  mainGridChildren.forEach(child => {
    if (child.tagName === 'A') {
      cardAnchors.push(child);
    } else if (child.classList.contains('grid-layout')) {
      child.querySelectorAll(':scope > a').forEach(a => cardAnchors.push(a));
    }
  });

  const rows = [];
  rows.push(['Cards (cards37)']);
  cardAnchors.forEach(cardAnchor => {
    const cardRow = extractCardContent(cardAnchor);
    // Only add rows if both cells are non-empty (no empty rows)
    if (cardRow && ((cardRow[0] && cardRow[0].src) || (Array.isArray(cardRow[1]) && cardRow[1].length))) {
      rows.push(cardRow);
    }
  });

  // Only output rows with actual card content (no empty rows)
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(blockTable);
}
