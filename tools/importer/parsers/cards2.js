/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a card anchor
  function extractCard(anchor) {
    // Find image (if present)
    const imgContainer = anchor.querySelector('.utility-aspect-1x1, .utility-aspect-3x2');
    let img = null;
    if (imgContainer) {
      img = imgContainer.querySelector('img');
    }
    // Tag (optional)
    const tagGroup = anchor.querySelector('.tag-group');
    let tag = null;
    if (tagGroup) {
      tag = tagGroup.querySelector('.tag');
    }
    // Heading
    let heading = anchor.querySelector('h3');
    // Description
    let desc = anchor.querySelector('p');
    // Build text cell
    const textCell = document.createElement('div');
    if (tag) {
      const tagDiv = document.createElement('div');
      tagDiv.appendChild(tag);
      textCell.appendChild(tagDiv);
    }
    if (heading) {
      textCell.appendChild(heading);
    }
    if (desc) {
      textCell.appendChild(desc);
    }
    return [img ? img : '', textCell]; // Use empty string instead of null for missing image
  }

  // Get main grid
  const grid = element.querySelector('.grid-layout');
  const flexGroups = Array.from(grid.querySelectorAll(':scope > .flex-horizontal'));

  // Compose rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards2)']);

  // First card (big left)
  const firstCardAnchor = grid.querySelector(':scope > a.utility-link-content-block');
  if (firstCardAnchor) {
    rows.push(extractCard(firstCardAnchor));
  }

  // Next two cards (with images)
  if (flexGroups.length > 0) {
    const imgCards = Array.from(flexGroups[0].querySelectorAll(':scope > a.utility-link-content-block'));
    imgCards.forEach((anchor) => {
      rows.push(extractCard(anchor));
    });
  }

  // Remaining cards (text only, right column)
  if (flexGroups.length > 1) {
    const textCards = Array.from(flexGroups[1].querySelectorAll(':scope > a.utility-link-content-block'));
    textCards.forEach((anchor) => {
      // Use empty string instead of null for missing image
      rows.push(['', extractCard(anchor)[1]]);
    });
  }

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
