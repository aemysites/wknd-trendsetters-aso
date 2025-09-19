/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid
  const gridChildren = Array.from(grid.querySelectorAll(':scope > *'));

  // Find the intro block (headings and paragraph)
  const introBlock = gridChildren.find(
    (child) => child.querySelector('h2') && child.querySelector('h3')
  );

  // Find the contact methods list
  const contactList = gridChildren.find(
    (child) => child.tagName === 'UL'
  );

  // Find the image
  const image = gridChildren.find(
    (child) => child.tagName === 'IMG'
  );

  // Table header row
  const headerRow = ['Columns (columns18)'];

  // First content row: left = intro, right = contact methods
  const firstRow = [introBlock, contactList];

  // Second content row: image in first cell, and null in second cell (no unnecessary empty column)
  const secondRow = [image, null];

  // Build table
  const cells = [
    headerRow,
    firstRow,
    secondRow
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(blockTable);
}
