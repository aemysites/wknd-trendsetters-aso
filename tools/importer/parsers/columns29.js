/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns29)'];

  // Get all immediate children (should be two .utility-aspect-1x1 divs)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));
  // Defensive: Only keep divs that contain an image
  const columns = columnDivs.map(div => {
    const img = div.querySelector('img');
    return img ? img : null;
  }).filter(Boolean);

  // The block expects each image in its own column (side by side)
  // Second row: one cell per image
  const contentRow = columns;

  // Compose the table rows
  const rows = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
