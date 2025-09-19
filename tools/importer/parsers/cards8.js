/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards8) block header: exactly one column
  const headerRow = ['Cards (cards8)'];

  // Get all immediate child divs (each is a card wrapper)
  const cardDivs = element.querySelectorAll(':scope > div');

  // Prepare rows for each card
  const rows = Array.from(cardDivs).map((cardDiv) => {
    // Find the image inside the card div
    const img = cardDiv.querySelector('img');
    if (!img) return null; // Defensive: only include rows with an image

    // Cell 1: image element (reference directly)
    // Cell 2: use img.alt as plain text (not wrapped in heading)
    let textCellContent = img.alt && img.alt.trim() ? img.alt.trim() : '';
    return [img, textCellContent];
  }).filter(Boolean); // Remove any nulls

  // Compose the table data
  const cells = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
