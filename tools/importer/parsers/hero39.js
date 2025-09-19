/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main grid layout
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get the two main columns: image and content
  const gridChildren = grid.children;
  if (gridChildren.length < 2) return;

  // --- Background Image (row 2) ---
  let imageCell = '';
  const imageContainer = gridChildren[0];
  const img = imageContainer.querySelector('img');
  if (img) {
    // Reference the existing image element
    imageCell = img;
  }

  // --- Content (row 3) ---
  let contentCell = '';
  const contentContainer = gridChildren[1];
  // Find heading (h1), paragraph, and CTA (a)
  const h1 = contentContainer.querySelector('h1');
  const paragraph = contentContainer.querySelector('p');
  const cta = contentContainer.querySelector('a');
  // Compose content in order, preserving semantic structure
  const contentEls = [];
  if (h1) contentEls.push(h1);
  if (paragraph) contentEls.push(paragraph);
  if (cta) contentEls.push(cta);
  if (contentEls.length) {
    contentCell = contentEls;
  }

  // --- Table Construction ---
  const headerRow = ['Hero (hero39)'];
  const rows = [
    headerRow,
    [imageCell],
    [contentCell],
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
