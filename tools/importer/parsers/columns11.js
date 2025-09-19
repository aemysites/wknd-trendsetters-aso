/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container (direct child of section)
  const grid = element.querySelector(':scope > .w-layout-grid');
  if (!grid) return;

  // The grid contains two children: left (content), right (image)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column: content
  const leftCol = columns[0];
  // Right column: image
  const rightCol = columns[1];

  // Extract left column content: heading, paragraph, buttons
  const contentBlock = leftCol.querySelector(':scope > .section');
  let leftContent = [];
  if (contentBlock) {
    // Heading
    const heading = contentBlock.querySelector('h2');
    if (heading) leftContent.push(heading);
    // Paragraph (rich-text)
    const paragraph = contentBlock.querySelector('.rich-text, p');
    if (paragraph) leftContent.push(paragraph);
    // Button group
    const buttonGroup = contentBlock.querySelector('.button-group');
    if (buttonGroup) leftContent.push(buttonGroup);
  } else {
    // Fallback: use all children
    leftContent = Array.from(leftCol.children);
  }

  // Right column: image (reference the actual element, do not clone)
  let rightContent = [];
  const img = rightCol.tagName === 'IMG' ? rightCol : rightCol.querySelector('img');
  if (img) rightContent.push(img);

  // Compose the table: header row, then content row
  const headerRow = ['Columns (columns11)'];
  const columnsRow = [leftContent, rightContent];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  element.replaceWith(table);
}
