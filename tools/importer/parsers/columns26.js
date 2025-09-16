/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main grid containing the two columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid
  const gridChildren = Array.from(grid.children);

  // Column 1: Heading and quote
  // Find the heading and paragraph
  const heading = gridChildren.find(el => el.matches('p.h2-heading'));
  const quote = gridChildren.find(el => el.matches('p.paragraph-lg'));
  // Compose column 1
  const col1Content = [];
  if (heading) col1Content.push(heading);
  if (quote) col1Content.push(quote);

  // Column 2: Divider, avatar, name/title, and logo
  // The third child is another grid containing these
  const subGrid = gridChildren.find(el => el.classList.contains('w-layout-grid') && el !== grid);
  let col2Content = [];
  if (subGrid) {
    // Get all immediate children of the subGrid
    const subGridChildren = Array.from(subGrid.children);
    // Divider
    const divider = subGridChildren.find(el => el.classList.contains('divider'));
    if (divider) col2Content.push(divider);
    // Flex row: avatar + name/title
    const flexRow = subGridChildren.find(el => el.classList.contains('flex-horizontal'));
    if (flexRow) col2Content.push(flexRow);
    // Logo (SVG)
    const logo = subGridChildren.find(el => el.querySelector('svg'));
    if (logo) col2Content.push(logo);
  }

  // Build table rows
  const headerRow = ['Columns (columns26)'];
  const contentRow = [col1Content, col2Content];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
