/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main container with the grid layout (2 columns)
  const container = element.querySelector('.container');
  let grid;
  if (container) {
    grid = container.querySelector('.grid-layout');
  }
  if (!grid) {
    grid = element.querySelector('.grid-layout');
  }

  // Get all direct children of the grid (divs and imgs)
  let gridChildren = [];
  if (grid) {
    gridChildren = Array.from(grid.children);
  }
  if (gridChildren.length === 0) {
    gridChildren = Array.from(element.children);
  }

  // Compose columns flexibly: each child becomes a column
  const columns = gridChildren.map((col) => {
    // If it's an image, include it directly
    if (col.tagName === 'IMG') {
      return [col];
    }
    // For divs, include all block-level content inside
    const content = [];
    // Include headings
    col.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((el) => content.push(el));
    // Include paragraphs
    col.querySelectorAll('p').forEach((el) => content.push(el));
    // Include button groups
    col.querySelectorAll('.button-group').forEach((el) => content.push(el));
    // If nothing found, fallback to the whole column
    if (content.length === 0) {
      content.push(col);
    }
    return content;
  });

  // Table header
  const headerRow = ['Columns (columns15)'];
  // Table second row: one cell per column
  const secondRow = columns;

  // Create block table
  const cells = [headerRow, secondRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
