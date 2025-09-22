/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards24)'];
  const rows = [headerRow];

  // Get all direct child <a> elements (each is a card)
  const cardLinks = element.querySelectorAll(':scope > a');

  cardLinks.forEach((card) => {
    // Find image container and image
    const imgContainer = card.querySelector(':scope > div');
    const img = imgContainer ? imgContainer.querySelector('img') : null;

    // Find tag/date container
    const tagDateContainer = card.querySelector('.flex-horizontal');
    let tag = null;
    let date = null;
    if (tagDateContainer) {
      const tagElem = tagDateContainer.querySelector('.tag');
      const dateElem = tagDateContainer.querySelector('.paragraph-sm');
      tag = tagElem ? tagElem.cloneNode(true) : null;
      date = dateElem ? dateElem.cloneNode(true) : null;
    }

    // Find title
    const titleElem = card.querySelector('h3');
    const title = titleElem ? titleElem.cloneNode(true) : null;

    // Compose text cell contents
    const textCellContents = [];
    if (tag) textCellContents.push(tag);
    if (date) textCellContents.push(date);
    if (title) textCellContents.push(title);

    // First cell: image element (if present)
    const imageCell = img ? img : '';
    // Second cell: text content (tag/date/title)
    const textCell = textCellContents.length > 0 ? textCellContents : '';

    rows.push([imageCell, textCell]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
