/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from an anchor card
  function extractCard(cardEl) {
    // Find image (mandatory if present)
    const imgContainer = cardEl.querySelector('.utility-aspect-1x1, .utility-aspect-3x2');
    let img = null;
    if (imgContainer) {
      img = imgContainer.querySelector('img');
    }
    // Find tag (optional)
    const tagGroup = cardEl.querySelector('.tag-group');
    let tag = null;
    if (tagGroup) {
      tag = tagGroup.querySelector('.tag');
    }
    // Find title (h3)
    let title = cardEl.querySelector('h3');
    // Find description (p)
    let desc = cardEl.querySelector('p');
    // Compose text cell
    const textParts = [];
    if (tag) {
      const tagSpan = document.createElement('span');
      tagSpan.textContent = tag.textContent;
      tagSpan.className = 'card-tag';
      textParts.push(tagSpan);
    }
    if (title) textParts.push(title);
    if (desc) textParts.push(desc);
    // If no image, use empty cell instead of null
    return [img ? img : '', textParts];
  }

  // Find the grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all card links in DOM order
  const cardLinks = Array.from(grid.querySelectorAll('a.utility-link-content-block'));

  // Compose table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards2)']);

  // For each card link, extract the card
  cardLinks.forEach(card => {
    rows.push(extractCard(card));
  });

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
