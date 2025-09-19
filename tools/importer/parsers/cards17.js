/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required
  const headerRow = ['Cards (cards17)'];

  // Defensive: find the grid container
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct child divs of the grid (each is a card)
  const cardDivs = Array.from(grid.querySelectorAll(':scope > div'));

  // For each card, grab the image and ensure two columns (image, text)
  const rows = cardDivs.map(cardDiv => {
    const img = cardDiv.querySelector('img');
    if (!img) return null;
    // The second cell must be present and must contain a non-empty string (even if just a space)
    return [img, ' '];
  }).filter(Boolean);

  // Compose the table: header row, then image+space text rows
  const tableCells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element with the table
  element.replaceWith(table);
}
