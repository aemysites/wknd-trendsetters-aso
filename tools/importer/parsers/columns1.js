/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the grid layout (the two columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // 2. Extract the left column: the image
  const img = gridChildren.find(el => el.tagName === 'IMG');

  // 3. Extract the right column: heading, subheading, buttons
  const contentDiv = gridChildren.find(el => el !== img);
  let col2Content = [];
  if (contentDiv) {
    // Heading (h1)
    const heading = contentDiv.querySelector('h1');
    if (heading) col2Content.push(heading);
    // Subheading (p)
    const subheading = contentDiv.querySelector('p');
    if (subheading) col2Content.push(subheading);
    // Button group
    const buttonGroup = contentDiv.querySelector('.button-group');
    if (buttonGroup) col2Content.push(buttonGroup);
  }

  // 4. Build the columns block table
  const headerRow = ['Columns (columns1)'];
  const columnsRow = [img, col2Content];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // 5. Replace original element with the block table
  element.replaceWith(table);
}
