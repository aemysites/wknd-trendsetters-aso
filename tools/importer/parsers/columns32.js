/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container (the columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (should be 2: image and content)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: image
  const imgEl = columns.find((el) => el.tagName === 'IMG');
  // Second column: content block (text, tags, heading, author info)
  const contentEl = columns.find((el) => el !== imgEl);

  // Defensive: if missing either, fallback to whatever is present
  const col1 = imgEl || columns[0];
  const col2 = contentEl || columns[1];

  // Build the table rows
  const headerRow = ['Columns (columns32)'];
  const contentRow = [col1, col2];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
