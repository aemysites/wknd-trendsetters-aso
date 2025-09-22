/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get the image element (first column)
  const img = grid.querySelector('img');
  // Get the content div (second column)
  const contentDiv = Array.from(grid.children).find((el) => el !== img);

  // Ensure both columns exist
  if (!img || !contentDiv) return;

  // Table header row must match block name exactly
  const headerRow = ['Columns (columns32)'];

  // Table second row: image in first cell, content in second cell
  const secondRow = [img, contentDiv];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([headerRow, secondRow], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
