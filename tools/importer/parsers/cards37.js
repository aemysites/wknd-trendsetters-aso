/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a card anchor element
  function extractCardInfo(cardEl) {
    // Find image container (first div with an img inside)
    const imgDiv = cardEl.querySelector('div:has(img), div img');
    let img = null;
    if (imgDiv) {
      img = imgDiv.querySelector('img') || imgDiv;
    } else {
      img = cardEl.querySelector('img');
    }

    // Find heading (h2 or h3 or h4)
    let heading = cardEl.querySelector('h2, h3, h4');
    // Find paragraph
    let desc = cardEl.querySelector('p');
    // Find CTA (button or link)
    let cta = cardEl.querySelector('.button, button, a.button');

    // Compose text cell contents
    const textCell = [];
    if (heading) textCell.push(heading);
    if (desc) textCell.push(desc);
    if (cta) textCell.push(cta);

    return [img, textCell];
  }

  // Find the grid containing the cards
  const mainGrid = element.querySelector('.grid-layout');
  // Defensive: fallback to element itself if grid not found
  const cardsRoot = mainGrid || element;

  // Gather all card anchor elements (cards)
  // Some are direct children, some are inside nested grid
  let cardLinks = Array.from(cardsRoot.querySelectorAll(':scope > a.utility-link-content-block'));
  // Also check for nested grid (for right column cards)
  const nestedGrid = cardsRoot.querySelector('.grid-layout');
  if (nestedGrid) {
    cardLinks = cardLinks.concat(Array.from(nestedGrid.querySelectorAll(':scope > a.utility-link-content-block')));
  }

  // Defensive: remove duplicates
  cardLinks = Array.from(new Set(cardLinks));

  // Compose table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards37)']);

  // For each card, build a row: [image, text content]
  cardLinks.forEach(cardEl => {
    const [img, textCell] = extractCardInfo(cardEl);
    // Defensive: only add rows with image and some text
    if (img && textCell.length) {
      rows.push([img, textCell]);
    }
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
