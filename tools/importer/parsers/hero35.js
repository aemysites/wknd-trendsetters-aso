/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get direct children divs for main content
  const mainContainer = element.querySelector(':scope > div.container');
  let grid;
  if (mainContainer) {
    grid = mainContainer.querySelector(':scope > div');
  }
  // Defensive: fallback to first div if structure changes
  if (!grid) {
    grid = element.querySelector(':scope > div');
  }
  // Get grid children (content and CTA)
  let gridChildren = [];
  if (grid) {
    gridChildren = Array.from(grid.children);
  }

  // Find heading/subheading container
  let headingBlock = null;
  let cta = null;
  gridChildren.forEach((child) => {
    // Heuristic: If contains h2, it's heading block
    if (child.querySelector('h1, h2, h3, h4, h5, h6')) {
      headingBlock = child;
    } else if (child.tagName === 'A' || child.querySelector('a')) {
      cta = child;
    }
  });

  // Compose content cell for row 3
  const contentCell = [];
  if (headingBlock) {
    // Grab heading
    const heading = headingBlock.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) contentCell.push(heading);
    // Grab subheading/paragraph
    const subheading = headingBlock.querySelector('p, .subheading');
    if (subheading) contentCell.push(subheading);
  }
  if (cta) {
    // Use the CTA link directly
    contentCell.push(cta);
  }

  // Table rows
  const headerRow = ['Hero (hero35)'];
  // No image in source, so row 2 is empty
  const imageRow = [''];
  // Row 3: content
  const contentRow = [contentCell];

  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
