/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Columns (columns23)'];

  // Get all immediate children of the block (each is a 'divider' containing a grid)
  const dividers = Array.from(element.querySelectorAll(':scope > .divider'));

  // Defensive: fallback if .divider is not direct child (rare)
  const fallbackDividers = dividers.length ? dividers : Array.from(element.children);

  // For each divider, extract the grid's two children: question and answer
  const rows = fallbackDividers.map(divider => {
    // Find the grid inside the divider
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return [divider.cloneNode(true), '']; // fallback: put whole divider in first cell
    const gridChildren = Array.from(grid.children);
    // Defensive: expect at least two children per grid
    const question = gridChildren[0] || document.createElement('div');
    const answer = gridChildren[1] || document.createElement('div');
    return [question, answer];
  });

  // Compose the table: header row, then each Q/A row
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
