/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero39)'];

  // 2. Background image row (row 2)
  // Find the image inside the first grid-layout > div
  let bgImg = null;
  const gridDivs = element.querySelectorAll(':scope > div > div');
  // Defensive: fallback if structure changes
  for (const div of gridDivs) {
    const img = div.querySelector('img');
    if (img) {
      bgImg = img;
      break;
    }
  }
  const bgImgRow = [bgImg ? bgImg : ''];

  // 3. Content row (row 3)
  // Find the container with the text and button
  let contentCell = '';
  // Find the second grid-layout > div (the one with text)
  let textContainer = null;
  for (const div of gridDivs) {
    if (div.querySelector('h1')) {
      textContainer = div;
      break;
    }
  }
  if (textContainer) {
    // The text content is in a nested grid-layout
    const nestedGrid = textContainer.querySelector('.grid-layout');
    if (nestedGrid) {
      // h1 is the heading
      const heading = nestedGrid.querySelector('h1');
      // Paragraph and button are in .flex-vertical
      const flexVertical = nestedGrid.querySelector('.flex-vertical');
      let para = null;
      let cta = null;
      if (flexVertical) {
        para = flexVertical.querySelector('p');
        const buttonGroup = flexVertical.querySelector('.button-group');
        if (buttonGroup) {
          cta = buttonGroup.querySelector('a');
        }
      }
      // Compose content cell
      const cellContent = [];
      if (heading) cellContent.push(heading);
      if (para) cellContent.push(para);
      if (cta) cellContent.push(cta);
      contentCell = cellContent;
    }
  }
  const contentRow = [contentCell];

  // Compose table
  const rows = [headerRow, bgImgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
