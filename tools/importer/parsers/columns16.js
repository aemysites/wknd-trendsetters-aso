/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main container
  const container = element.querySelector(':scope > .container');
  if (!container) return;

  // Find the two main grids
  const grids = container.querySelectorAll(':scope > .w-layout-grid');
  if (grids.length < 2) return;
  const topGrid = grids[0];
  const imageGrid = grids[1];

  // --- First row: block name ---
  const headerRow = ['Columns (columns16)'];

  // --- Second row: left (all text), right (empty) ---
  const leftCol = document.createElement('div');

  // Eyebrow
  const eyebrow = topGrid.querySelector('.eyebrow');
  if (eyebrow) leftCol.appendChild(eyebrow.cloneNode(true));
  // Heading
  const heading = topGrid.querySelector('h1');
  if (heading) leftCol.appendChild(heading.cloneNode(true));
  // Paragraph
  const para = topGrid.querySelector('.rich-text p');
  if (para) leftCol.appendChild(para.cloneNode(true));

  // Author block
  const authorBlock = topGrid.querySelector('.avatar');
  if (authorBlock) {
    const authorWrap = document.createElement('div');
    // Avatar image
    const img = authorBlock.querySelector('img');
    if (img) authorWrap.appendChild(img.cloneNode(true));
    // Author name
    const name = authorBlock.parentElement.querySelector('.paragraph-sm:not(.utility-text-secondary)');
    if (name) authorWrap.appendChild(name.cloneNode(true));
    // Meta (date, dot, read time)
    const meta = authorBlock.parentElement.querySelectorAll('.utility-text-secondary');
    meta.forEach((el) => authorWrap.appendChild(el.cloneNode(true)));
    leftCol.appendChild(authorWrap);
  }

  // Button
  const btn = topGrid.querySelector('a.button');
  if (btn) leftCol.appendChild(btn.cloneNode(true));

  // Right: empty (matches visual layout)
  const secondRow = [leftCol, ''];

  // --- Third row: two images side by side ---
  const imgDivs = imageGrid.querySelectorAll(':scope > .utility-aspect-1x1');
  const img1 = imgDivs[0]?.querySelector('img');
  const img2 = imgDivs[1]?.querySelector('img');
  const thirdRow = [img1 ? img1.cloneNode(true) : '', img2 ? img2.cloneNode(true) : ''];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    secondRow,
    thirdRow,
  ], document);

  // Replace the original section with the new table
  element.replaceWith(table);
}
