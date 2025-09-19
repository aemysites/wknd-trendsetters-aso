/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Columns (columns23)'];

  // Defensive: get all immediate children that are dividers (each is a row visually)
  const dividerDivs = Array.from(element.querySelectorAll(':scope > div.divider'));

  // Each divider contains a grid-layout with two children: question and answer
  const rows = dividerDivs.map(divider => {
    // Find the grid-layout inside the divider
    const grid = divider.querySelector('.grid-layout');
    if (!grid) return ['', '']; // fallback empty cells
    const children = Array.from(grid.children);
    // Defensive: Expecting two children: heading and paragraph
    const heading = children.find(child => child.classList.contains('h4-heading'));
    const answer = children.find(child => child.classList.contains('rich-text'));
    // Use the actual elements for resilience
    return [heading || '', answer || ''];
  });

  // Compose the table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(block);
}
