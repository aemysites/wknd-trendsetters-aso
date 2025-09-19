/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container (the actual columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Prepare the header row
  const headerRow = ['Columns (columns30)'];

  // The HTML structure is:
  // columns[0]: Taylor Brooks
  // columns[1]: tags
  // columns[2]: heading
  // columns[3]: rich text paragraphs
  // Visually, tags and heading are grouped as one column

  // Defensive: ensure there are at least 4 children
  if (columns.length < 4) return;

  // 1. First column: Taylor Brooks
  const col1 = columns[0];

  // 2. Second column: tags + heading
  const col2 = document.createElement('div');
  col2.appendChild(columns[1]); // tags
  col2.appendChild(columns[2]); // heading

  // 3. Third column: paragraphs
  const col3 = columns[3];

  // Build the table rows
  const rows = [
    headerRow,
    [col1, col2, col3],
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
