/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout (contains columns)
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  let columns = [];

  if (mainGrid) {
    // Use all direct children of the grid as columns (covers both text and images)
    columns = Array.from(mainGrid.children).map(col => {
      // If it's an image, clone the image
      if (col.tagName === 'IMG') {
        return col.cloneNode(true);
      }
      // Otherwise, clone the full content of the column (including all text and buttons)
      const wrapper = document.createElement('div');
      Array.from(col.childNodes).forEach(node => wrapper.appendChild(node.cloneNode(true)));
      return wrapper;
    });
  }

  // Fallback: if columns not found, use the whole element
  if (columns.length === 0) columns.push(element.cloneNode(true));

  // Table header row
  const headerRow = ['Columns (columns15)'];
  // Table content row: the columns as table cells
  const contentRow = columns;

  // Create table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace original element
  element.replaceWith(table);
}
