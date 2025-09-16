/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero12)'];

  // 2. Background image row
  let bgImg = '';
  const gridDivs = element.querySelectorAll(':scope > div');
  if (gridDivs.length > 0) {
    const img = gridDivs[0].querySelector('img.cover-image');
    if (img) bgImg = img;
  }
  const bgImgRow = [bgImg];

  // 3. Content row: Title, subheading, CTA
  let contentCell = '';
  if (gridDivs.length > 1) {
    const cardBody = gridDivs[1].querySelector('.card-body');
    if (cardBody) {
      const grid = cardBody.querySelector('.grid-layout');
      if (grid) {
        // Find the text content column (skip the image)
        const children = Array.from(grid.children);
        let textCol = null;
        for (const child of children) {
          if (child.tagName !== 'IMG') {
            textCol = child;
            break;
          }
        }
        if (textCol) {
          // Instead of only textCol, collect all its visible text and elements
          const parts = [];
          // Heading
          const heading = textCol.querySelector('h2');
          if (heading) parts.push(heading);
          // List items (each flex-horizontal with icon and text)
          const flexVert = textCol.querySelector('.flex-vertical');
          if (flexVert) {
            const rows = flexVert.querySelectorAll('.flex-horizontal');
            rows.forEach(row => {
              // Get the text paragraph
              const p = row.querySelector('p');
              if (p) parts.push(p);
            });
          }
          // CTA button
          const buttonGroup = textCol.querySelector('.button-group');
          if (buttonGroup) {
            const btn = buttonGroup.querySelector('a');
            if (btn) parts.push(btn);
          }
          // Compose cell
          if (parts.length) {
            contentCell = parts;
          } else {
            contentCell = '';
          }
        }
      }
    }
  }

  // Only add the content row if there is actual content
  const cells = [
    headerRow,
    bgImgRow
  ];
  if (Array.isArray(contentCell) ? contentCell.length > 0 : contentCell) {
    cells.push([contentCell]);
  }

  // If content row is missing, add an empty row to ensure 3 rows
  if (cells.length < 3) {
    cells.push(['']);
  }

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
