/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get all immediate children (should be 3 divs, each with an image)
  const children = Array.from(element.children);
  // Each child is a div.utility-aspect-1x1 containing an img
  const columns = children.map(div => {
    // Find the first image inside this div
    const img = div.querySelector('img');
    // Reference the image element directly (do not clone)
    return img ? img : div;
  });

  // Build the table: header row, then one row with three columns
  const headerRow = ['Columns (columns6)'];
  const contentRow = columns;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
