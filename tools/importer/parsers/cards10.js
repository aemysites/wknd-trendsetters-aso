/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element is a container with card links
  if (!element || !element.querySelectorAll) return;

  // Table header as required
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Each card is an <a.card-link ...>
  const cards = element.querySelectorAll(':scope > a.card-link');
  cards.forEach((card) => {
    // Defensive: find image (first child div > img)
    let imageCell = null;
    const imgDiv = card.querySelector(':scope > div');
    if (imgDiv) {
      const img = imgDiv.querySelector('img');
      if (img) imageCell = img;
    }

    // Text cell: get the content div
    let textCell = null;
    const contentDiv = card.querySelector('.utility-padding-all-1rem');
    if (contentDiv) textCell = contentDiv;

    // Only add row if both cells exist
    if (imageCell && textCell) {
      rows.push([imageCell, textCell]);
    }
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
