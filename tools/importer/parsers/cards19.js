/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as required
  const headerRow = ['Cards (cards19)'];
  const rows = [headerRow];

  // Get all immediate card containers (each card is a flex-horizontal)
  const cardElements = element.querySelectorAll(':scope > div');

  cardElements.forEach((card) => {
    // Icon: find the first .icon element inside the card (contains SVG)
    const iconWrapper = card.querySelector('.icon');
    // Defensive: ensure we have an icon
    let icon = null;
    if (iconWrapper) {
      icon = iconWrapper;
    }

    // Text: find the p (description) inside the card
    const text = card.querySelector('p');
    // Defensive: ensure we have text
    let textContent = null;
    if (text) {
      textContent = text;
    }

    // Add the row: [icon, text]
    rows.push([
      icon,
      textContent,
    ]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
