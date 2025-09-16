/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // Identify left column (intro text), contact list, and image
  let leftCol = null;
  let contactList = null;
  let image = null;
  gridChildren.forEach((child) => {
    if (child.tagName === 'DIV' && child.querySelector('h2')) {
      leftCol = child;
    } else if (child.tagName === 'UL') {
      contactList = child;
    } else if (child.tagName === 'IMG') {
      image = child;
    }
  });

  // Defensive: If any are missing, abort
  if (!leftCol || !contactList || !image) return;

  // Compose the header row exactly as required
  const headerRow = ['Columns (columns18)'];

  // Compose the columns row, referencing existing elements
  const columnsRow = [leftCol, contactList, image];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([headerRow, columnsRow], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
