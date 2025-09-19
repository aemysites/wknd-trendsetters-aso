/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get columns: image and content
  const children = Array.from(grid.children);
  const imgEl = children.find((el) => el.tagName === 'IMG');
  const contentEl = children.find((el) => el !== imgEl);

  // Table header row must match target block name exactly
  const headerRow = ['Columns (columns1)'];

  // Table second row: reference the actual DOM elements
  const row = [imgEl, contentEl].map((el) => el ? el : document.createElement('div'));

  // Create the table
  const table = WebImporter.DOMUtils.createTable([headerRow, row], document);

  // Replace the original element
  element.replaceWith(table);
}
