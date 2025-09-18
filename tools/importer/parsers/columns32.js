/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container (columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the two columns
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Table header row
  const headerRow = ['Columns (columns32)'];

  // Only include columns that have meaningful content
  const cells = [headerRow];
  const row = [];

  // First column: image (only if present)
  const imgEl = columns[0].querySelector('img');
  if (imgEl) row.push(imgEl);

  // Second column: text content (only if not empty)
  if (columns[1] && columns[1].textContent.trim().length > 0) {
    row.push(columns[1]);
  }

  // Only add the row if it has at least one non-empty cell
  if (row.length > 0) {
    cells.push(row);
  }

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
