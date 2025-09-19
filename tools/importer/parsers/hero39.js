/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout container
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // 1. Extract background image (first grid cell)
  let bgImg = null;
  const gridCells = grid.children;
  if (gridCells.length > 0) {
    const bgImgEl = gridCells[0].querySelector('img');
    if (bgImgEl) bgImg = bgImgEl;
  }

  // 2. Extract content (second grid cell)
  let contentCell = [];
  if (gridCells.length > 1) {
    // Find the inner grid (contains h1, paragraph, button)
    const innerGrid = gridCells[1].querySelector('.grid-layout');
    if (innerGrid) {
      // Heading
      const heading = innerGrid.querySelector('h1');
      if (heading) contentCell.push(heading);
      // Paragraph and CTA
      const flex = innerGrid.querySelector('.flex-vertical');
      if (flex) {
        const para = flex.querySelector('p');
        if (para) contentCell.push(para);
        const btnGroup = flex.querySelector('.button-group');
        if (btnGroup) contentCell.push(btnGroup);
      }
    }
  }

  // Compose rows for the table
  const headerRow = ['Hero (hero39)'];
  const imageRow = [bgImg ? bgImg : ''];
  const contentRow = [contentCell.length ? contentCell : ''];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
