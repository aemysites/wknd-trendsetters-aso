/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required
  const headerRow = ['Cards (cards8)', ''];

  // Each card row: [image, text content]
  // Extract all text content inside each card div, including alt and any descendant text nodes
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));
  const rows = cardDivs.map((div) => {
    const img = div.querySelector('img');
    if (!img) return null;
    // Gather all text content inside the card div (excluding script/style)
    let textContent = '';
    // Collect text from all descendants except img
    Array.from(div.querySelectorAll('*:not(img)')).forEach((node) => {
      textContent += node.textContent.trim() + ' ';
    });
    // Also include direct text nodes
    Array.from(div.childNodes).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        textContent += node.textContent.trim() + ' ';
      }
    });
    textContent = textContent.trim();
    // If no other text, fall back to alt attribute
    if (!textContent && img) {
      textContent = img.getAttribute('alt') || '';
    }
    return [img, textContent];
  }).filter(Boolean);

  // Compose the table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(block);
}
