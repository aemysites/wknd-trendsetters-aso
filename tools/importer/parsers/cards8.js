/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs (each is a card)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Table header as specified by block guidelines
  const headerRow = ['Cards (cards8)'];
  const rows = [headerRow];

  // Each card: image (mandatory), text (mandatory, use alt text as fallback)
  cardDivs.forEach((cardDiv) => {
    const img = cardDiv.querySelector('img');
    if (!img) return;
    const imageCell = img;
    // Use alt text as the text content (since no other text is present)
    let textContent = '';
    // Try to get any text nodes or elements inside the cardDiv (excluding the image)
    // If none, fallback to alt text
    const textNodes = Array.from(cardDiv.childNodes)
      .filter(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0)
      .map(node => node.textContent.trim());
    // Also get any non-img elements' text
    Array.from(cardDiv.children).forEach(child => {
      if (child !== img) {
        textNodes.push(child.textContent.trim());
      }
    });
    if (textNodes.length > 0) {
      textContent = textNodes.join(' ');
    } else {
      textContent = img.getAttribute('alt') || '';
    }
    rows.push([imageCell, textContent]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Do NOT set colspan on header row; header row must be exactly one column
  element.replaceWith(table);
}
