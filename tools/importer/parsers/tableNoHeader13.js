/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct children divs with class 'divider' (each FAQ row)
  const rows = Array.from(element.querySelectorAll(':scope > .divider'));

  // Prepare table rows
  const tableRows = [];

  // Always start with the required header row
  tableRows.push(['Table (no header, tableNoHeader13)']);

  // For each row, extract the question and answer
  rows.forEach(divider => {
    // Find the grid inside the divider
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return;
    // Get the two columns: question and answer
    const cols = Array.from(grid.children);
    // Defensive: expect 2 columns (question, answer)
    if (cols.length < 2) return;
    // Reference existing elements for semantic meaning
    tableRows.push([cols[0], cols[1]]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  // Replace the original element with the table
  element.replaceWith(table);
}
