/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero39)'];

  // 2. Background image row
  // Find the image inside the first grid-layout > div
  let bgImg = null;
  const gridDivs = element.querySelectorAll(':scope > div > div');
  if (gridDivs.length > 0) {
    // The first gridDiv contains the background image
    bgImg = gridDivs[0].querySelector('img');
  }
  const bgImgRow = [bgImg ? bgImg : ''];

  // 3. Content row: heading, subheading, CTA
  // The second gridDiv contains the text and CTA
  let contentCell = [];
  if (gridDivs.length > 1) {
    const contentGrid = gridDivs[1].querySelector('.grid-layout');
    if (contentGrid) {
      // Heading
      const heading = contentGrid.querySelector('h1');
      if (heading) contentCell.push(heading);
      // Subheading (paragraph)
      const subheading = contentGrid.querySelector('p');
      if (subheading) contentCell.push(subheading);
      // CTA (button group with link)
      const ctaGroup = contentGrid.querySelector('.button-group');
      if (ctaGroup) {
        // Only include the link(s), not the container div
        const ctaLinks = Array.from(ctaGroup.querySelectorAll('a'));
        if (ctaLinks.length > 0) contentCell = contentCell.concat(ctaLinks);
      }
    }
  }
  const contentRow = [contentCell.length > 0 ? contentCell : ''];

  // Assemble the table
  const cells = [
    headerRow,
    bgImgRow,
    contentRow,
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
