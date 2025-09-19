/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container (should have two columns visually)
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Find the left column content (text + buttons)
  // It's the first child grid inside the main grid
  const leftGrid = grid.querySelector('.w-layout-grid.grid-layout.container');
  let leftContent = '';
  if (leftGrid) {
    // The actual content is inside the first child of leftGrid
    const leftSection = leftGrid.firstElementChild;
    if (leftSection) {
      // Reference the actual element, not clone
      leftContent = leftSection;
    }
  }

  // Find the right column image (should be a direct child of main grid)
  // Defensive: find the first img inside the main grid that's not inside leftGrid
  let rightImage = '';
  const imgs = Array.from(grid.querySelectorAll('img'));
  rightImage = imgs.find(img => !leftGrid || !leftGrid.contains(img));
  if (rightImage) {
    // Reference the actual image element
    rightImage = rightImage;
  }

  // Table header row
  const headerRow = ['Columns (columns11)'];

  // Table content row: two columns, left is text/buttons, right is image
  const contentRow = [
    leftContent || '',
    rightImage || ''
  ];

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
