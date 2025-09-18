/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main grid containing the columns
  const mainGrid = element.querySelector('.grid-layout');
  if (!mainGrid) return;

  // Find the heading and paragraph (first two children)
  const heading = mainGrid.children[0]; // h2-heading
  const paragraph = mainGrid.children[1]; // paragraph-lg

  // Find the inner grid that contains divider, avatar+name, and logo
  const innerGrid = mainGrid.children[2];
  if (!innerGrid) return;

  // Get all direct children of the inner grid
  const innerChildren = Array.from(innerGrid.children);

  // divider
  const divider = innerChildren[0];
  // flex-horizontal: avatar + name/title
  const avatarRow = innerChildren[1];
  // logo svg
  const logo = innerChildren[2];

  // --- Build columns ---
  // Column 1: Heading, avatar+name/title
  const col1 = document.createElement('div');
  col1.appendChild(heading);
  col1.appendChild(avatarRow);

  // Column 2: Paragraph, divider, logo
  const col2 = document.createElement('div');
  col2.appendChild(paragraph);
  col2.appendChild(divider);
  col2.appendChild(logo);

  // Table header
  const headerRow = ['Columns (columns26)'];
  // Table columns row
  const columnsRow = [col1, col2];

  // Build table
  const cells = [headerRow, columnsRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
