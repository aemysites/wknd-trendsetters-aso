/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row
  const headerRow = ['Hero (hero39)'];

  // 2. Background image row (single cell)
  // Find the image inside the first grid cell
  let backgroundImg = null;
  const gridDivs = element.querySelectorAll(':scope > div > div');
  if (gridDivs.length > 0) {
    // The first grid cell contains the background image
    backgroundImg = gridDivs[0].querySelector('img');
  }

  // 3. Content row (single cell)
  // Find the heading, subheading/paragraph, and CTA button
  let contentCell = [];
  if (gridDivs.length > 1) {
    // The second grid cell contains the text and CTA
    const contentGrid = gridDivs[1].querySelector('.w-layout-grid');
    if (contentGrid) {
      // Heading (h1)
      const heading = contentGrid.querySelector('h1');
      if (heading) contentCell.push(heading);
      // Paragraph and button group
      const flexVertical = contentGrid.querySelector('.flex-vertical');
      if (flexVertical) {
        // Paragraph (subheading)
        const paragraph = flexVertical.querySelector('p');
        if (paragraph) contentCell.push(paragraph);
        // CTA (button)
        const buttonGroup = flexVertical.querySelector('.button-group');
        if (buttonGroup) {
          // Only include the button(s) (usually <a>)
          const cta = buttonGroup.querySelector('a');
          if (cta) contentCell.push(cta);
        }
      }
    }
  }

  // Compose the table rows
  const rows = [
    headerRow,
    [backgroundImg ? backgroundImg : ''],
    [contentCell.length ? contentCell : ''],
  ];

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
