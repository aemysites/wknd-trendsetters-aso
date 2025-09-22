/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const headerRow = ['Cards (cards24)'];
  const rows = [headerRow];

  // Get all direct child <a> elements (each is a card)
  const cards = element.querySelectorAll(':scope > a');

  cards.forEach((card) => {
    // Find the image container (first div with an img inside)
    const imgContainer = card.querySelector(':scope > div img')?.closest('div');
    // Find the horizontal flex with tag/date
    const metaRow = card.querySelector(':scope > div.flex-horizontal');
    // Find the heading (title)
    const heading = card.querySelector(':scope > h3');

    // Compose the text cell
    const textCellContent = [];
    if (metaRow) textCellContent.push(metaRow);
    if (heading) textCellContent.push(heading);

    // Each row: [image, text]
    rows.push([
      imgContainer || '',
      textCellContent
    ]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
