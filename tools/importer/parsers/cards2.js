/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card data from an <a> card element
  function extractCard(cardEl) {
    // Find image (if any)
    const imgContainer = cardEl.querySelector('.utility-aspect-1x1, .utility-aspect-3x2');
    let img = null;
    if (imgContainer) {
      img = imgContainer.querySelector('img');
    }
    // Find tag (if any)
    const tagGroup = cardEl.querySelector('.tag-group');
    let tag = null;
    if (tagGroup) {
      tag = tagGroup.querySelector('.tag');
    }
    // Find heading
    let heading = cardEl.querySelector('h3');
    // Find description
    let desc = cardEl.querySelector('p');
    // Compose text cell
    const textCell = document.createElement('div');
    if (tag) {
      const tagDiv = document.createElement('div');
      tagDiv.appendChild(tag);
      textCell.appendChild(tagDiv);
    }
    if (heading) textCell.appendChild(heading);
    if (desc) textCell.appendChild(desc);
    return [img || '', textCell];
  }

  // Get the grid-layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // The first card is the big left card (first child <a> of grid)
  const mainCard = grid.querySelector('a.utility-link-content-block');

  // The next group is the vertical stack of cards (inside .flex-horizontal)
  const flexGroups = grid.querySelectorAll('.flex-horizontal');

  // Compose table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards2)']);

  // First card (big left card)
  if (mainCard) {
    rows.push(extractCard(mainCard));
  }

  // Cards in the first flex-horizontal (images, tags, headings, descriptions)
  if (flexGroups[0]) {
    const flexCards = flexGroups[0].querySelectorAll('a.utility-link-content-block');
    flexCards.forEach(card => {
      rows.push(extractCard(card));
    });
  }

  // Cards in the second flex-horizontal (just headings/descriptions)
  if (flexGroups[1]) {
    const flexCards = flexGroups[1].querySelectorAll('a.utility-link-content-block');
    flexCards.forEach(card => {
      // For these, no image, just heading/desc
      let heading = card.querySelector('h3');
      let desc = card.querySelector('p');
      const textCell = document.createElement('div');
      if (heading) textCell.appendChild(heading);
      if (desc) textCell.appendChild(desc);
      rows.push(['', textCell]);
    });
  }

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
