/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a card root element
  function extractCard(cardDiv) {
    // Find the first image in the card
    const img = cardDiv.querySelector('img');
    // Find the text container (usually with utility-padding-all-2rem)
    let textContainer = cardDiv.querySelector('.utility-padding-all-2rem');
    // Defensive: if not found, try to find any h3 or p
    if (!textContainer) {
      const h3 = cardDiv.querySelector('h3');
      const p = cardDiv.querySelector('p');
      if (h3 || p) {
        textContainer = document.createElement('div');
        if (h3) textContainer.appendChild(h3);
        if (p) textContainer.appendChild(p);
      }
    }
    // If still not found, create empty
    if (!textContainer) {
      textContainer = document.createElement('div');
    }
    return [img, textContainer];
  }

  // Get all direct children (cards/images)
  const cardElements = Array.from(element.querySelectorAll(':scope > div'));
  const rows = [];

  // Always start with the header row
  rows.push(['Cards (cards25)']);

  // Loop through each card/image container
  cardElements.forEach((cardDiv) => {
    // Only process if there's an image (mandatory for cards25)
    const img = cardDiv.querySelector('img');
    if (!img) return;
    // Try to extract text (if any)
    let textCell = null;
    const textContainer = cardDiv.querySelector('.utility-padding-all-2rem');
    if (textContainer) {
      textCell = textContainer;
    } else {
      // Defensive: try to find h3 or p
      const h3 = cardDiv.querySelector('h3');
      const p = cardDiv.querySelector('p');
      if (h3 || p) {
        textCell = document.createElement('div');
        if (h3) textCell.appendChild(h3);
        if (p) textCell.appendChild(p);
      }
    }
    // If no text, leave cell empty
    if (!textCell) {
      textCell = '';
    }
    rows.push([img, textCell]);
  });

  // Build the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
