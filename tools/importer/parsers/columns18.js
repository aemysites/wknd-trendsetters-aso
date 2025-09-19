/* global WebImporter */
export default function parse(element, { document }) {
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  const gridChildren = Array.from(grid.querySelectorAll(':scope > *'));

  // Find the left column (headings and paragraph)
  const leftCol = gridChildren.find(el => el.querySelector('h2') && el.querySelector('h3'));
  // Find the right column (ul with contacts)
  const rightCol = gridChildren.find(el => el.tagName === 'UL');
  // Find the image (img)
  const imgCol = gridChildren.find(el => el.tagName === 'IMG');

  const headerRow = ['Columns (columns18)'];
  const secondRow = [leftCol, rightCol];
  // Third row: image in both columns, no empty columns
  const thirdRow = [imgCol, imgCol];

  const cells = [
    headerRow,
    secondRow,
    thirdRow
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
