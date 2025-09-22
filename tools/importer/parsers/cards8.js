/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row: must have exactly one column (block name)
  const headerRow = ['Cards (cards8)'];

  // Get all direct child divs (each is a card container with an image)
  const cardDivs = element.querySelectorAll(':scope > div');

  // Each card: [image, text content (alt text in a <p> element)]
  const rows = Array.from(cardDivs).map((cardDiv) => {
    const img = cardDiv.querySelector('img');
    let textCell = '';
    if (img) {
      // Use alt text in a <p> element for the text cell
      const alt = img.getAttribute('alt') || '';
      const p = document.createElement('p');
      p.textContent = alt;
      textCell = p;
      return [img, textCell];
    }
    return null;
  }).filter(Boolean);

  // Compose the table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(block);
}
