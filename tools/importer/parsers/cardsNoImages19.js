/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as per block requirements
  const headerRow = ['Cards (cardsNoImages19)'];
  const rows = [headerRow];

  // Get all direct card containers (immediate children)
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((cardDiv) => {
    // Each cardDiv contains: icon wrapper + p (description)
    // We want only the text content (no icon)
    // Find the first <p> inside the cardDiv
    const desc = cardDiv.querySelector('p');
    if (desc) {
      // Place the <p> directly in the cell
      rows.push([desc]);
    }
  });

  // Create and replace with the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
