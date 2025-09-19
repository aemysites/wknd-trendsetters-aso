/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the required block name as header
  const headerRow = ['Cards (cardsNoImages19)'];
  const rows = [headerRow];

  // Get all immediate child divs (each card)
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach(cardDiv => {
    // Find the text content (the p tag)
    const p = cardDiv.querySelector('p');
    if (p) {
      // Add only the paragraph (description) as the card content
      rows.push([p]);
    }
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
