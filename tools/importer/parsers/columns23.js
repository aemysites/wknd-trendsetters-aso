/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs of the root element
  const topDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: if no children, do nothing
  if (!topDivs.length) return;

  // Each 'divider' is a row, each with a grid containing two children: heading and paragraph
  // We'll build a 2-column table: first col = question, second col = answer
  const headerRow = ['Columns (columns23)'];
  const rows = [];

  // For each divider (row)
  topDivs.forEach(divider => {
    // Find the grid inside this divider
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return;
    // The grid has two children: heading and rich text
    const gridChildren = Array.from(grid.children);
    if (gridChildren.length < 2) return;
    const question = gridChildren[0];
    const answer = gridChildren[1];
    rows.push([question, answer]);
  });

  // Defensive: if no rows, do nothing
  if (!rows.length) return;

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
