/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs (each contains an image)
  const columnDivs = element.querySelectorAll(':scope > div');

  // Only include divs with an img inside
  const columns = Array.from(columnDivs)
    .map(div => div.querySelector('img'))
    .filter(img => img);

  // Table header row must match the target block name exactly
  const headerRow = ['Columns (columns5)'];

  // Second row: one cell per image element (reference, not clone)
  const imageRow = columns;

  // Build table data
  const tableData = [headerRow, imageRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element with block table
  element.replaceWith(block);
}
