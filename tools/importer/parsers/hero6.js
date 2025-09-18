/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the background image (img.cover-image)
  const bgImg = element.querySelector('img.cover-image');

  // 2. Find the card containing heading, subheading, and CTAs
  const card = element.querySelector('.card');

  // 3. Table header row: must match block name exactly
  const headerRow = ['Hero (hero6)'];

  // 4. Second row: background image (reference the actual element, not a string)
  const bgImgRow = [bgImg ? bgImg : ''];

  // 5. Third row: card content (reference the actual element, not clone or string)
  const contentRow = [card ? card : ''];

  // 6. Create table with correct structure
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgImgRow,
    contentRow,
  ], document);

  // 7. Replace the original element with the new table
  element.replaceWith(table);
}
