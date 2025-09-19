/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row: must be exactly one column
  const headerRow = ['Cards (cards8)'];

  // Get all direct child divs (each is a card container)
  const cardDivs = element.querySelectorAll(':scope > div');

  // Prepare card rows
  const rows = Array.from(cardDivs).map((cardDiv) => {
    // Find the image inside the card div
    const img = cardDiv.querySelector('img');
    if (!img) return null;

    // Try to extract all text content from the cardDiv, not just the alt text
    let textContent = '';
    Array.from(cardDiv.childNodes).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        textContent += node.textContent.trim() + ' ';
      } else if (node.nodeType === Node.ELEMENT_NODE && node !== img) {
        textContent += node.textContent.trim() + ' ';
      }
    });
    textContent = textContent.trim();
    if (!textContent) {
      textContent = img.getAttribute('alt') || '';
    }

    // Each card row: [image, text cell]
    return [img, textContent];
  }).filter(Boolean);

  // Compose final table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(blockTable);
}
