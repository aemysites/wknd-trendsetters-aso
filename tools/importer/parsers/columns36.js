/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate child divs
  function getDirectDivs(parent) {
    return Array.from(parent.children).filter((el) => el.tagName === 'DIV');
  }

  // Find the main grid (two columns)
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get the two main columns
  const gridChildren = getDirectDivs(grid);
  if (gridChildren.length < 2) return;
  const leftCol = gridChildren[0];
  const rightCol = gridChildren[1];

  // LEFT COLUMN: Heading, subheading, buttons
  // We'll collect all children of leftCol
  const leftColContent = [];
  Array.from(leftCol.children).forEach((child) => {
    leftColContent.push(child);
  });

  // RIGHT COLUMN: grid of images
  // Find the nested grid with images
  let images = [];
  const nestedGrid = rightCol.querySelector('.w-layout-grid');
  if (nestedGrid) {
    images = Array.from(nestedGrid.querySelectorAll('img'));
  }
  // Defensive: if no nested grid, also check for images directly
  if (images.length === 0) {
    images = Array.from(rightCol.querySelectorAll('img'));
  }

  // Compose the columns row
  const columnsRow = [
    leftColContent,
    images
  ];

  // Build the table
  const headerRow = ['Columns (columns36)'];
  const tableCells = [headerRow, columnsRow];
  const table = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element
  element.replaceWith(table);
}
