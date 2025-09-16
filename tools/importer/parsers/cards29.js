/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards29)'];

  // Get all immediate children (each card wrapper)
  const cardDivs = element.querySelectorAll(':scope > div');

  // Prepare rows for each card
  const rows = [];
  cardDivs.forEach((cardDiv) => {
    // Defensive: look for the image inside this card
    const img = cardDiv.querySelector('img');
    // Always produce two columns per row (image, text)
    if (img) {
      // For this HTML, there is no text content, so second cell is empty
      rows.push([img, '']);
    }
  });

  // Compose the table data
  const cells = [headerRow, ...rows];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
