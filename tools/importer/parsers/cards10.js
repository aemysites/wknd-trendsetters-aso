/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Each card is an <a.card-link>
  const cardLinks = element.querySelectorAll(':scope > a.card-link');
  cardLinks.forEach(cardLink => {
    // Get the image (mandatory)
    const imageWrapper = cardLink.querySelector('.utility-aspect-3x2');
    let image = null;
    if (imageWrapper) {
      image = imageWrapper.querySelector('img');
    }

    // Get all text content in the card
    const textWrapper = cardLink.querySelector('.utility-padding-all-1rem');
    let textCell = [];
    if (textWrapper) {
      // Instead of picking specific elements, clone the whole text wrapper
      textCell = [textWrapper.cloneNode(true)];
    }

    rows.push([image, textCell]);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
