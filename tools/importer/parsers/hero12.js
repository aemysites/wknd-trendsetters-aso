/* global WebImporter */
export default function parse(element, { document }) {
  // Get direct children divs
  const topDivs = element.querySelectorAll(':scope > div');

  // Row 2: Background image (optional)
  let bgImg = null;
  if (topDivs.length > 0) {
    bgImg = topDivs[0].querySelector('img');
  }

  // Row 3: Title, subheading, CTA (all optional)
  let contentCell = [];
  if (topDivs.length > 1) {
    const cardBody = topDivs[1].querySelector('.card-body');
    if (cardBody) {
      const grid = cardBody.querySelector('.grid-layout');
      if (grid) {
        const gridChildren = Array.from(grid.children);
        // Collect all text content from the right side (including headings, paragraphs, and buttons)
        if (gridChildren.length > 1) {
          const right = gridChildren[1];
          // Heading
          const heading = right.querySelector('h2');
          if (heading) contentCell.push(heading);
          // All paragraphs (including those in features)
          const paragraphs = right.querySelectorAll('p');
          paragraphs.forEach(p => contentCell.push(p));
          // CTA button
          const button = right.querySelector('a');
          if (button) contentCell.push(button);
        }
      }
    }
  }

  // Fallback: If contentCell is empty, try to get all text content from the section
  if (contentCell.length === 0) {
    const allText = element.textContent.trim();
    if (allText) contentCell.push(document.createTextNode(allText));
  }

  const headerRow = ['Hero (hero12)'];
  const bgRow = [bgImg ? bgImg : ''];
  const contentRow = [contentCell.length ? contentCell : ''];
  const cells = [headerRow, bgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
