/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a card anchor element
  function extractCardInfo(cardEl) {
    // Find the image (mandatory, always in a div > img)
    const img = cardEl.querySelector('img');
    // Find the heading (h3)
    const heading = cardEl.querySelector('h2, h3, h4, h5, h6');
    // Find the description (p)
    const desc = cardEl.querySelector('p');
    // Find CTA (button or .button or a inside card, but not the card itself)
    let cta = cardEl.querySelector('.button, button');
    // If not found, look for a link that is not the card itself
    if (!cta) {
      const links = Array.from(cardEl.querySelectorAll('a'));
      cta = links.find((a) => a !== cardEl);
    }
    // Build the text cell content
    const textContent = [];
    if (heading) textContent.push(heading);
    if (desc) textContent.push(desc);
    if (cta) textContent.push(cta);
    return [img, textContent];
  }

  // Get the main grid containing all cards
  const mainGrid = element.querySelector(':scope > div > div');
  if (!mainGrid) return;

  // The first card is a direct child <a>, the rest are inside a nested grid
  const cardRows = [];

  // First card
  const firstCard = mainGrid.querySelector(':scope > a.utility-link-content-block');
  if (firstCard) {
    cardRows.push(extractCardInfo(firstCard));
  }

  // Nested grid with the rest of the cards
  const nestedGrid = mainGrid.querySelector(':scope > div.grid-layout');
  if (nestedGrid) {
    const nestedCards = nestedGrid.querySelectorAll(':scope > a.utility-link-content-block');
    nestedCards.forEach(cardEl => {
      cardRows.push(extractCardInfo(cardEl));
    });
  }

  // Table header row
  const headerRow = ['Cards (cards37)'];
  const tableRows = [headerRow, ...cardRows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element
  element.replaceWith(block);
}
