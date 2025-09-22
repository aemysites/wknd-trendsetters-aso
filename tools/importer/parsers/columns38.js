/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs (each column cell)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: Only proceed if we have at least one column
  if (!columns.length) return;

  // Table header row per requirements
  const headerRow = ['Columns (columns38)'];

  // Second row: one cell per column, each containing the full content of the div
  // We use the divs themselves as cell content for resilience
  const contentRow = columns;

  // Compose the table data
  const tableData = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
