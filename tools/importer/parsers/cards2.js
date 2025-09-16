/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the image from a card anchor
  function getCardImage(card) {
    return card.querySelector('img');
  }

  // Helper to extract all text content from a card anchor, including tags, headings, and paragraphs
  function getCardText(card) {
    const fragments = [];
    card.querySelectorAll('.tag-group').forEach(tag => fragments.push(tag.cloneNode(true)));
    card.querySelectorAll('h2, h3, h4').forEach(h => fragments.push(h.cloneNode(true)));
    card.querySelectorAll('p').forEach(p => fragments.push(p.cloneNode(true)));
    return fragments;
  }

  // Find the grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // First card: large card with image and text (anchor)
  const firstCard = gridChildren.find((el) => el.tagName === 'A');

  // Second group: two cards with images and text (inside flex-horizontal)
  const flexHorizontal = gridChildren.find((el) => el.classList.contains('flex-horizontal') && !el.classList.contains('flex-vertical'));
  let imageCards = [];
  if (flexHorizontal) {
    imageCards = Array.from(flexHorizontal.querySelectorAll(':scope > a'));
  }

  // Third group: text-only cards (inside flex-vertical)
  const flexVertical = gridChildren.find((el) => el.classList.contains('flex-vertical'));
  let textCards = [];
  if (flexVertical) {
    textCards = Array.from(flexVertical.querySelectorAll(':scope > a'));
  }

  // Compose rows
  const rows = [];
  const headerRow = ['Cards (cards2)'];
  rows.push(headerRow);

  // First card (large)
  if (firstCard) {
    const img = getCardImage(firstCard);
    const text = getCardText(firstCard);
    if (img) {
      rows.push([
        img.cloneNode(true),
        text.length ? text : '',
      ]);
    }
  }

  // Two image cards
  imageCards.forEach((card) => {
    const img = getCardImage(card);
    const text = getCardText(card);
    if (img) {
      rows.push([
        img.cloneNode(true),
        text.length ? text : '',
      ]);
    }
  });

  // Text-only cards (no image): do NOT push rows with empty image cells
  // Only push rows where there is an image (as per block spec)

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
