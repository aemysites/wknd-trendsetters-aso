/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Get all immediate child divs (each column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Header row as required
  const headerRow = ['Columns (columns38)'];

  // Second row: each column contains one image (per screenshot and HTML)
  const imageRow = columns.map(col => {
    // Find the image inside each column div
    const img = col.querySelector('img');
    // Defensive: Only add if image exists
    return img ? img : '';
  });

  // Build table
  const cells = [
    headerRow,
    imageRow
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
