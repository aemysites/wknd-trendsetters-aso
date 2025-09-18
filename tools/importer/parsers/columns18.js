/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Identify columns: left content, contact list, image
  let leftContent = null;
  let contactList = null;
  let image = null;

  // The grid has 3 children: leftContent (DIV), contactList (UL), image (IMG)
  Array.from(grid.children).forEach((child) => {
    if (child.tagName === 'DIV') {
      leftContent = child;
    } else if (child.tagName === 'UL') {
      contactList = child;
    } else if (child.tagName === 'IMG') {
      image = child;
    }
  });

  // Compose the columns row: leftContent, contactList, image
  // Only include non-null columns
  const columnsRow = [leftContent, contactList, image].filter(Boolean);
  if (columnsRow.length === 0) return;

  // Table header must match block name exactly
  const headerRow = ['Columns (columns18)'];
  const tableRows = [headerRow, columnsRow];

  // Create the table using DOMUtils, referencing existing elements
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the whole section with the block table
  element.replaceWith(table);
}
