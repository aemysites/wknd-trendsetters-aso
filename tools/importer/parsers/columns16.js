/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main container
  const container = element.querySelector(':scope > .container');
  if (!container) return;

  // Find the first grid (headline/eyebrow and intro/author/button)
  const grids = container.querySelectorAll(':scope > .w-layout-grid');
  if (grids.length < 1) return;
  const topGrid = grids[0];
  const topGridChildren = Array.from(topGrid.children);
  if (topGridChildren.length < 2) return;
  // Clone nodes so we don't move them from the DOM
  const leftCol = topGridChildren[0].cloneNode(true);
  const rightCol = topGridChildren[1].cloneNode(true);

  // Find the image grid (second grid)
  let imagesGrid = null;
  if (grids.length > 1) {
    imagesGrid = grids[1];
  } else {
    imagesGrid = container.querySelector('.utility-margin-top-8rem');
  }
  if (!imagesGrid) return;

  // Get images (as elements)
  const imageCells = Array.from(imagesGrid.children).map((cell) => {
    const img = cell.querySelector('img');
    if (!img) return '';
    return img.cloneNode(true);
  });
  // Ensure two columns for images row
  while (imageCells.length < 2) imageCells.push('');

  // Compose the table rows
  const headerRow = ['Columns (columns16)'];
  const secondRow = [leftCol, rightCol];
  const thirdRow = imageCells;

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    secondRow,
    thirdRow
  ], document);

  // Remove all children from the element before replacing
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }

  // Replace the original element
  element.appendChild(table);
}
