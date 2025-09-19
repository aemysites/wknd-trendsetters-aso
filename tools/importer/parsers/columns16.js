/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get direct children by selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.querySelectorAll(':scope > ' + selector));
  }

  // Find the main container and grids
  const container = element.querySelector('.container');
  if (!container) return;
  const mainGrid = container.querySelector('.grid-layout.tablet-1-column');
  const lowerGrid = container.querySelector('.grid-layout.mobile-portrait-1-column');

  // --- First row: main content columns ---
  let leftCol = null, rightCol = null;
  if (mainGrid) {
    const cols = getDirectChildren(mainGrid, 'div');
    leftCol = cols[0] || '';
    rightCol = cols[1] || '';
  }

  // --- Second row: lower images columns ---
  let imgCol1 = '', imgCol2 = '';
  if (lowerGrid) {
    const imgDivs = getDirectChildren(lowerGrid, 'div');
    imgCol1 = imgDivs[0] || '';
    imgCol2 = imgDivs[1] || '';
  }

  // Compose table rows
  const headerRow = ['Columns (columns16)'];
  const row1 = [leftCol, rightCol];
  const row2 = [imgCol1, imgCol2];

  // Only include rows that have at least one non-empty cell (besides header)
  const rows = [headerRow];
  if (row1.some(cell => cell && cell !== '')) rows.push(row1);
  if (row2.some(cell => cell && cell !== '')) rows.push(row2);

  // Build the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
