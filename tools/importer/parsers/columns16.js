/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container with images
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (each column cell)
  const gridCells = Array.from(grid.children);

  // For each grid cell, find the image inside
  const images = gridCells.map(cell => {
    // Defensive: find the image inside the nested divs
    const img = cell.querySelector('img');
    return img ? img : '';
  });

  // Build the table rows
  const headerRow = ['Columns (columns16)'];
  const imagesRow = images;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imagesRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
