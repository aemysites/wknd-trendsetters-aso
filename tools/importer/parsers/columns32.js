/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout inside the section
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the columns: image and content
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // Column 1: image
  const imageEl = gridChildren.find(el => el.tagName === 'IMG');
  // Column 2: content block (div)
  const contentEl = gridChildren.find(el => el !== imageEl);

  // Defensive: ensure both columns exist
  if (!imageEl || !contentEl) return;

  // Use the block name exactly as required
  const headerRow = ['Columns (columns32)'];

  // Second row: preserve references to existing elements
  const secondRow = [imageEl, contentEl];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([headerRow, secondRow], document);

  // Replace the original element
  element.replaceWith(table);
}
