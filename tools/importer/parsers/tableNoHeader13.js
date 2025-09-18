/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required
  const headerRow = ['Table (no header, tableNoHeader13)'];

  // Get all immediate child dividers (each is a row)
  const dividers = Array.from(element.querySelectorAll(':scope > .divider'));

  // Defensive: If no .divider children, treat the element itself as a single block
  if (dividers.length === 0) return;

  // Build table rows: each divider contains a grid with two children (question, answer)
  const rows = dividers.map(divider => {
    // Find the grid layout inside the divider
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return ['']; // Defensive: empty row
    // Get all direct children of grid (should be two: heading, rich text)
    const cells = Array.from(grid.children);
    // Defensive: if not exactly 2 cells, fill with empty
    if (cells.length < 2) {
      return [cells[0] || '', ''];
    }
    // Return both elements as cells
    return [cells[0], cells[1]];
  });

  // Compose the table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
