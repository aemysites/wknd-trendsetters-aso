/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a card root element
  function extractCard(cardEl) {
    // Find the first image in the card
    const img = cardEl.querySelector('img');

    // Find the text content (title and description)
    let title = null;
    let desc = null;
    // Look for a div with class utility-padding-all-2rem (contains h3 and p)
    const textWrap = cardEl.querySelector('.utility-padding-all-2rem');
    if (textWrap) {
      title = textWrap.querySelector('h3');
      desc = textWrap.querySelector('p');
    }

    // If not found, fallback: look for h3 and p anywhere in card
    if (!title) title = cardEl.querySelector('h3');
    if (!desc) desc = cardEl.querySelector('p');

    // Compose text cell
    const textCell = [];
    if (title) textCell.push(title);
    if (desc) textCell.push(desc);

    return [img, textCell];
  }

  // Get all direct children that are cards (divs with images)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));
  const cards = [];

  cardDivs.forEach((div) => {
    // Only treat as card if it has an image
    if (div.querySelector('img')) {
      cards.push(extractCard(div));
    }
  });

  // Build the table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards25)']);
  // Card rows
  cards.forEach(card => rows.push(card));

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
