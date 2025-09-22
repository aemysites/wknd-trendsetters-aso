/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout div (the columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // Defensive: find the text/info column, the contact list, and the image
  let textCol = null;
  let contactList = null;
  let image = null;

  gridChildren.forEach((child) => {
    if (child.tagName === 'DIV' && child.querySelector('h2') && child.querySelector('h3')) {
      textCol = child;
    } else if (child.tagName === 'UL') {
      contactList = child;
    } else if (child.tagName === 'IMG') {
      image = child;
    }
  });

  // Compose the left column: textCol + contactList
  const leftColumnContent = [];
  if (textCol) leftColumnContent.push(textCol);
  if (contactList) leftColumnContent.push(contactList);

  // Compose the right column: image
  const rightColumnContent = image ? [image] : [];

  // Build the table rows
  const headerRow = ['Columns (columns18)'];
  const columnsRow = [leftColumnContent, rightColumnContent];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  element.replaceWith(table);
}
