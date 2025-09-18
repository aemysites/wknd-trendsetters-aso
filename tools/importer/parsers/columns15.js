/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout (the two columns)
  const grid = element.querySelector('.grid-layout');
  let leftCol = null;
  let rightCol = null;

  if (grid) {
    // The grid has two children: left column (content), right column (image)
    const gridChildren = Array.from(grid.children);
    // Find the div (content) and the img (image)
    leftCol = gridChildren.find((el) => el.tagName === 'DIV');
    rightCol = gridChildren.find((el) => el.tagName === 'IMG');
  }

  // Compose left column content: include ALL content blocks in the left column div
  let leftColContent = [];
  if (leftCol) {
    // Instead of picking only h1, p, and button-group, include all child nodes
    leftColContent = Array.from(leftCol.childNodes).filter(node => {
      // Filter out empty text nodes
      return !(node.nodeType === Node.TEXT_NODE && !node.textContent.trim());
    });
  }

  // Compose right column content (image)
  let rightColContent = [];
  if (rightCol) rightColContent.push(rightCol);

  // Build table rows
  const headerRow = ['Columns (columns15)'];
  const contentRow = [leftColContent, rightColContent];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace original element
  element.replaceWith(table);
}
