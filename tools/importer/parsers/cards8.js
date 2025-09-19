/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards8) block: 2 columns, multiple rows
  // Each card: [image, text]

  // Header row must be exactly one column
  const headerRow = ['Cards (cards8)'];

  // Get all immediate children (each is a card wrapper)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each card, extract the image (first cell) and any text content (second cell)
  const rows = cardDivs.map(cardDiv => {
    const img = cardDiv.querySelector('img');
    // Collect all text content inside cardDiv except the image
    let textContent = '';
    // Remove the image from cardDiv clone, then get textContent
    const clone = cardDiv.cloneNode(true);
    const imgInClone = clone.querySelector('img');
    if (imgInClone) imgInClone.remove();
    textContent = clone.textContent.trim();
    // If no textContent, fallback to alt
    if (!textContent && img && img.alt) {
      textContent = img.alt.trim();
    }
    // If still no text, use a non-empty string to avoid empty cell
    if (!textContent) {
      textContent = '[No description]';
    }
    return img ? [img, textContent] : null;
  }).filter(Boolean);

  // Compose the table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Fix header row to span two columns
  const table = block;
  const header = table.querySelector('tr:first-child th');
  if (header) {
    header.setAttribute('colspan', '2');
  }

  // Replace the original element with the block
  element.replaceWith(table);
}
