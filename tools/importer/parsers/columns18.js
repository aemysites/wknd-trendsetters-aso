/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container (the main content block)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // Defensive: Find the left content (text block)
  let leftContent = null;
  let rightContent = null;
  let imageContent = null;

  // The structure is: [left text block, right contact list, image]
  // But let's be defensive and check types
  for (const child of gridChildren) {
    if (child.tagName === 'DIV' && !leftContent) {
      leftContent = child;
    } else if (child.tagName === 'UL' && !rightContent) {
      rightContent = child;
    } else if (child.tagName === 'IMG' && !imageContent) {
      imageContent = child;
    }
  }

  // Build the table rows
  const headerRow = ['Columns (columns18)'];
  const contentRow = [
    leftContent ? leftContent : '',
    rightContent ? rightContent : '',
  ];
  const rows = [headerRow, contentRow];
  // Fix: Image row must have same number of columns as contentRow
  if (imageContent) {
    rows.push([imageContent, '']);
  }

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
