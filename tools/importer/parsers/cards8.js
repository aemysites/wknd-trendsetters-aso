/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row: single column as required
  const headerRow = ['Cards (cards8)'];

  // Get all immediate child divs (each is a card wrapper)
  const cardDivs = element.querySelectorAll(':scope > div');

  // For each card, extract the image (first child)
  // Use the alt attribute as the text content for the second cell
  const rows = Array.from(cardDivs).map((cardDiv) => {
    const img = cardDiv.querySelector('img');
    let textContent = '';
    if (img) {
      textContent = img.getAttribute('alt') || '';
    }
    return [img, textContent];
  });

  // Compose the table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
