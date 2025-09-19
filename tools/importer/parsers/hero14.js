/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // --- Extract background image ---
  let bgImg = null;
  if (gridChildren.length > 0) {
    const imgWrap = gridChildren[0];
    const img = imgWrap.querySelector('img');
    if (img) {
      // Reference the existing image element
      bgImg = img;
    }
  }

  // --- Extract content (heading, etc.) ---
  let contentCell = document.createElement('div');
  if (gridChildren.length > 1) {
    const contentWrap = gridChildren[1];
    const headingContainer = contentWrap.querySelector('.utility-margin-bottom-6rem');
    if (headingContainer) {
      // Find the main heading
      const heading = headingContainer.querySelector('h1');
      if (heading) {
        contentCell.appendChild(heading);
      }
      // Find subheading, paragraph, CTA (none present in this HTML, but structure for future)
      // Find button group (if any)
      const buttonGroup = headingContainer.querySelector('.button-group');
      if (buttonGroup && buttonGroup.childNodes.length) {
        contentCell.appendChild(buttonGroup);
      }
    }
  }
  // If nothing was appended, leave cell empty
  if (!contentCell.hasChildNodes()) contentCell = '';

  // --- Build table rows ---
  const headerRow = ['Hero (hero14)'];
  const imageRow = [bgImg ? bgImg : ''];
  const contentRow = [contentCell];

  const rows = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);

  element.replaceWith(table);
}
