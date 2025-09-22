/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as per block requirements
  const headerRow = ['Hero (hero35)'];

  // Always include the background image row (empty if no image)
  let backgroundRow = [''];
  const img = element.querySelector('img');
  if (img) backgroundRow = [img];

  // Content row: collect title, subheading, and CTA (button)
  const grid = element.querySelector('.grid-layout');
  let contentCell = [];
  if (grid) {
    const contentDiv = grid.children[0];
    if (contentDiv) {
      const h2 = contentDiv.querySelector('h2');
      const subheading = contentDiv.querySelector('p');
      if (h2) contentCell.push(h2);
      if (subheading) contentCell.push(subheading);
    }
    const cta = grid.children[1];
    if (cta) contentCell.push(cta);
  }
  if (contentCell.length === 0) contentCell = [''];
  const contentRow = [contentCell];

  // Build the table with exactly 3 rows (header, background, content)
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    backgroundRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
