/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate children (these are the column cells)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: Only keep divs that contain an image (for this layout)
  const imageDivs = columnDivs.filter(div => div.querySelector('img'));

  // For this block: 5 columns, each cell contains its image div
  const columnsRow = imageDivs.map(div => div);

  // Table header must be block name
  const headerRow = ['Columns (columns5)'];

  // Compose table rows
  const tableRows = [headerRow, columnsRow];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element
  element.replaceWith(blockTable);
}
