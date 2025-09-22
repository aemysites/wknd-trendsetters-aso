/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract the <img> element (reference, not clone)
  const contentRow = columns.map(col => {
    const img = col.querySelector('img');
    // If no image, return empty string (edge case)
    return img || '';
  });

  // Build table rows
  const headerRow = ['Columns (columns6)'];
  const rows = [headerRow, contentRow];

  // Create the table using DOMUtils
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
