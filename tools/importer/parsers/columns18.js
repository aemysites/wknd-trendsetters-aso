/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // Defensive: Find the content/intro, the contact list, and the image
  // Usually: [0]=intro, [1]=ul, [2]=img
  let intro = null;
  let contactList = null;
  let image = null;

  gridChildren.forEach((child) => {
    if (child.tagName === 'DIV' && !intro) {
      intro = child;
    } else if (child.tagName === 'UL' && !contactList) {
      contactList = child;
    } else if (child.tagName === 'IMG' && !image) {
      image = child;
    }
  });

  // Build the table structure: header, then two columns (left: intro, right: contacts), then a single row with the image
  const headerRow = ['Columns (columns18)'];

  // First content row: left = intro, right = contacts
  const contentRow = [
    intro ? intro : '',
    contactList ? contactList : '',
  ];

  // Second content row: image in first column, empty string in second column to match column count
  const imageRow = [
    image ? image : '',
    '',
  ];

  const tableCells = [
    headerRow,
    contentRow,
    imageRow,
  ];

  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}
