/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get direct children of a node by tag name
  function getDirectChildrenByTag(parent, tag) {
    return Array.from(parent.children).filter(child => child.tagName.toLowerCase() === tag.toLowerCase());
  }

  // Find the main grid layout (the two-column hero)
  const container = element.querySelector('.container');
  let grid = null;
  if (container) {
    grid = container.querySelector('.grid-layout');
  }

  // Defensive: fallback if not found
  if (!grid) {
    grid = element.querySelector('.grid-layout');
  }

  // Get the two main columns (left: text/buttons, right: image)
  let leftCol = null;
  let rightCol = null;
  if (grid) {
    // Find the first non-img child as left, and the first img child as right
    const gridChildren = Array.from(grid.children);
    leftCol = gridChildren.find(child => child.tagName.toLowerCase() !== 'img');
    rightCol = gridChildren.find(child => child.tagName.toLowerCase() === 'img');
  }

  // Defensive fallback: if not found, use first/second child
  if (!leftCol && grid && grid.children.length > 0) {
    leftCol = grid.children[0];
  }
  if (!rightCol && grid && grid.children.length > 1) {
    rightCol = grid.children[1];
  }

  // Compose left column: heading, subheading, buttons
  let leftContent = [];
  if (leftCol) {
    // Get heading
    const heading = leftCol.querySelector('h1');
    if (heading) leftContent.push(heading);
    // Get subheading
    const subheading = leftCol.querySelector('p');
    if (subheading) leftContent.push(subheading);
    // Get button group
    const buttonGroup = leftCol.querySelector('.button-group');
    if (buttonGroup) leftContent.push(buttonGroup);
  }

  // Compose right column: image
  let rightContent = [];
  if (rightCol) {
    rightContent.push(rightCol);
  }

  // Compose nav bar (bottom row)
  const nav = element.querySelector('.nav.secondary-nav');
  let navContent = [];
  if (nav) {
    navContent.push(nav);
  }

  // Compose subscribe button (bottom right)
  let subscribeContent = [];
  if (nav) {
    const navRight = nav.querySelector('.nav-right');
    if (navRight) {
      subscribeContent.push(navRight);
    }
  }

  // Table structure:
  // Header row: block name
  // Second row: left column (text/buttons), right column (image)
  // Third row: nav bar (left), subscribe button (right)
  const headerRow = ['Columns (columns15)'];
  const secondRow = [leftContent, rightContent];
  const thirdRow = [navContent, subscribeContent];

  const cells = [headerRow, secondRow, thirdRow];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
