/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child <a> elements (each is a card)
  const cardLinks = Array.from(element.querySelectorAll(':scope > a'));

  // Table header as required by spec
  const headerRow = ['Cards (cards24)'];
  const rows = [headerRow];

  cardLinks.forEach((card) => {
    // Image: first child div > img
    const imgDiv = card.querySelector(':scope > div');
    const img = imgDiv ? imgDiv.querySelector('img') : null;

    // Meta (tag and date): second child div
    const metaDiv = card.querySelectorAll(':scope > div')[1];
    let metaContent = [];
    if (metaDiv) {
      // Tag
      const tag = metaDiv.querySelector('.tag');
      if (tag) metaContent.push(tag);
      // Date
      const date = metaDiv.querySelector('.paragraph-sm');
      if (date) metaContent.push(date);
    }

    // Heading (title)
    const heading = card.querySelector('h3');

    // Compose text cell: meta row (if present) + heading
    const textCell = [];
    if (metaContent.length) {
      const metaWrap = document.createElement('div');
      metaWrap.style.display = 'flex';
      metaWrap.style.gap = '0.5em';
      metaWrap.append(...metaContent);
      textCell.push(metaWrap);
    }
    if (heading) textCell.push(heading);

    // Add row: [image, text cell]
    rows.push([
      img ? img : '',
      textCell.length ? textCell : ''
    ]);
  });

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
