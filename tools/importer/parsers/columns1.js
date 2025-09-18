/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the two columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Defensive: Expecting two columns (image + content)
  // Column 1: image (reference the actual image element)
  const imageEl = gridChildren.find(el => el.tagName === 'IMG');
  // Column 2: content (heading, subheading, buttons)
  const contentEl = gridChildren.find(el => el !== imageEl);

  // Table header must match block name exactly
  const headerRow = ['Columns (columns1)'];
  // Table content row: two columns, referencing the original elements
  const columnsRow = [imageEl, contentEl];

  // Create the table using DOMUtils
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // Replace the original section with the new table
  element.replaceWith(table);
}
