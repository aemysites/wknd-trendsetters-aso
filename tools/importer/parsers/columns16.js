/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main container
  const container = element.querySelector('.container');
  if (!container) return;

  // Find the two main grids: top (2 columns), bottom (2 images)
  const grids = container.querySelectorAll('.w-layout-grid');
  if (grids.length < 2) return;

  // --- Top grid: left (headline), right (desc, author, button) ---
  const topGrid = grids[0];
  const leftCol = topGrid.children[0];
  const rightCol = topGrid.children[1];

  // --- Bottom grid: two images ---
  const bottomGrid = grids[1];
  const leftImgCol = bottomGrid.children[0];
  const rightImgCol = bottomGrid.children[1];

  // Compose first row (header)
  const headerRow = ['Columns (columns16)'];

  // Compose second row (top columns)
  const secondRow = [leftCol.cloneNode(true), rightCol.cloneNode(true)];

  // Compose third row (bottom columns)
  const thirdRow = [leftImgCol.cloneNode(true), rightImgCol.cloneNode(true)];

  // Build table
  const tableRows = [
    headerRow,
    secondRow,
    thirdRow,
  ];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
