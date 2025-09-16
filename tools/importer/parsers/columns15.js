/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the two columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Find the left and right columns
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column: collect all content (headline, subheading, button group)
  const leftCol = columns[0];
  const leftCellContent = [];
  Array.from(leftCol.childNodes).forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      leftCellContent.push(node);
    } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = node.textContent.trim();
      leftCellContent.push(p);
    }
  });

  // Right column: collect all content (image and any text)
  const rightCol = columns[1];
  const rightCellContent = [];
  Array.from(rightCol.childNodes).forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      rightCellContent.push(node);
    } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = node.textContent.trim();
      rightCellContent.push(p);
    }
  });

  // Only include columns with actual content
  const cells = [];
  if (leftCellContent.length > 0) cells.push(leftCellContent);
  if (rightCellContent.length > 0) cells.push(rightCellContent);

  if (cells.length === 0) return;

  // Table rows
  const headerRow = ['Columns (columns15)'];
  const contentRow = cells;

  // Create table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace original element
  element.replaceWith(table);
}
