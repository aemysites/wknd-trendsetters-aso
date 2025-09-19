/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required
  const headerRow = ['Hero (hero35)'];

  // --- Row 2: Background image (optional) ---
  // No image found in the provided HTML, so leave cell empty
  const imageRow = [''];

  // --- Row 3: Content (title, subheading, CTA) ---
  // Find the grid container
  const grid = element.querySelector('.grid-layout');
  let contentCell = '';
  if (grid) {
    // Get all direct children of the grid
    const gridChildren = grid.querySelectorAll(':scope > *');
    // The first child contains heading and subheading
    const textBlock = gridChildren[0];
    // The second child is the CTA button
    const ctaBlock = gridChildren[1];
    // Compose content cell
    const cellContent = [];
    if (textBlock) {
      // Heading
      const heading = textBlock.querySelector('h2');
      if (heading) cellContent.push(heading);
      // Subheading
      const subheading = textBlock.querySelector('p');
      if (subheading) cellContent.push(subheading);
    }
    if (ctaBlock) {
      cellContent.push(ctaBlock);
    }
    contentCell = cellContent;
  }

  // Build table rows
  const rows = [
    headerRow,
    imageRow,
    [contentCell]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
