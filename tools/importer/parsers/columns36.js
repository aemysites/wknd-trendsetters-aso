/* global WebImporter */
export default function parse(element, { document }) {
  // Header row with block name
  const headerRow = ['Columns (columns36)'];

  // Defensive: Find the main grid container (contains two columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get immediate children of the grid (should be two columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // --- Column 1: Text content and buttons ---
  const col1 = columns[0];
  // We'll include all content from col1 (heading, paragraph, buttons)
  // This makes the function resilient to minor HTML variations

  // --- Column 2: Images ---
  const col2 = columns[1];
  // Find all images inside col2
  const images = Array.from(col2.querySelectorAll('img'));

  // Build the second row: [text column, images column]
  const secondRow = [col1, images];

  // Table cells
  const cells = [headerRow, secondRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the block table
  element.replaceWith(block);
}
