/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid container with the images
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid (each column cell)
  const gridItems = Array.from(grid.children);

  // For each grid item, find the inner image (if any)
  const cells = gridItems.map((item) => {
    // Defensive: find the image inside the nested divs
    const img = item.querySelector('img');
    return img ? img : '';
  });

  // Build the table rows
  const headerRow = ['Columns (columns16)'];
  const contentRow = cells;
  const tableRows = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
