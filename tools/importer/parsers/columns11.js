/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Block header row
  const headerRow = ['Columns (columns11)'];

  // Find the first grid (headline/eyebrow and right text/author/button)
  const mainGrids = element.querySelectorAll(':scope > div.container > div.w-layout-grid');
  if (!mainGrids.length) return;
  const topGrid = mainGrids[0];
  const topCells = topGrid.querySelectorAll(':scope > div');

  // Left column: eyebrow + headline
  const leftCol = topCells[0] || '';
  // Right column: paragraph, author, button
  const rightCol = topCells[1] || '';

  // Find the second grid (images)
  const imageGrid = element.querySelector('.w-layout-grid.grid-gap-md');
  let img1 = '', img2 = '';
  if (imageGrid) {
    const imgCells = imageGrid.querySelectorAll('.utility-aspect-1x1');
    img1 = imgCells[0] || '';
    img2 = imgCells[1] || '';
  }

  // Compose table rows
  const rows = [
    headerRow,
    [leftCol, rightCol],
    [img1, img2]
  ];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
