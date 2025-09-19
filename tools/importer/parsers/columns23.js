/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Columns (columns23)'];

  // Find all direct children with class 'divider' (each is a row)
  const dividers = Array.from(element.querySelectorAll(':scope > .divider'));

  // Each divider contains a grid with two children: heading and rich text
  const rows = dividers.map(divider => {
    // Defensive: find the grid inside the divider
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return ['', ''];
    // Get the two children: heading and rich text
    const cells = Array.from(grid.children);
    // Defensive: ensure two columns
    const col1 = cells[0] || '';
    const col2 = cells[1] || '';
    return [col1, col2];
  });

  // Compose the table cells array
  const table = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(table, document);

  // Replace the original element
  element.replaceWith(block);
}
