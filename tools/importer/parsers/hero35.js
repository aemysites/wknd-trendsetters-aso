/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Hero (hero35)'];

  // There is no background image in the source HTML, so row 2 is empty
  const bgImageRow = [''];

  // Find the grid layout div (contains the content)
  const grid = element.querySelector('.w-layout-grid');
  let contentCell = '';
  if (grid) {
    // The first child div contains heading and subheading
    const contentDiv = grid.querySelector('div');
    // The button is the <a> in the grid
    const cta = grid.querySelector('a');
    // Compose content cell
    const cellContent = [];
    if (contentDiv) {
      // Add all children of contentDiv (e.g., h2, p)
      Array.from(contentDiv.children).forEach((child) => {
        cellContent.push(child);
      });
    }
    if (cta) {
      cellContent.push(cta);
    }
    if (cellContent.length) {
      contentCell = cellContent;
    }
  }
  const contentRow = [contentCell];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgImageRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
