/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container with two columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the two columns: image and content
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: image (reference the actual DOM element)
  let imgCell = null;
  const img = columns[0].tagName === 'IMG' ? columns[0] : columns[0].querySelector('img');
  if (img) imgCell = img;

  // Second column: content (reference the actual DOM element)
  const contentCell = columns[1];

  // Table header row must match block name exactly
  const headerRow = ['Columns (columns1)'];

  // Table content row: image in first cell, content in second cell
  const contentRow = [imgCell, contentCell];

  // Build the table using DOMUtils
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
