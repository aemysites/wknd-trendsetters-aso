/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid layout container (the actual columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get all immediate children of the grid layout (these are the columns)
  const columns = Array.from(grid.querySelectorAll(':scope > div'));
  // Each column may contain one or more elements (e.g., <p>, <a>), so we want to preserve all content in each column
  // For each column, gather its children (if only one, use that element; if multiple, use array)
  const cells = columns.map((col) => {
    // If the column has only one child, use it directly
    const kids = Array.from(col.childNodes).filter((node) => {
      // Only include elements and text nodes with non-whitespace
      return (node.nodeType === 1) || (node.nodeType === 3 && node.textContent.trim());
    });
    if (kids.length === 1) {
      return kids[0];
    }
    return kids;
  });
  // Table header row (block name)
  const headerRow = ['Columns (columns31)'];
  // Build table rows: header, then one row with all columns
  const tableRows = [headerRow, cells];
  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  // Replace the original element with the new block
  element.replaceWith(block);
}
