/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per block requirements
  const headerRow = ['Columns (columns23)'];

  // Find all immediate child dividers (each represents a row in the columns block)
  // Defensive: allow for possible wrappers
  const dividerDivs = Array.from(element.querySelectorAll(':scope > .divider'));

  // Fallback: if no direct children, try to find nested dividers (for robustness)
  let rows = dividerDivs;
  if (rows.length === 0) {
    rows = Array.from(element.querySelectorAll('.divider'));
  }

  // Each .divider contains a .w-layout-grid with two children: heading and content
  const tableRows = rows.map(divider => {
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return ['', ''];
    const cells = Array.from(grid.children);
    // Defensive: expect two columns (heading, content)
    return [cells[0] || '', cells[1] || ''];
  });

  // Compose the table
  const cells = [headerRow, ...tableRows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
