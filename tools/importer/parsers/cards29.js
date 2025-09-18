/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block table
  const headerRow = ['Cards (cards29)'];

  // Get all immediate children (each card wrapper)
  const cardDivs = element.querySelectorAll(':scope > div');

  // Prepare rows for each card
  const rows = [];

  cardDivs.forEach((cardDiv) => {
    // Find the image inside this card
    const img = cardDiv.querySelector('img');
    if (!img) return; // skip if no image
    // The provided HTML contains only images, no text content, so do not add unnecessary empty columns
    rows.push([img]);
  });

  // Compose the table data
  const cells = [headerRow, ...rows];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
