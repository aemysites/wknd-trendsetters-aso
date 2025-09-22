/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container
  const grid = element.querySelector('.grid-layout');
  // Defensive: fallback to container children if grid not found
  const columns = grid ? Array.from(grid.children) : Array.from(element.querySelector('.container')?.children ?? []);

  // If columns are empty, fallback to all children of element
  const effectiveColumns = columns.length > 0 ? columns : Array.from(element.children);

  // Header row must match target block name exactly
  const headerRow = ['Columns (columns4)'];

  // Each column: gather all child nodes (preserving semantic structure)
  const columnsRow = effectiveColumns.map((col) => {
    // If column is empty, return empty string
    if (!col || !col.childNodes || col.childNodes.length === 0) {
      return '';
    }
    // If only one child and it's an element or text, use it directly
    if (col.childNodes.length === 1) {
      const node = col.childNodes[0];
      if (
        (node.nodeType === Node.ELEMENT_NODE) ||
        (node.nodeType === Node.TEXT_NODE && node.textContent.trim())
      ) {
        return node;
      }
      return '';
    }
    // Otherwise, collect all non-empty nodes
    return Array.from(col.childNodes).filter(
      (node) => {
        if (node.nodeType === Node.ELEMENT_NODE) return true;
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) return true;
        return false;
      }
    );
  });

  // Compose table data
  const tableData = [headerRow, columnsRow];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element
  element.replaceWith(block);
}
