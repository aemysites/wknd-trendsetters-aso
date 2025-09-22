/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // 1. Header row
  const headerRow = ['Hero (hero3)'];

  // 2. Background image row (optional)
  let imgEl = element.querySelector('img.cover-image');
  if (!imgEl) imgEl = element.querySelector('img');
  const bgImageRow = [imgEl ? imgEl : ''];

  // 3. Content row: Title, Subheading, CTA
  let cardEl = element.querySelector('.card');
  let contentArr = [];
  if (cardEl) {
    const h1 = cardEl.querySelector('h1');
    if (h1) contentArr.push(h1);
    const subheading = cardEl.querySelector('p');
    if (subheading) contentArr.push(subheading);
    const buttonGroup = cardEl.querySelector('.button-group');
    if (buttonGroup) {
      const links = Array.from(buttonGroup.querySelectorAll('a'));
      if (links.length) contentArr.push(...links);
    }
  }
  const contentRow = [contentArr.length ? contentArr : ''];

  const cells = [headerRow, bgImageRow, contentRow];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
