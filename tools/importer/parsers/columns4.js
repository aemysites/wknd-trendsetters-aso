/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists and is a container
  if (!element || !element.children || element.children.length === 0) return;

  // Header row as required
  const headerRow = ['Columns (columns4)'];

  // Get all immediate children (each column cell)
  // Each child is a div containing an image
  const columnDivs = Array.from(element.children);

  // For each column, extract the content (the image element)
  const columns = columnDivs.map((colDiv) => {
    // Defensive: find the img inside the column div
    const img = colDiv.querySelector('img');
    return img ? img : '';
  });

  // Build the table rows
  const rows = [headerRow, columns];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
