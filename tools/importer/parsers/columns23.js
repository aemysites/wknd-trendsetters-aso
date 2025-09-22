/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child dividers (each is a Q&A row)
  const dividers = Array.from(element.querySelectorAll(':scope > .divider'));

  // Defensive: If no dividers, fallback to all immediate children
  const rows = dividers.length ? dividers : Array.from(element.children);

  // Each divider contains a grid-layout with two children: heading and paragraph
  const contentRows = rows.map(divider => {
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return ['']; // Defensive: empty cell if missing
    const cells = Array.from(grid.children);
    // Expect: [heading, paragraph]
    if (cells.length >= 2) {
      return [cells[0], cells[1]];
    }
    // Defensive: if less than 2, fill with empty string
    return [cells[0] || '', ''];
  });

  // Table header row (block name)
  const headerRow = ['Columns (columns23)'];

  // Compose final table data
  const tableData = [headerRow, ...contentRows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element with block table
  element.replaceWith(block);
}
