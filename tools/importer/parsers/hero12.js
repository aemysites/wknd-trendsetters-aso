/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero12)'];

  // 2. Background image row: first grid cell's image
  let bgImg = '';
  const grid = element.querySelector('.w-layout-grid');
  if (grid && grid.children[0]) {
    const firstImg = grid.children[0].querySelector('img');
    if (firstImg) bgImg = firstImg;
  }
  const bgImgRow = [bgImg];

  // 3. Content row: headline, subheading, CTA only (no image)
  let contentCell = '';
  if (grid && grid.children[1]) {
    const cardBody = grid.children[1].querySelector('.card-body');
    if (cardBody) {
      // Find the headline
      const headline = cardBody.querySelector('h2');
      // Find all subheading paragraphs (exclude button and dividers)
      const subheadings = Array.from(cardBody.querySelectorAll('p'));
      // Find the CTA button
      const cta = cardBody.querySelector('.button-group');
      // Compose content cell
      const frag = document.createDocumentFragment();
      if (headline) frag.appendChild(headline.cloneNode(true));
      subheadings.forEach(p => frag.appendChild(p.cloneNode(true)));
      if (cta) frag.appendChild(cta.cloneNode(true));
      contentCell = frag;
    }
  }
  const contentRow = [contentCell];

  // Compose the table
  const cells = [headerRow, bgImgRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
