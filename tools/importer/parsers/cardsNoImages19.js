/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row
  const headerRow = ['Cards (cardsNoImages19)'];

  // Defensive: get all direct children (each card)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Each cardDiv contains an icon and a <p> with the description
  const rows = cardDivs.map(cardDiv => {
    // Find the <p> inside this cardDiv (description)
    const p = cardDiv.querySelector('p');
    // Defensive: if no <p>, skip this card
    if (!p) return null;
    // Only use the <p> (no icon, no heading)
    return [p];
  }).filter(Boolean);

  // Build table data
  const tableData = [headerRow, ...rows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element with the block table
  element.replaceWith(block);
}
