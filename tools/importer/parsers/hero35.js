/* global WebImporter */
export default function parse(element, { document }) {
  // Table structure: 1 col x 3 rows
  // Row 1: Header
  // Row 2: Background image (none in this source)
  // Row 3: Heading, subheading, CTA

  // Header row as required
  const headerRow = ['Hero (hero35)'];

  // Row 2: Background image (none in this source)
  const bgImageRow = [''];

  // Row 3: Content (heading, subheading, CTA)
  // Find the grid container
  const grid = element.querySelector('.w-layout-grid');
  let contentCell = [];
  if (grid) {
    // Get all direct children of the grid
    const gridChildren = Array.from(grid.children);
    // The first child: heading + subheading
    const headingBlock = gridChildren.find(child => child.querySelector('h1, h2, h3, h4, h5, h6'));
    // The second child: CTA (button link)
    const ctaBlock = gridChildren.find(child => child.tagName === 'A' || child.querySelector('a'));

    // Compose content cell
    contentCell = [];
    if (headingBlock) {
      // Use heading and subheading as-is
      Array.from(headingBlock.childNodes).forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          contentCell.push(node);
        }
      });
    }
    if (ctaBlock) {
      // Add a line break if there is heading content
      if (contentCell.length > 0) {
        contentCell.push(document.createElement('br'));
      }
      contentCell.push(ctaBlock);
    }
    if (contentCell.length === 0) {
      contentCell = [''];
    }
  } else {
    contentCell = [''];
  }

  const contentRow = [contentCell];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgImageRow,
    contentRow,
  ], document);

  // Replace original element
  element.replaceWith(table);
}
