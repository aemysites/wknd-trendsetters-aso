/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Ensure the element is present
  if (!element) return;

  // Header row for the block table
  const headerRow = ['Columns (columns36)'];

  // Get the main grid container (holds two columns)
  const grid = element.querySelector('.grid-layout.tablet-1-column');
  if (!grid) return;

  // Get the two main columns (content and images)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // --- First column: Text content ---
  const textCol = columns[0];
  // We'll include all content in this cell: heading, paragraph, buttons
  // Defensive: Only include if present
  const textContent = [];
  const heading = textCol.querySelector('h1');
  if (heading) textContent.push(heading);
  const subheading = textCol.querySelector('p');
  if (subheading) textContent.push(subheading);
  const buttonGroup = textCol.querySelector('.button-group');
  if (buttonGroup) textContent.push(buttonGroup);

  // --- Second column: Images ---
  const imagesCol = columns[1];
  // Find all images inside the nested grid
  const imageGrid = imagesCol.querySelector('.grid-layout.mobile-portrait-1-column');
  let images = [];
  if (imageGrid) {
    images = Array.from(imageGrid.querySelectorAll('img'));
  }

  // Only include images that are not the blurred face (by alt text)
  // We'll filter out any img with alt containing 'blurred face' (if present)
  images = images.filter(img => !/blurred face/i.test(img.alt));

  // --- Build the second row: columns ---
  // First cell: text content; Second cell: all images
  const secondRow = [
    textContent,
    images
  ];

  // Build the table
  const cells = [headerRow, secondRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
