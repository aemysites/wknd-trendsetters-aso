/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from each anchor
  function extractCardInfo(cardEl) {
    // Find the image (first div > img)
    const imgWrapper = cardEl.querySelector('div.utility-aspect-2x3');
    let image = null;
    if (imgWrapper) {
      image = imgWrapper.querySelector('img');
    }

    // Find the tag/date row
    const tagRow = cardEl.querySelector('div.flex-horizontal');
    let tag = null;
    let date = null;
    if (tagRow) {
      const tagDiv = tagRow.querySelector('div.tag');
      if (tagDiv) tag = tagDiv;
      const dateDiv = tagRow.querySelector('div.paragraph-sm');
      if (dateDiv) date = dateDiv;
    }

    // Find the title (h3)
    const title = cardEl.querySelector('h3');

    // Compose text cell: tag/date row (if present), then title
    const textCellContent = [];
    if (tag || date) {
      const tagDateRow = document.createElement('div');
      if (tag) tagDateRow.appendChild(tag);
      if (date) tagDateRow.appendChild(date);
      textCellContent.push(tagDateRow);
    }
    if (title) textCellContent.push(title);

    return [image, textCellContent];
  }

  // Get all direct child anchors (cards)
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  // Build table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards24)']);
  // Card rows
  cards.forEach(cardEl => {
    const [image, textCellContent] = extractCardInfo(cardEl);
    rows.push([
      image ? image : '',
      textCellContent.length > 0 ? textCellContent : ''
    ]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
