/* global WebImporter */
export default function parse(element, { document }) {
  // Get direct children (should be two divs, each with an image)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // Each column div contains an image
  const images = columns.map(col => {
    // Find the image inside each column
    const img = col.querySelector('img');
    // Reference the existing image element if found
    return img ? img : document.createTextNode('');
  });

  // Table header row (block name)
  const headerRow = ['Columns (columns29)'];
  // Second row: one cell per image
  const contentRow = images;

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace original element with new table
  element.replaceWith(table);
}
