/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Cards (cards19)'];
  const rows = [headerRow];

  // Get all direct children (each card)
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((cardDiv) => {
    // Defensive: find the icon (SVG) and the text (p)
    // Icon is inside: div > div.icon > svg
    let iconDiv = cardDiv.querySelector(':scope > div .icon');
    let icon = iconDiv ? iconDiv.querySelector('svg') : null;
    // Text is the p tag
    let text = cardDiv.querySelector('p');

    // Defensive: if either is missing, skip this card
    if (!icon || !text) return;

    // Place icon and text in their respective cells
    rows.push([
      icon,
      text
    ]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
