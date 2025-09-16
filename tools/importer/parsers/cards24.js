/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards24)'];

  // Get all direct child <a> elements (each is a card)
  const cardLinks = Array.from(element.querySelectorAll(':scope > a'));

  // Build table rows for each card
  const rows = cardLinks.map((card) => {
    // Image cell: find the first <img> inside the card
    const imgWrapper = card.querySelector(':scope > div');
    let image = imgWrapper ? imgWrapper.querySelector('img') : null;
    // Defensive: if no image, fallback to wrapper
    const imageCell = image || imgWrapper || '';

    // Text cell: collect tag, date, and heading
    const infoBar = card.querySelector('.flex-horizontal');
    const tag = infoBar ? infoBar.querySelector('.tag') : null;
    const date = infoBar ? infoBar.querySelector('.paragraph-sm') : null;
    const heading = card.querySelector('h3');

    // Compose text cell
    const textCellContent = [];
    if (tag) textCellContent.push(tag);
    if (date) textCellContent.push(date);
    if (heading) textCellContent.push(heading);

    return [imageCell, textCellContent];
  });

  // Compose table data
  const tableData = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
