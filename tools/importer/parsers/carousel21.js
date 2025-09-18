/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get all immediate child cards (each slide)
  const cardWrappers = element.querySelectorAll(':scope > div');

  // Table header row (block name)
  const headerRow = ['Carousel (carousel21)'];
  const rows = [headerRow];

  // For each card, extract image and text content
  cardWrappers.forEach((cardWrapper) => {
    // Defensive: Find .card-body inside this card
    const cardBody = cardWrapper.querySelector('.card-body');
    if (!cardBody) return;

    // Image: first cell
    const img = cardBody.querySelector('img');
    // Defensive: only add row if image exists
    if (!img) return;

    // Text content: second cell
    // Try to find heading and description
    const title = cardBody.querySelector('.h4-heading');
    // For description, get all elements except the heading and image
    const descriptionEls = Array.from(cardBody.childNodes).filter((node) => {
      // Exclude heading and image
      if (node === title || node === img) return false;
      // Only include element nodes or text nodes with content
      if (node.nodeType === 1) return true;
      if (node.nodeType === 3 && node.textContent.trim()) return true;
      return false;
    });
    // Compose text cell
    const textCell = [];
    if (title) textCell.push(title);
    if (descriptionEls.length) textCell.push(...descriptionEls);

    // Add row: [image, text content]
    rows.push([
      img,
      textCell.length ? textCell : ''
    ]);
  });

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
