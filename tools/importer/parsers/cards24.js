/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to build the text cell for each card
  function buildTextCell(cardLink) {
    const textCell = document.createElement('div');
    // Tag/date row (optional)
    const tagRow = cardLink.querySelector('.flex-horizontal');
    if (tagRow) {
      textCell.appendChild(tagRow);
    }
    // Heading (mandatory)
    const heading = cardLink.querySelector('h3, .h4-heading');
    if (heading) {
      textCell.appendChild(heading);
    }
    return textCell;
  }

  // Get all card links (each card is an <a>)
  const cards = Array.from(element.querySelectorAll(':scope > a'));
  const rows = [
    ['Cards (cards24)'],
  ];

  cards.forEach((cardLink) => {
    // Image cell (mandatory)
    const imageWrapper = cardLink.querySelector('div.utility-aspect-2x3');
    let imageCell = null;
    if (imageWrapper) {
      imageCell = imageWrapper;
    } else {
      // fallback: just use the first img
      const img = cardLink.querySelector('img');
      if (img) imageCell = img;
    }
    // Text cell (mandatory)
    const textCell = buildTextCell(cardLink);
    rows.push([
      imageCell,
      textCell,
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
