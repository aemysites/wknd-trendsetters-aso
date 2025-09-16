/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // 1. Header row: Must match the target block name exactly
  const headerRow = ['Hero (hero28)'];

  // 2. Background image: Use the first <img> in the block
  let imageCell = null;
  const img = element.querySelector('img');
  if (img) {
    imageCell = img;
  }

  // 3. Text content: Find the correct grid cell containing headings, etc
  let textCell = null;
  const grid = element.querySelector('.w-layout-grid');
  if (grid) {
    const gridChildren = grid.querySelectorAll(':scope > div');
    if (gridChildren.length > 1) {
      // Reference the actual container element so all formatting is preserved
      const textContainer = gridChildren[1];
      textCell = textContainer;
    }
  }

  // 4. Compose table rows
  const rows = [
    headerRow,
    [imageCell],
    [textCell],
  ];

  // 5. Remove rows where the cell is missing
  const filteredRows = rows.filter(row => row[0]);

  // 6. Create the table block
  const block = WebImporter.DOMUtils.createTable(filteredRows, document);

  // 7. Replace the original element with the block
  element.replaceWith(block);
}
