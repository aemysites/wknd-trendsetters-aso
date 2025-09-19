/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Compose text cell for a card
  function buildTextCell(card) {
    const frag = document.createElement('div');
    // Tag (optional)
    const tag = card.querySelector('.tag');
    if (tag) frag.appendChild(tag.cloneNode(true));
    // Title (h2, h3, or h4)
    const title = card.querySelector('h2, h3, h4');
    if (title) frag.appendChild(title.cloneNode(true));
    // Description (first p)
    const desc = card.querySelector('p');
    if (desc) frag.appendChild(desc.cloneNode(true));
    return frag;
  }

  // Find all cards in visual order
  const cards = [];
  // 1. Main card (large left)
  const mainCard = element.querySelector('.w-layout-grid > a.utility-link-content-block');
  if (mainCard) cards.push(mainCard);
  // 2. Two image cards (top right)
  const flexRows = element.querySelectorAll('.w-layout-grid > .flex-horizontal');
  if (flexRows[0]) {
    flexRows[0].querySelectorAll('a.utility-link-content-block').forEach(a => cards.push(a));
  }
  // 3. Text-only cards (bottom right)
  if (flexRows[1]) {
    flexRows[1].querySelectorAll('a.utility-link-content-block').forEach(a => cards.push(a));
  }

  // Build table rows
  const rows = [];
  rows.push(['Cards (cards2)']);
  cards.forEach(card => {
    // Image (if present)
    let img = null;
    // Only image cards have an image container
    const imgDiv = card.querySelector('div[class*="utility-aspect"]');
    if (imgDiv) img = imgDiv.querySelector('img');
    // Text cell (tag, title, desc)
    const textCell = buildTextCell(card);
    rows.push([
      img ? img : '',
      textCell
    ]);
  });

  // Create and replace with table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
