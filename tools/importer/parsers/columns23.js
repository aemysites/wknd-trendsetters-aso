/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate children with class 'divider' (each represents a row)
  const rows = Array.from(element.querySelectorAll(':scope > .divider'));
  if (!rows.length) return;

  // Table header row
  const headerRow = ['Columns (columns23)'];

  // Build table rows
  const tableRows = rows.map(row => {
    // Each row contains a grid-layout with two children: heading and paragraph
    const grid = row.querySelector('.w-layout-grid');
    if (!grid) return ['', '']; // Defensive: always two columns
    const cells = Array.from(grid.children);
    // Defensive: Expecting two cells per row
    return [cells[0] || '', cells[1] || ''];
  });

  // Compose final table array
  const cells = [headerRow, ...tableRows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block
  element.replaceWith(block);
}
