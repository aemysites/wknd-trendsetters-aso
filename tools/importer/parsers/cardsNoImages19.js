/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required by block spec
  const headerRow = ['Cards (cardsNoImages19)'];
  const rows = [headerRow];

  // Each card is a direct child div
  const cards = element.querySelectorAll(':scope > div');

  cards.forEach((card) => {
    // Find the paragraph (description)
    const p = card.querySelector('p');
    if (p) {
      // Remove icon if present
      const icon = card.querySelector('.icon');
      if (icon) icon.remove();
      // Clone paragraph
      const para = p.cloneNode(true);
      rows.push([para]);
    }
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
