/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get grid children: visually two columns
  const gridChildren = Array.from(grid.children);
  // Left column: h2
  const h2 = gridChildren.find((el) => el.tagName === 'H2');
  // Right column: div with paragraph and button
  const contentDiv = gridChildren.find((el) => el.tagName === 'DIV');
  if (!h2 || !contentDiv) return;

  // Get paragraph and button from right column
  const contentChildren = Array.from(contentDiv.children);
  const paragraph = contentChildren.find((el) => el.tagName === 'P');
  const button = contentChildren.find((el) => el.tagName === 'A');

  // Compose the columns block table
  const headerRow = ['Columns (columns7)'];
  const contentRow = [h2, [paragraph, button].filter(Boolean)];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
