/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs (each FAQ row)
  const rows = Array.from(element.querySelectorAll(':scope > div'));

  // Only divs that contain a grid (the actual FAQ rows)
  const faqRows = rows.filter(div => div.querySelector('.w-layout-grid'));

  // Build table rows
  const tableRows = [];

  // Header row (block name)
  tableRows.push(['Columns (columns23)']);

  // Each FAQ row becomes a table row with two columns: question and answer
  faqRows.forEach(faq => {
    // Find the grid inside this divider
    const grid = faq.querySelector('.w-layout-grid');
    if (!grid) return;
    // Get the two direct children: heading and answer
    const gridChildren = Array.from(grid.children);
    // Defensive: expect at least two children
    const question = gridChildren[0] || document.createElement('div');
    const answer = gridChildren[1] || document.createElement('div');
    tableRows.push([question, answer]);
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
