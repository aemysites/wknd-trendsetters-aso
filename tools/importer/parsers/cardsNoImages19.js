/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per block spec
  const headerRow = ['Cards (cardsNoImages19)'];
  const rows = [headerRow];

  // Defensive: get all direct children (each card)
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((cardDiv) => {
    // Find the p tag inside the card (the description)
    const p = cardDiv.querySelector('p');
    if (p) {
      // Only the text content is needed (ignore icon)
      rows.push([p]);
    }
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
