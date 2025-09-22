/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by selector
  function getDirectChildrenBySelector(parent, selector) {
    return Array.from(parent.children).filter(el => el.matches(selector));
  }

  // Find the main container with the two main grids
  const container = element.querySelector('.container');
  if (!container) return;

  // The first grid: headline, intro, author, button
  const grids = container.querySelectorAll(':scope > .w-layout-grid');
  if (grids.length < 1) return;
  const topGrid = grids[0];

  // Left column: eyebrow + h1
  const leftCol = topGrid.children[0];
  // Right column: intro, author, button
  const rightCol = topGrid.children[1];

  // Compose left cell content
  const leftCellContent = [];
  // Eyebrow
  const eyebrow = leftCol.querySelector('.eyebrow');
  if (eyebrow) leftCellContent.push(eyebrow);
  // Headline
  const h1 = leftCol.querySelector('h1');
  if (h1) leftCellContent.push(h1);

  // Compose right cell content
  const rightCellContent = [];
  // Paragraph
  const intro = rightCol.querySelector('.rich-text');
  if (intro) rightCellContent.push(intro);
  // Author block (avatar, name, meta)
  const authorGrid = rightCol.querySelector('.w-layout-grid');
  if (authorGrid) {
    // Only include the author info (first child)
    const authorInfo = authorGrid.children[0];
    if (authorInfo) rightCellContent.push(authorInfo);
    // Button (second child)
    const button = authorGrid.querySelector('a.button');
    if (button) rightCellContent.push(button);
  }

  // Second grid: two images
  const bottomGrid = grids[1];
  let img1 = null, img2 = null;
  if (bottomGrid) {
    const imgDivs = bottomGrid.querySelectorAll('.utility-aspect-1x1');
    if (imgDivs[0]) img1 = imgDivs[0].querySelector('img');
    if (imgDivs[1]) img2 = imgDivs[1].querySelector('img');
  }

  // Build table rows
  const headerRow = ['Columns (columns16)'];
  const contentRow1 = [leftCellContent, rightCellContent];
  const contentRow2 = [];
  if (img1) contentRow2.push(img1);
  if (img2) contentRow2.push(img2);

  // Only add second row if both images are present
  const rows = [headerRow, contentRow1];
  if (contentRow2.length === 2) rows.push(contentRow2);

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
