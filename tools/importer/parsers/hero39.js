/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main grid container
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Find the two main grid children: left (image) and right (content)
  const gridChildren = grid.querySelectorAll(':scope > div');
  if (gridChildren.length < 2) return;

  // --- Row 1: Block Name ---
  const headerRow = ['Hero (hero39)'];

  // --- Row 2: Background Image ---
  // The image is inside the first grid child
  const imageContainer = gridChildren[0];
  const img = imageContainer.querySelector('img');
  const imageRow = [img ? img : ''];

  // --- Row 3: Content (Heading, Paragraph, CTA) ---
  // The content is inside the second grid child
  const contentContainer = gridChildren[1];
  // Defensive: Find the inner grid (sometimes used for layout)
  let innerGrid = contentContainer.querySelector('.w-layout-grid');
  if (!innerGrid) innerGrid = contentContainer;

  // Heading
  const heading = innerGrid.querySelector('h1');
  // Paragraph
  const paragraph = innerGrid.querySelector('p');
  // CTA (button or link)
  let cta = innerGrid.querySelector('.button-group a, .button-group button');

  // Compose content cell
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (paragraph) contentCell.push(paragraph);
  if (cta) contentCell.push(cta);
  const contentRow = [contentCell];

  // Compose table
  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
