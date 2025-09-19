/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required
  const headerRow = ['Cards (cards24)'];
  const rows = [headerRow];

  // Get all card links (each is a card)
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  cards.forEach((card) => {
    // Find image container and image
    const imageContainer = card.querySelector(':scope > div');
    const img = imageContainer ? imageContainer.querySelector('img') : null;
    // Defensive: use image container if present, else just img
    let imageCell = img ? img : imageContainer;
    if (!imageCell) imageCell = document.createElement('span'); // fallback

    // Find text content
    // Tag and date (optional, grouped)
    const meta = card.querySelector('.flex-horizontal');
    // Heading/title
    const heading = card.querySelector('h3, .h4-heading');

    // Compose text cell contents
    const textCellContents = [];
    if (meta) textCellContents.push(meta);
    if (heading) textCellContents.push(heading);

    // Add row: [image, text]
    rows.push([imageCell, textCellContents]);
  });

  // Create block table and replace element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
