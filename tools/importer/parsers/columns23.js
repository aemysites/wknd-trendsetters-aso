/* global WebImporter */
export default function parse(element, { document }) {
  // Table header
  const headerRow = ['Columns (columns23)'];

  // Defensive: get all immediate child divs (each is a 'divider' block)
  const dividers = Array.from(element.querySelectorAll(':scope > div.divider'));

  // Each divider contains a grid with two children: heading and paragraph
  const contentRows = dividers.map(divider => {
    // Find the grid inside the divider
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return ['', ''];
    // Get the two children: heading and rich text
    const children = Array.from(grid.children);
    // Defensive: ensure two columns
    const heading = children[0] || document.createElement('div');
    const richText = children[1] || document.createElement('div');
    return [heading, richText];
  });

  // Build table data
  const tableData = [headerRow, ...contentRows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace element
  element.replaceWith(block);
}
