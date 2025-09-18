/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // 2. Identify columns: left (headings), right (contacts), and image
  let leftCol = null;
  let rightCol = null;
  let image = null;
  gridChildren.forEach((child) => {
    if (child.tagName === 'IMG') {
      image = child;
    } else if (child.tagName === 'UL') {
      rightCol = child;
    } else {
      leftCol = child;
    }
  });

  // 3. Extract left column content (preserve all children)
  const leftColContent = [];
  if (leftCol) {
    Array.from(leftCol.childNodes).forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim())) {
        leftColContent.push(node);
      }
    });
  }

  // 4. Extract right column content (the contact list)
  const rightColContent = [];
  if (rightCol) {
    rightColContent.push(rightCol);
  }

  // 5. Compose table rows
  const headerRow = ['Columns (columns18)'];
  const secondRow = [leftColContent, rightColContent];

  // Fix: Only add an image row if there is content for both columns, and do not add unnecessary empty columns
  let rows = [headerRow, secondRow];
  if (image) {
    // Only add image row if both columns have content in the second row
    if (rightColContent.length > 0) {
      rows.push([image, '']);
    } else {
      rows.push([image]);
    }
  }

  // Remove any trailing empty columns in the last row (image row)
  if (rows.length > 2) {
    const lastRow = rows[rows.length - 1];
    while (lastRow.length > 1 && lastRow[lastRow.length - 1] === '') {
      lastRow.pop();
    }
  }

  // 6. Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // 7. Replace the section with the new block
  element.replaceWith(table);
}
