/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid-layout (3-column) container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (should be 4: name, tags, heading, rich-text)
  const gridChildren = Array.from(grid.children);

  // Defensive: expect at least 4 children for this layout
  if (gridChildren.length < 4) return;

  // Assign elements for clarity
  const nameEl = gridChildren[0]; // Taylor Brooks
  const tagsEl = gridChildren[1]; // tags block
  const headingEl = gridChildren[2]; // h2 heading
  const descEl = gridChildren[3]; // rich text description

  // Column 1: name and tags
  const col1 = document.createElement('div');
  col1.appendChild(nameEl);
  col1.appendChild(tagsEl);

  // Column 2: heading and description
  const col2 = document.createElement('div');
  col2.appendChild(headingEl);
  col2.appendChild(descEl);

  // Construct table rows
  const headerRow = ['Columns (columns30)'];
  const contentRow = [col1, col2];

  // Build the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
