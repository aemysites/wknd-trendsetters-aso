/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a card anchor
  function extractCardInfo(cardEl) {
    // Find image (mandatory)
    const img = cardEl.querySelector('img');
    // Find tag (optional)
    const tag = cardEl.querySelector('.tag');
    // Find title (h3 or h4)
    let title = cardEl.querySelector('h3, .h3-heading, .h4-heading');
    // Find description (first <p>)
    const desc = cardEl.querySelector('p');
    // Compose text content fragment
    const textContent = document.createElement('div');
    if (tag) {
      const tagClone = tag.cloneNode(true);
      tagClone.style.display = 'block';
      tagClone.style.marginBottom = '0.5em';
      textContent.appendChild(tagClone);
    }
    if (title) textContent.appendChild(title.cloneNode(true));
    if (desc) textContent.appendChild(desc.cloneNode(true));
    return [img, textContent];
  }

  // Get the main grid container
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // The first card is a large feature card (left), the next two are stacked (right top)
  const mainCard = gridChildren[0]; // large left card
  const rightTopGroup = gridChildren[1]; // contains two stacked cards
  const rightBottomGroup = gridChildren[2]; // contains 6 small cards

  const rows = [];
  // Header row
  rows.push(['Cards (cards2)']);

  // 1. Main Card (large left)
  if (mainCard && mainCard.matches('a')) {
    rows.push(extractCardInfo(mainCard));
  }

  // 2. Right top group: two cards
  if (rightTopGroup) {
    const rightTopCards = rightTopGroup.querySelectorAll('a.utility-link-content-block');
    rightTopCards.forEach(card => {
      rows.push(extractCardInfo(card));
    });
  }

  // 3. Right bottom group: six cards (text only, no image)
  if (rightBottomGroup) {
    const rightBottomCards = rightBottomGroup.querySelectorAll('a.utility-link-content-block');
    rightBottomCards.forEach(card => {
      // No image, so first cell is empty (not null)
      const textContent = document.createElement('div');
      const title = card.querySelector('h3, .h3-heading, .h4-heading');
      const desc = card.querySelector('p');
      if (title) textContent.appendChild(title.cloneNode(true));
      if (desc) textContent.appendChild(desc.cloneNode(true));
      rows.push(['', textContent]);
    });
  }

  // Build and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
