/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate children by selector
  const getDirectChild = (parent, selector) => {
    return Array.from(parent.children).find((el) => el.matches(selector));
  };

  // Header row as per block guidelines
  const headerRow = ['Hero (hero39)'];

  // --- Row 2: Background Image (optional) ---
  // The image is inside the first grid cell
  let bgImgCell = '';
  const gridDivs = element.querySelectorAll(':scope > .w-layout-grid > div');
  if (gridDivs.length > 0) {
    const img = gridDivs[0].querySelector('img');
    if (img) {
      bgImgCell = img;
    }
  }

  // --- Row 3: Content (heading, subheading, CTA) ---
  // The second grid cell contains the text content
  let contentCell = '';
  if (gridDivs.length > 1) {
    // The container with text content
    const contentContainer = gridDivs[1];
    // Find the inner grid (holds heading and subcontent)
    const innerGrid = contentContainer.querySelector('.w-layout-grid');
    if (innerGrid) {
      // Heading
      const heading = innerGrid.querySelector('h1');
      // Subheading (paragraph)
      const paragraph = innerGrid.querySelector('p');
      // CTA (button link)
      const cta = innerGrid.querySelector('a');
      // Compose content cell
      const contentParts = [];
      if (heading) contentParts.push(heading);
      if (paragraph) contentParts.push(paragraph);
      if (cta) contentParts.push(cta);
      contentCell = contentParts;
    }
  }

  // Compose table rows
  const rows = [
    headerRow,
    [bgImgCell],
    [contentCell],
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
