/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns23)'];

  // Defensive: get all immediate children divs (each is a 'divider' block)
  const dividers = Array.from(element.querySelectorAll(':scope > div'));

  // Each divider contains a grid with two children: heading and paragraph
  // We'll extract each pair and put them in a two-column row
  const rows = dividers.map(divider => {
    // Find the grid inside this divider
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return ['', '']; // fallback empty cells if structure is off
    // Get all direct children of the grid (should be heading and rich-text)
    const gridChildren = Array.from(grid.children);
    // Defensive: ensure we have at least two children
    const heading = gridChildren[0] || document.createElement('div');
    const content = gridChildren[1] || document.createElement('div');
    return [heading, content];
  });

  // Compose the table cells
  const cells = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
