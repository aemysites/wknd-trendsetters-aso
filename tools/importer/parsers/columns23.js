/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns23)'];
  
  // Defensive: get all immediate children that represent each Q&A pair
  // Each divider contains a grid with two children: question and answer
  const dividers = Array.from(element.querySelectorAll(':scope > .divider'));

  // Each row will have two columns: left (question), right (answer)
  const rows = dividers.map(divider => {
    // Find the grid inside the divider
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return ['', ''];
    // Get the two children: question and answer
    const cells = Array.from(grid.children);
    // Defensive: ensure we have at least two cells
    const left = cells[0] || document.createElement('div');
    const right = cells[1] || document.createElement('div');
    return [left, right];
  });

  // Compose the table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(block);
}
