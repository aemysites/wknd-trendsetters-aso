/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid-layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // Defensive: find the left content (text) and right content (contact list)
  // and the image
  let leftContent = null;
  let rightContent = null;
  let image = null;

  // The left content is the div with h2/h3/p
  leftContent = gridChildren.find((el) => el.querySelector('h2, h3, p'));
  // The right content is the ul with contact methods
  rightContent = gridChildren.find((el) => el.tagName === 'UL');
  // The image is the img element
  image = gridChildren.find((el) => el.tagName === 'IMG');

  // Build the table rows
  const headerRow = ['Columns (columns18)'];
  // First content row: left (text), right (contacts)
  const firstContentRow = [
    leftContent ? leftContent : '',
    rightContent ? rightContent : '',
  ];
  // Second content row: image (left), always empty (right) to match column count
  const secondContentRow = [
    image ? image : '',
    '',
  ];

  const tableRows = [headerRow, firstContentRow, secondContentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element
  element.replaceWith(block);
}
