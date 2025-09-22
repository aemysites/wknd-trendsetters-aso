/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container
  const container = element.querySelector('.container');
  let leftColContent = null;
  let rightColContent = null;

  if (container) {
    const grid = container.querySelector('.grid-layout');
    if (grid) {
      // The grid should have two children: left (text) and right (image)
      const gridChildren = Array.from(grid.children);
      // Find the DIV (text) and IMG (image)
      const leftCol = gridChildren.find((el) => el.tagName === 'DIV');
      const rightCol = gridChildren.find((el) => el.tagName === 'IMG');
      // For leftCol, collect all its children (h1, p, .button-group)
      if (leftCol) {
        leftColContent = document.createElement('div');
        Array.from(leftCol.children).forEach(child => {
          leftColContent.appendChild(child.cloneNode(true));
        });
      }
      // For rightCol, just use the image
      if (rightCol) {
        rightColContent = rightCol.cloneNode(true);
      }
    }
  }

  // Defensive fallback: if missing, create empty cells
  if (!leftColContent) {
    leftColContent = document.createElement('div');
  }
  if (!rightColContent) {
    rightColContent = document.createElement('div');
  }

  // Table header row as required
  const headerRow = ['Columns (columns15)'];
  // Table second row: left and right columns
  const secondRow = [leftColContent, rightColContent];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    secondRow,
  ], document);

  element.replaceWith(table);
}
