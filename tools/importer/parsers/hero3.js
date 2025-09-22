/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Find the background image (should be referenced, not cloned)
  const imageEl = grid.querySelector('img.cover-image');
  // If imageEl exists, reference it directly
  const imageCell = imageEl ? imageEl : '';

  // Find the card containing heading, subheading, CTA
  const card = grid.querySelector('.card');
  // If card exists, reference it directly
  const cardCell = card ? card : '';

  // Table header must match block name exactly
  const headerRow = ['Hero (hero3)'];
  const imageRow = [imageCell];
  const contentRow = [cardCell];

  // Compose table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
