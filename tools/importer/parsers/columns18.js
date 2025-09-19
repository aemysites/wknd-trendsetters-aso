/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get the grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid
  const gridChildren = Array.from(grid.querySelectorAll(':scope > *'));

  // Find the left column (text)
  let leftCol = null;
  let rightCol = null;
  let img = null;

  // Find the text column (first div), contact list (ul), and image
  for (const child of gridChildren) {
    if (child.tagName === 'DIV' && !leftCol) {
      leftCol = child;
    } else if (child.tagName === 'UL' && !rightCol) {
      rightCol = child;
    } else if (child.tagName === 'IMG' && !img) {
      img = child;
    }
  }

  // Defensive: ensure we have required columns
  if (!leftCol || !rightCol || !img) return;

  // Compose the first row (header)
  const headerRow = ['Columns (columns18)'];

  // Compose the second row: left column (text), right column (contacts)
  const secondRow = [leftCol, rightCol];

  // Compose the third row: image only in the left column (no unnecessary empty cell)
  const thirdRow = [img];

  // Build the table
  const cells = [
    headerRow,
    secondRow,
    thirdRow,
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
