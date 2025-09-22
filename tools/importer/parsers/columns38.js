/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element exists and is a grid block
  if (!element || !element.classList.contains('w-layout-grid')) return;

  // Header row as specified
  const headerRow = ['Columns (columns38)'];

  // Get all direct child divs (each column cell)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract the main content (image element)
  const columns = columnDivs.map((colDiv) => {
    // Find the first image inside this column
    const img = colDiv.querySelector('img');
    // Defensive: Only include if image exists
    return img ? img : '';
  });

  // Compose table rows
  const rows = [headerRow, columns];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
