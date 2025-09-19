/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.querySelectorAll(':scope > ' + selector));
  }

  // Find the main container (skip section, go to first div)
  const mainContainer = getDirectChildren(element, 'div')[0];
  if (!mainContainer) return;

  // Find the two main grids
  const grids = getDirectChildren(mainContainer, 'div');
  const topGrid = grids.find(div => div.classList.contains('grid-layout') && div.classList.contains('tablet-1-column'));
  const bottomGrid = grids.find(div => div.classList.contains('grid-layout') && div.classList.contains('mobile-portrait-1-column'));

  // --- Top row content (left and right columns) ---
  // Left column: headline, eyebrow
  let leftCol = '';
  let rightCol = '';
  if (topGrid) {
    const topChildren = getDirectChildren(topGrid, 'div');
    leftCol = topChildren[0] || '';
    rightCol = topChildren[1] || '';
  }

  // --- Bottom row images ---
  let img1 = '';
  let img2 = '';
  if (bottomGrid) {
    const imgDivs = getDirectChildren(bottomGrid, 'div');
    if (imgDivs[0]) {
      const img = imgDivs[0].querySelector('img');
      if (img) img1 = img;
    }
    if (imgDivs[1]) {
      const img = imgDivs[1].querySelector('img');
      if (img) img2 = img;
    }
  }

  // Only include rows that have at least one non-empty cell (besides header)
  const headerRow = ['Columns (columns16)'];
  const secondRow = [leftCol, rightCol];
  const thirdRow = [img1, img2];
  const cells = [headerRow];
  if (secondRow.some(cell => cell && (typeof cell !== 'string' || cell.trim() !== ''))) {
    cells.push(secondRow);
  }
  if (thirdRow.some(cell => cell && (typeof cell !== 'string' || cell.trim() !== ''))) {
    cells.push(thirdRow);
  }

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
