/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container (main columns wrapper)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (should be image and content div)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: the image
  const imgCol = columns.find((col) => col.tagName === 'IMG');
  // Second column: the content div
  const contentCol = columns.find((col) => col.tagName !== 'IMG');

  // Defensive: ensure both columns exist
  if (!imgCol || !contentCol) return;

  // Do not clone, reference existing elements
  // Ensure all text and semantic meaning is preserved

  // Table header must match target block name exactly
  const headerRow = ['Columns (columns32)'];
  const contentRow = [imgCol, contentCol];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
