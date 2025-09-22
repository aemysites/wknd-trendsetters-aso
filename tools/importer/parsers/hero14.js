/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container
  const gridDiv = element.querySelector('.w-layout-grid');

  // Find the background image (img inside .ix-parallax-scale-out-hero)
  let bgImg = null;
  if (gridDiv) {
    const bgDiv = gridDiv.querySelector('.ix-parallax-scale-out-hero');
    if (bgDiv) {
      const img = bgDiv.querySelector('img');
      if (img) {
        bgImg = img;
      }
    }
  }

  // Find the heading (h1 inside .container)
  let heading = null;
  if (gridDiv) {
    const containerDiv = gridDiv.querySelector('.container');
    if (containerDiv) {
      heading = containerDiv.querySelector('h1');
    }
  }

  // Compose the table rows
  const headerRow = ['Hero (hero14)'];
  const bgImgRow = [bgImg ? bgImg : ''];
  const contentRow = [heading ? heading : ''];

  const cells = [headerRow, bgImgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
