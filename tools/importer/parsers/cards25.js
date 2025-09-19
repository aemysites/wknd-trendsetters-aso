/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image and text from a card div
  function extractCardContent(cardDiv) {
    // Find the first image in the card
    const img = cardDiv.querySelector('img');
    // Find the text container (may be nested)
    let title = null;
    let desc = null;
    // Look for a div with padding or relative positioning (contains text)
    const textContainer = cardDiv.querySelector('.utility-padding-all-2rem') || cardDiv.querySelector('.utility-position-relative') || cardDiv;
    // Title: look for h3 or h2
    title = textContainer.querySelector('h3, h2');
    // Description: look for p
    desc = textContainer.querySelector('p');
    // Build the text cell
    const textCell = document.createElement('div');
    if (title) textCell.appendChild(title);
    if (desc) textCell.appendChild(desc);
    return [img, textCell];
  }

  // Get all immediate children (cards)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Build rows for cards
  const cardRows = [];
  for (const cardDiv of cardDivs) {
    // Only process if there's an image
    const img = cardDiv.querySelector('img');
    if (img) {
      cardRows.push(extractCardContent(cardDiv));
    }
  }

  // Table header
  const headerRow = ['Cards (cards25)'];
  const rows = [headerRow, ...cardRows];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
