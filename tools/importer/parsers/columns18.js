/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // Find the heading/intro div (first div)
  const leftCol = gridChildren.find((el) => el.tagName === 'DIV');
  // Find the contact methods ul
  const rightCol = gridChildren.find((el) => el.tagName === 'UL');
  // Find the image (img)
  const img = gridChildren.find((el) => el.tagName === 'IMG');

  // Defensive: ensure all are present
  if (!leftCol || !rightCol || !img) return;

  // Columns block header
  const headerRow = ['Columns (columns18)'];

  // First row: leftCol (intro), rightCol (contact methods)
  const contentRow = [leftCol, rightCol];

  // Second row: image in left column only (remove empty cell)
  const imageRow = [img];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
    imageRow,
  ], document);

  element.replaceWith(table);
}
