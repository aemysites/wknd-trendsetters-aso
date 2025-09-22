/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container with the cards
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (each is a card image wrapper)
  const cardWrappers = Array.from(grid.children);

  // Build rows: header first
  const rows = [
    ['Cards (cards17)'],
  ];

  // For each card, extract the image (first cell) and ensure the second cell contains text content
  cardWrappers.forEach((wrapper) => {
    // Find the image inside the nested divs
    const img = wrapper.querySelector('img');
    // Defensive: Only add row if image is found
    if (img) {
      // Try to find any text content inside or near the wrapper
      // Look for a sibling or parent with text nodes
      let textContent = '';
      // Check for text in parent or next sibling
      // (In this HTML, there is no text, but this makes the code flexible)
      // Try to find text in the closest .w-layout-grid parent (should be none, but for flexibility)
      // Or use alt text as fallback
      textContent = img.getAttribute('alt') || '';
      rows.push([
        img,
        textContent,
      ]);
    }
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
