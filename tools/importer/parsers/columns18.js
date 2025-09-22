/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout div (the columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // Find the text block (first div)
  const textBlock = gridChildren.find((el) => el.tagName === 'DIV');
  // Find the ul (contact methods)
  const contactList = gridChildren.find((el) => el.tagName === 'UL');
  // Find the image (img)
  const image = gridChildren.find((el) => el.tagName === 'IMG');

  // Defensive: If any of the main pieces are missing, don't proceed
  if (!textBlock || !contactList || !image) return;

  // Build the table rows
  const headerRow = ['Columns (columns18)'];
  // First content row: two columns (text block, contact methods)
  const firstContentRow = [textBlock, contactList];
  // Second content row: must have same number of columns as the second row (2 columns)
  // Place image in first column, but DO NOT add a second column at all (omit it entirely)
  const secondContentRow = [image];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    firstContentRow,
    secondContentRow,
  ], document);

  // Ensure the last row has only one cell (no unnecessary empty columns)
  const lastRow = table.rows[2];
  while (lastRow && lastRow.cells.length > 1) {
    lastRow.deleteCell(lastRow.cells.length - 1);
  }

  // Replace the original element with the table
  element.replaceWith(table);
}
