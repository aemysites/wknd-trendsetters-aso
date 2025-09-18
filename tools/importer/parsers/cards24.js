/* global WebImporter */
export default function parse(element, { document }) {
  // Table header
  const headerRow = ['Cards (cards24)'];
  const cells = [headerRow];

  // Get all card links (each card is an <a> element)
  const cardLinks = element.querySelectorAll(':scope > a');

  cardLinks.forEach((card) => {
    // --- IMAGE CELL ---
    // Find the image inside the card
    const imgWrapper = card.querySelector(':scope > div');
    let imageEl = null;
    if (imgWrapper) {
      imageEl = imgWrapper.querySelector('img');
    }

    // --- TEXT CELL ---
    // Find the tag and date
    const metaRow = card.querySelector('.flex-horizontal');
    let tagEl = null, dateEl = null;
    if (metaRow) {
      // Defensive: find .tag and .paragraph-sm
      tagEl = metaRow.querySelector('.tag');
      dateEl = metaRow.querySelector('.paragraph-sm');
    }
    // Find the heading
    const headingEl = card.querySelector('h3');

    // Compose text cell
    const textCellContent = [];
    // Meta row (tag and date)
    if (tagEl || dateEl) {
      const metaDiv = document.createElement('div');
      if (tagEl) metaDiv.appendChild(tagEl);
      if (dateEl) metaDiv.appendChild(dateEl);
      textCellContent.push(metaDiv);
    }
    // Heading
    if (headingEl) {
      textCellContent.push(headingEl);
    }

    // Add the row: [image, text]
    cells.push([
      imageEl || '',
      textCellContent.length === 1 ? textCellContent[0] : textCellContent
    ]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element
  element.replaceWith(block);
}
