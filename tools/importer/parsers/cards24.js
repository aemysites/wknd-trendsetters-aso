/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Cards (cards24)'];
  const rows = [headerRow];

  // Get all direct <a> children (each is a card)
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  cards.forEach((card) => {
    // Image cell: find the first <img> inside the card
    const imgWrapper = card.querySelector(':scope > div');
    let img = imgWrapper ? imgWrapper.querySelector('img') : null;
    // Defensive: if no image, leave cell empty
    const imageCell = img ? img : '';

    // Text cell: collect tag, date, and heading
    const textParts = [];

    // Tag and date row
    const tagRow = card.querySelector('.flex-horizontal');
    if (tagRow) {
      // Reference existing element (do not clone)
      textParts.push(tagRow);
    }

    // Heading
    const heading = card.querySelector('h3, .h4-heading');
    if (heading) {
      textParts.push(heading);
    }

    rows.push([imageCell, textParts]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
