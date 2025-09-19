/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // Find the left column (text block)
  let contactList = null;
  let textBlock = null;
  let mainImage = null;

  gridChildren.forEach((child) => {
    if (child.tagName === 'UL') {
      contactList = child;
    } else if (child.querySelector('h2, h3, p')) {
      textBlock = child;
    } else if (child.tagName === 'IMG') {
      mainImage = child;
    }
  });

  // Build left column: text block
  const leftColumnEls = [];
  if (textBlock) leftColumnEls.push(textBlock);

  // Build right column: contact list
  const rightColumnEls = [];
  if (contactList) rightColumnEls.push(contactList);

  // Table header
  const headerRow = ['Columns (columns18)'];

  // Table second row: left and right columns
  const secondRow = [leftColumnEls, rightColumnEls];

  // Table third row: image only in left column (remove empty column)
  const thirdRow = mainImage ? [[mainImage]] : null;

  // Build the table
  const cells = thirdRow ? [headerRow, secondRow, thirdRow] : [headerRow, secondRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
