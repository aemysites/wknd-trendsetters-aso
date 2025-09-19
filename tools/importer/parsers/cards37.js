/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a card anchor element
  function extractCardInfo(cardEl) {
    // Find image (mandatory)
    const imgContainer = cardEl.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    let img = imgContainer ? imgContainer.querySelector('img') : null;
    // Defensive: fallback to any img inside the card
    if (!img) img = cardEl.querySelector('img');

    // Find heading (h2 or h3 or h4)
    let heading = cardEl.querySelector('h2, h3, h4');
    // Find description (first <p> inside the card)
    let desc = cardEl.querySelector('p');
    // Find CTA (button or link or .button div)
    let cta = cardEl.querySelector('.button, button, a.button');

    // Compose text cell
    const textCellContent = [];
    if (heading) textCellContent.push(heading);
    if (desc) textCellContent.push(desc);
    if (cta) textCellContent.push(cta);
    return [img, textCellContent];
  }

  // Find the grid containing cards
  const mainGrid = element.querySelector('.grid-layout');
  // Defensive: fallback to any grid-layout
  const cardContainers = mainGrid ? Array.from(mainGrid.children) : Array.from(element.querySelectorAll(':scope > div > .grid-layout > *'));

  // Build cards array
  const cards = [];

  cardContainers.forEach((cardEl) => {
    // If it's a nested grid, get its children
    if (cardEl.classList.contains('grid-layout')) {
      Array.from(cardEl.children).forEach((nestedCardEl) => {
        if (nestedCardEl.classList.contains('utility-link-content-block')) {
          cards.push(extractCardInfo(nestedCardEl));
        }
      });
    } else if (cardEl.classList.contains('utility-link-content-block')) {
      cards.push(extractCardInfo(cardEl));
    }
  });

  // Header row
  const headerRow = ['Cards (cards37)'];
  const tableRows = [headerRow];

  // Each card becomes a row: [image, text content]
  cards.forEach(([img, textContent]) => {
    // Defensive: if no image or text, skip
    if (img && textContent.length) {
      tableRows.push([img, textContent]);
    }
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  // Replace original element
  element.replaceWith(block);
}
