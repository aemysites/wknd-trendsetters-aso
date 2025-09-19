/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate children by selector
  const getChildren = (parent, selector) => Array.from(parent.querySelectorAll(selector));

  // 1. Header row
  const headerRow = ['Columns (columns16)'];

  // 2. Find main content columns (top grid)
  // The first .grid-layout is the main content area (headline, intro, author, button)
  const mainContainer = element.querySelector('.container');
  const mainGrid = mainContainer.querySelector('.grid-layout.tablet-1-column');
  const mainGridChildren = getChildren(mainGrid, ':scope > div');

  // Left column: headline and eyebrow
  const leftCol = mainGridChildren[0];
  // Right column: intro, author, button
  const rightCol = mainGridChildren[1];

  // Compose left column cell
  // Contains eyebrow and headline
  const leftCellContent = [];
  const eyebrow = leftCol.querySelector('.eyebrow');
  if (eyebrow) leftCellContent.push(eyebrow);
  const headline = leftCol.querySelector('h1');
  if (headline) leftCellContent.push(headline);

  // Compose right column cell
  const rightCellContent = [];
  // Paragraph
  const intro = rightCol.querySelector('.rich-text');
  if (intro) rightCellContent.push(intro);
  // Author block
  const authorRow = rightCol.querySelector('.w-layout-grid.grid-layout');
  if (authorRow) {
    // Author info (avatar, name, date, read time)
    const authorInfo = authorRow.querySelector('.flex-horizontal.y-center');
    if (authorInfo) rightCellContent.push(authorInfo);
    // Button
    const button = authorRow.querySelector('a.button');
    if (button) rightCellContent.push(button);
  }

  // 3. Find image columns (bottom grid)
  const bottomGrid = element.querySelector('.w-layout-grid.mobile-portrait-1-column');
  const bottomGridChildren = getChildren(bottomGrid, ':scope > .utility-aspect-1x1');

  // Compose bottom row cells
  const bottomRowCells = [];
  bottomGridChildren.forEach((aspectDiv) => {
    const img = aspectDiv.querySelector('img');
    if (img) bottomRowCells.push(img);
  });

  // 4. Build table rows
  // Second row: headline/eyebrow | intro/author/button
  const secondRow = [leftCellContent, rightCellContent];
  // Third row: image | image
  const thirdRow = bottomRowCells;

  // 5. Create table
  const cells = [
    headerRow,
    secondRow,
    thirdRow,
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // 6. Replace original element
  element.replaceWith(table);
}
