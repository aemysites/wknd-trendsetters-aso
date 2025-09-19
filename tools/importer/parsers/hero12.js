/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the correct header row
  const headerRow = ['Hero (hero12)'];

  // Row 2: Background image (optional)
  let bgImgCell = '';
  const mainDivs = element.querySelectorAll(':scope > div');
  if (mainDivs.length > 0) {
    const bgImg = mainDivs[0].querySelector('img');
    if (bgImg) bgImgCell = bgImg;
  }

  // Row 3: Title, subheading, CTA (all content from right column)
  let contentCell = null;
  if (mainDivs.length > 1) {
    const card = mainDivs[1].querySelector('.card');
    if (card) {
      const cardBody = card.querySelector('.card-body');
      if (cardBody) {
        const grid = cardBody.querySelector('.grid-layout');
        if (grid && grid.children.length === 2) {
          const rightCol = grid.children[1];
          // Collect all content blocks from rightCol
          const contentParts = [];
          // Headline
          const h2 = rightCol.querySelector('h2');
          if (h2) contentParts.push(h2);
          // Subheadings/paragraphs and all text content
          const flexVertical = rightCol.querySelector('.flex-vertical');
          if (flexVertical) {
            flexVertical.querySelectorAll('p').forEach(p => {
              contentParts.push(p);
            });
          }
          // CTA button
          const buttonGroup = rightCol.querySelector('.button-group');
          if (buttonGroup) {
            const button = buttonGroup.querySelector('a');
            if (button) contentParts.push(button);
          }
          // Ensure all text content is included
          if (contentParts.length) {
            contentCell = contentParts;
          }
        }
      }
    }
  }

  // Compose table rows (always 3 rows, but omit the third if no content)
  const rows = [headerRow, [bgImgCell]];
  if (contentCell) {
    rows.push([contentCell]);
  }

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
