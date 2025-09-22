/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as specified
  const headerRow = ['Cards (cardsNoImages19)'];
  const rows = [headerRow];

  // Defensive: get all direct children (each card)
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((cardDiv) => {
    // Each cardDiv contains icon and text, but we only want text content for this block
    // Find the first <p> inside this cardDiv (description)
    const desc = cardDiv.querySelector('p');
    // Optionally, you could look for heading, but in this HTML there is none
    // Compose the cell content: just the <p> element
    if (desc) {
      rows.push([desc]);
    }
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
