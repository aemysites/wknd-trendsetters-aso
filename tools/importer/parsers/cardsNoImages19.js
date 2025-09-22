/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as required by block spec
  const headerRow = ['Cards (cardsNoImages19)'];
  const rows = [headerRow];

  // Get all immediate child divs (each is a card)
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((cardDiv) => {
    // Remove the icon (if present)
    const iconDiv = cardDiv.querySelector('.icon');
    if (iconDiv) {
      iconDiv.remove();
    }
    // Find the text paragraph (should be the main content)
    const textParagraph = cardDiv.querySelector('p');
    let content;
    if (textParagraph) {
      // Use the <p> as the card content (reference, do not clone)
      content = textParagraph;
    } else {
      // Fallback: use the cardDiv's textContent
      content = document.createElement('div');
      content.textContent = cardDiv.textContent.trim();
    }
    rows.push([content]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
