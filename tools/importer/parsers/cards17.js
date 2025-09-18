/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as specified
  const headerRow = ['Cards (cards17)'];
  const rows = [headerRow];

  // Get all direct child divs (each is a card wrapper)
  const cardDivs = element.querySelectorAll(':scope > div');
  cardDivs.forEach((cardDiv) => {
    // Each cardDiv should contain an image
    const img = cardDiv.querySelector('img');
    if (!img) return; // Defensive: skip if no image

    // Always produce two columns per row: image, and text (even if empty)
    rows.push([img, '']);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
