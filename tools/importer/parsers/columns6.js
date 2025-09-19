/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate children (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Each column is a .utility-aspect-1x1 div containing an image
  // We want each image in its own column cell, referencing the actual <img> elements
  const images = columns.map(col => {
    const img = col.querySelector('img');
    return img ? img : document.createTextNode('');
  });

  // Table rows: header, then one row with all images as columns
  const headerRow = ['Columns (columns6)'];
  const contentRow = images;

  const cells = [headerRow, contentRow];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
