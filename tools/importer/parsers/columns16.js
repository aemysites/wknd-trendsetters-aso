/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate children by selector
  const getChildren = (el, selector) => Array.from(el.querySelectorAll(selector));

  // 1. Header row
  const headerRow = ['Columns (columns16)'];

  // 2. Identify main column groups
  // The first grid (grid-layout tablet-1-column grid-gap-lg) contains the text and author info
  // The second grid (grid-layout mobile-portrait-1-column grid-gap-md utility-margin-top-8rem y-top) contains the two images

  // Find the main grids
  const grids = element.querySelectorAll('.w-layout-grid.grid-layout');

  // --- Left column: Title, subtitle, description, author, button ---
  // Get title block
  const titleBlock = element.querySelector('.utility-margin-bottom-0'); // h1
  const eyebrow = element.querySelector('.eyebrow');
  // Get description paragraph
  const descPara = element.querySelector('.rich-text.paragraph-lg p');
  // Get author block (avatar, name, date, read time)
  const authorRow = element.querySelector('.flex-horizontal.y-center.flex-gap-xs');
  // Get button
  const readMoreBtn = element.querySelector('.button');

  // Compose left column
  const leftCol = document.createElement('div');
  if (eyebrow) leftCol.appendChild(eyebrow);
  if (titleBlock) leftCol.appendChild(titleBlock);
  if (descPara) leftCol.appendChild(descPara);
  if (authorRow) leftCol.appendChild(authorRow);
  if (readMoreBtn) leftCol.appendChild(readMoreBtn);

  // --- Right column: Two images stacked vertically ---
  // Get image grid
  const imageGrid = element.querySelector('.w-layout-grid.mobile-portrait-1-column');
  let images = [];
  if (imageGrid) {
    images = Array.from(imageGrid.querySelectorAll('img'));
  }
  // Compose right column
  const rightCol = document.createElement('div');
  images.forEach(img => rightCol.appendChild(img));

  // 3. Build table rows
  // Screenshot shows two main columns: left (text/author/button), right (images)
  const secondRow = [leftCol, rightCol];

  // 4. Create block table
  const cells = [headerRow, secondRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // 5. Replace original element
  element.replaceWith(block);
}
