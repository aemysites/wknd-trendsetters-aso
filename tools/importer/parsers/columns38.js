/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs (each column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Required header row
  const headerRow = ['Columns (columns38)'];

  // Second row: each column gets its image element (referenced, not cloned)
  const secondRow = columns.map(col => {
    const img = col.querySelector('img');
    if (img) return img;
    // If no image, include the column itself (should not happen for this input)
    return col;
  });

  // Build table rows
  const rows = [
    headerRow,
    secondRow
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
