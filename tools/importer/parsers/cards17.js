/* global WebImporter */
export default function parse(element, { document }) {
  // Block header: exactly one column with block name
  const headerRow = ['Cards (cards17)'];
  const rows = [headerRow];

  // Each card is a direct child div with .utility-aspect-1x1
  const cardDivs = element.querySelectorAll(':scope > div.utility-aspect-1x1');

  cardDivs.forEach((cardDiv) => {
    // Find the image inside the card
    const img = cardDiv.querySelector('img');
    if (!img) return; // Defensive: skip if no image
    // For text cell, include the entire cardDiv's text content (if any) and image alt
    let textContent = '';
    // Sometimes there may be text nodes or other elements inside cardDiv
    // Get all text nodes except inside the img
    const cardText = Array.from(cardDiv.childNodes)
      .filter(n => n.nodeType === Node.TEXT_NODE)
      .map(n => n.textContent.trim())
      .filter(Boolean)
      .join(' ');
    if (cardText) {
      textContent = cardText;
    }
    // Always include the alt text if present
    const altText = img.getAttribute('alt') || '';
    textContent = textContent ? `${textContent}\n${altText}` : altText;
    rows.push([img, textContent]);
  });

  // Create the Cards block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
