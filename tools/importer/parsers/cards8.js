/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row as specified, exactly one column
  const headerRow = ['Cards (cards8)'];

  // Get all immediate child divs (each is a card container with an image)
  const cardDivs = element.querySelectorAll(':scope > div');

  // Build rows for each card: each row is a two-cell array [image, text]
  const rows = Array.from(cardDivs).map((cardDiv) => {
    // Find the image inside the card div
    const img = cardDiv.querySelector('img');
    if (!img) return null;
    // First cell: image element (cloned)
    const imgCell = img.cloneNode(true);
    // Second cell: extract all text nodes and alt
    let textContent = '';
    cardDiv.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        textContent += node.textContent.trim() + ' ';
      }
    });
    // If no direct text, fallback to alt
    if (!textContent.trim()) {
      textContent = img.getAttribute('alt') || '';
    }
    // Always return a two-cell array
    return [imgCell, textContent.trim()];
  }).filter(Boolean);

  // Compose the cells array: each row is an array of two cells
  // But header row must be a single-cell array
  const cells = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
