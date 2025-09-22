/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required
  const headerRow = ['Cards (cardsNoImages19)'];
  const rows = [headerRow];

  // Defensive: Get all immediate children (each card)
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((cardDiv) => {
    // Only want the text content for this block (no images/icons)
    // Find the paragraph (description)
    const para = cardDiv.querySelector('p');
    // Find a heading if present (none in this HTML, but could be in future)
    let heading = null;
    heading = cardDiv.querySelector('h1, h2, h3, h4, h5, h6');

    // Compose cell content
    const cellContent = [];
    if (heading) cellContent.push(heading);
    if (para) cellContent.push(para);

    // Defensive: If no heading, try to extract a title from the paragraph
    // If cellContent is empty, skip this card
    if (cellContent.length === 0) return;

    rows.push([cellContent]);
  });

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
