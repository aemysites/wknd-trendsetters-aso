/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get direct children by tag name
  function getDirectChildByTag(parent, tagName) {
    return Array.from(parent.children).find((el) => el.tagName === tagName.toUpperCase());
  }

  // 1. Header row
  const headerRow = ['Hero (hero35)'];

  // 2. Background image row (none in this example)
  const bgImageRow = [''];

  // 3. Content row: Title, Subheading, CTA
  // Find grid-layout
  const grid = element.querySelector('.grid-layout');
  let contentCell = document.createElement('div');
  if (grid) {
    // Get all direct children of the grid
    const gridChildren = Array.from(grid.children);
    // The first child contains heading and subheading
    const textBlock = gridChildren.find((child) => child.querySelector('h1,h2,h3,h4,h5,h6'));
    // The second child is likely the CTA button
    const ctaBlock = gridChildren.find((child) => child.tagName === 'A');

    // Compose content
    if (textBlock) {
      // Move heading and subheading into contentCell
      Array.from(textBlock.children).forEach((child) => {
        contentCell.appendChild(child);
      });
    }
    if (ctaBlock) {
      // Add a space between text and button if both exist
      if (contentCell.childNodes.length) {
        contentCell.appendChild(document.createTextNode(' '));
      }
      contentCell.appendChild(ctaBlock);
    }
  }
  const contentRow = [contentCell];

  // Assemble table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgImageRow,
    contentRow,
  ], document);

  // Replace original element
  element.replaceWith(table);
}
