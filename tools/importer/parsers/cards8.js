/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate card divs
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Table header row (single cell, exactly one column)
  const rows = [
    ['Cards (cards8)'],
  ];

  // For each card, create a row: [image, text content]
  cardDivs.forEach((cardDiv) => {
    // Find the image inside the card
    const img = cardDiv.querySelector('img');
    if (!img) return; // Defensive: skip if no image
    // Remove empty width/height attributes for cleanliness
    if (img.hasAttribute('width') && img.getAttribute('width') === '') img.removeAttribute('width');
    if (img.hasAttribute('height') && img.getAttribute('height') === '') img.removeAttribute('height');
    // Reference the existing image element
    const imgCell = img;
    // Use all available text content in the card, but do not wrap in extra divs
    let textCell = '';
    // Gather all text nodes in the card except inside the image
    const textParts = [];
    cardDiv.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        textParts.push(node.textContent.trim());
      } else if (node.nodeType === Node.ELEMENT_NODE && node !== img) {
        // If it's not the image, get its text
        const txt = node.textContent.trim();
        if (txt) textParts.push(txt);
      }
    });
    // If no text found, fallback to alt text
    if (textParts.length === 0 && img.alt && img.alt.trim()) {
      textParts.push(img.alt.trim());
    }
    // Compose text cell as plain string (no div wrapper)
    if (textParts.length > 0) {
      textCell = textParts.join(' ');
    }
    rows.push([imgCell, textCell]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
