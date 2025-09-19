/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get all immediate child divs (each contains one image)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Each columnDiv should contain one image element
  const images = columnDivs.map(div => {
    const img = div.querySelector('img');
    return img ? img : null;
  }).filter(Boolean); // Only keep divs with images

  // Header row for the block
  const headerRow = ['Columns (columns5)'];

  // The second row: each image in its own column
  const columnsRow = images;

  // Table structure: header row, then one row with all images as columns
  const tableCells = [
    headerRow,
    columnsRow
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
