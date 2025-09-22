/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main container
  const container = element.querySelector('.container');
  if (!container) return;

  // Find the first grid: contains heading/eyebrow and summary/author/button
  const grids = container.querySelectorAll('.w-layout-grid.grid-layout');
  if (!grids.length) return;
  const topGrid = grids[0];
  const topCols = Array.from(topGrid.children);
  if (topCols.length < 2) return;
  const leftCol = topCols[0];
  const rightCol = topCols[1];

  // Find the second grid: contains two images
  const imageGrid = element.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
  let imgCols = [];
  if (imageGrid) {
    imgCols = Array.from(imageGrid.children);
  }

  // Compose columns for the block
  const headerRow = ['Columns (columns16)'];
  const rows = [headerRow];

  // Second row: heading/eyebrow and summary/author/button
  rows.push([leftCol, rightCol]);

  // Third row: two images (if present)
  if (imgCols.length === 2) {
    rows.push([imgCols[0], imgCols[1]]);
  }

  // Create and replace with a new table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
