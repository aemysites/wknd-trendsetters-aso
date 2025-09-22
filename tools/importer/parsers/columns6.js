/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element exists and has children
  if (!element || !element.children || element.children.length === 0) return;

  // Table header row as per block requirements
  const headerRow = ['Columns (columns6)'];

  // Get all immediate child divs (each is a column cell)
  const cells = Array.from(element.querySelectorAll(':scope > div')).map((colDiv) => {
    // For each column cell, try to find the image (if present)
    const img = colDiv.querySelector('img');
    // Defensive: If no image, fallback to the column div itself
    return img ? img : colDiv;
  });

  // The block table expects: first row = header, second row = columns
  const tableData = [headerRow, cells];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
