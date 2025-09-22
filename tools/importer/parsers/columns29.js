/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element exists and has children
  if (!element || !element.children || element.children.length === 0) return;

  // 1. Header row: Block name
  const headerRow = ['Columns (columns29)'];

  // 2. Get all immediate child divs (each is a column)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // 3. For each column, extract its content (image)
  const columns = columnDivs.map((colDiv) => {
    // Defensive: Find the first image inside this column div
    const img = colDiv.querySelector('img');
    // Only include the image if it exists
    return img ? img : '';
  });

  // 4. Table rows: header + one row with all columns
  const tableCells = [
    headerRow,
    columns
  ];

  // 5. Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);

  // 6. Replace the source element with the new block
  element.replaceWith(blockTable);
}
