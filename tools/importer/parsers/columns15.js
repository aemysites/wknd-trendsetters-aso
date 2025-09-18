/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only parse if the element contains the expected grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the two main columns in the grid
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: headline, subheading, buttons
  const firstCol = columns[0];
  // Second column: image (cover-image)
  const secondCol = columns[1];

  // Compose left column content
  const leftContent = document.createElement('div');
  // Headline
  const headline = firstCol.querySelector('.h1-heading');
  if (headline) leftContent.appendChild(headline.cloneNode(true));
  // Subheading
  const subheading = firstCol.querySelector('.subheading');
  if (subheading) leftContent.appendChild(subheading.cloneNode(true));
  // Button group
  const buttonGroup = firstCol.querySelector('.button-group');
  if (buttonGroup) leftContent.appendChild(buttonGroup.cloneNode(true));

  // Compose right column content
  const rightContent = document.createElement('div');
  // Image
  const coverImage = secondCol.tagName === 'IMG' ? secondCol : secondCol.querySelector('img.cover-image');
  if (coverImage) rightContent.appendChild(coverImage.cloneNode(true));

  // Table header
  const headerRow = ['Columns (columns15)'];
  // Table content row: two columns side by side
  const contentRow = [leftContent, rightContent];

  // Create table block
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
