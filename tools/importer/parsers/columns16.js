/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to collect children as array
  const getChildren = (el, selector) => Array.from(el.querySelectorAll(selector));

  // 1. Header row
  const headerRow = ['Columns (columns16)'];

  // 2. Find the main grid (headline/eyebrow left, description/author/button right)
  const container = element.querySelector('.container');
  const mainGrid = container.querySelector('.grid-layout.tablet-1-column');
  const leftCol = mainGrid.children[0];
  const rightCol = mainGrid.children[1];

  // Left column: Eyebrow + Headline
  const leftColContent = [];
  const eyebrow = leftCol.querySelector('.eyebrow');
  if (eyebrow) leftColContent.push(eyebrow);
  const headline = leftCol.querySelector('h1');
  if (headline) leftColContent.push(headline);

  // Right column: Description, Author, Button
  const rightColContent = [];
  const desc = rightCol.querySelector('.rich-text');
  if (desc) rightColContent.push(desc);
  const authorBlock = rightCol.querySelector('.flex-horizontal.y-center.flex-gap-xs');
  if (authorBlock) rightColContent.push(authorBlock);
  const btn = rightCol.querySelector('a.button');
  if (btn) rightColContent.push(btn);

  // 3. Find the image grid (bottom half)
  const imageGrid = element.querySelector('.grid-layout.mobile-portrait-1-column');
  const images = [];
  if (imageGrid) {
    getChildren(imageGrid, '.utility-aspect-1x1').forEach(div => {
      const img = div.querySelector('img');
      if (img) images.push(img);
    });
  }

  // 4. Compose table rows
  // First content row: left (headline/eyebrow), right (desc/author/button)
  const firstContentRow = [leftColContent, rightColContent];
  // Second content row: images side by side
  const secondContentRow = images;

  // 5. Build table
  const cells = [
    headerRow,
    firstContentRow,
    secondContentRow,
  ];

  // 6. Replace element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
