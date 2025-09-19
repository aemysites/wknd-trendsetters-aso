/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by selector
  const getDirectChildren = (parent, selector) => {
    return Array.from(parent.querySelectorAll(':scope > ' + selector));
  };

  // Find the main containers
  const mainContainers = getDirectChildren(element, 'div');
  if (mainContainers.length < 2) return; // Defensive: must have at least two main columns

  // --- First visual row: headline/text/author/button (left) & description (right) ---
  // Left column: headline, eyebrow, author, button
  const leftColContainer = mainContainers[0];
  // Get the grid that contains headline and right-side description
  const gridContainers = getDirectChildren(leftColContainer, 'div');
  if (gridContainers.length < 1) return;
  const topGrid = gridContainers[0];
  const topGridCols = getDirectChildren(topGrid, 'div');
  if (topGridCols.length < 2) return;

  // Left cell: headline, eyebrow, etc.
  const headlineCol = topGridCols[0];
  // Right cell: description, author, button
  const descCol = topGridCols[1];

  // --- Second visual row: two images side by side ---
  const imagesGrid = mainContainers[1];
  const imageCells = getDirectChildren(imagesGrid, 'div');
  // Defensive: Only use images that exist
  const images = imageCells
    .map(cell => cell.querySelector('img'))
    .filter(img => !!img);

  // --- Compose table rows ---
  const headerRow = ['Columns (columns16)'];

  // First content row: headline/text/author/button | description/author/button
  // We'll combine headlineCol and descCol as two columns
  const firstContentRow = [headlineCol, descCol];

  // Second content row: images side by side
  // Each image in its own column
  const secondContentRow = images;

  // Compose table
  const cells = [
    headerRow,
    firstContentRow,
    secondContentRow
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
