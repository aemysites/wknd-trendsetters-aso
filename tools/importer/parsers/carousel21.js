/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: find first direct child with a class
  function findDirectChildByClass(parent, className) {
    return Array.from(parent.children).find(child => child.classList.contains(className));
  }

  // Table header row (must match block name exactly)
  const headerRow = ['Carousel (carousel21)'];

  // Defensive: Find the card-body containing the image and heading
  let cardBody = element.querySelector('.card-body');
  if (!cardBody) {
    cardBody = element.querySelector('div.card-body');
  }

  // Find image element (mandatory)
  let image = cardBody ? cardBody.querySelector('img') : null;
  if (!image) {
    image = element.querySelector('img');
  }

  // Reference the existing image element (do not clone or create new)
  let imageCell = image || '';

  // Find heading (optional)
  let heading = cardBody ? cardBody.querySelector('.h4-heading') : null;
  if (!heading) {
    heading = element.querySelector('h4, .h4-heading, h3, h2, h1');
  }

  // Build text cell (only if heading exists)
  let textCell = '';
  if (heading) {
    // Reference the existing heading element (do not clone)
    textCell = document.createElement('div');
    textCell.appendChild(heading);
  }

  // Compose table rows
  const rows = [
    headerRow,
    [imageCell, textCell]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
