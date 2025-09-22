/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Carousel (carousel21)'];

  // Defensive: Find the main card container
  const card = element.querySelector('.card');
  if (!card) return;

  // Find card body
  const cardBody = card.querySelector('.card-body');
  if (!cardBody) return;

  // Get image (mandatory, first cell)
  const img = cardBody.querySelector('img');
  // Defensive: Only include if present
  const imageCell = img ? img : '';

  // Get heading (optional)
  const heading = cardBody.querySelector('.h4-heading');
  // Defensive: Only include if present
  let textCellContent = [];
  if (heading) {
    // Convert to heading element (h2)
    const h2 = document.createElement('h2');
    h2.textContent = heading.textContent;
    textCellContent.push(h2);
  }

  // If there is other text, add it (none in this example)
  // In this HTML, there is no description or CTA, so only heading

  // If no text, cell should be empty string
  const textCell = textCellContent.length ? textCellContent : '';

  // Build table rows
  const rows = [headerRow, [imageCell, textCell]];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(block);
}
