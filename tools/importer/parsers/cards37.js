/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a card anchor element
  function extractCardInfo(cardEl) {
    // Find image (mandatory)
    const imgWrapper = cardEl.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    let img = null;
    if (imgWrapper) {
      img = imgWrapper.querySelector('img');
    }
    // Title (optional)
    let title = cardEl.querySelector('h2, h3, h4');
    // Description (optional)
    let desc = cardEl.querySelector('p');
    // CTA (optional)
    let cta = cardEl.querySelector('.button');
    // Compose text cell
    const textCell = document.createElement('div');
    if (title) textCell.appendChild(title);
    if (desc) textCell.appendChild(desc);
    if (cta) textCell.appendChild(cta);
    // Return image and text cell
    return [img, textCell];
  }

  // Get the main grid containing cards
  const mainGrid = element.querySelector('.grid-layout');
  // Defensive: if not found, fallback to element itself
  const cardContainers = mainGrid ? mainGrid.children : element.children;

  // Prepare table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards37)']);

  // Loop through top-level children (cards)
  for (const child of cardContainers) {
    // If it's a grid containing more cards, recurse into its children
    if (child.classList.contains('grid-layout')) {
      for (const subCard of child.children) {
        if (subCard.tagName === 'A') {
          rows.push(extractCardInfo(subCard));
        }
      }
    } else if (child.tagName === 'A') {
      rows.push(extractCardInfo(child));
    }
  }

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(block);
}
