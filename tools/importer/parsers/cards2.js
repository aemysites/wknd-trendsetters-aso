/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image from a card anchor
  function getCardImage(cardAnchor) {
    return cardAnchor.querySelector('img');
  }
  // Helper to extract text content from a card anchor
  function getCardText(cardAnchor) {
    const textParts = [];
    // Tag (optional)
    const tagGroup = cardAnchor.querySelector('.tag-group');
    if (tagGroup) {
      textParts.push(tagGroup);
    }
    // Heading (h3 or h4)
    const heading = cardAnchor.querySelector('h3, h4');
    if (heading) {
      textParts.push(heading);
    }
    // Description (p)
    const desc = cardAnchor.querySelector('p');
    if (desc) {
      textParts.push(desc);
    }
    return textParts;
  }
  // --- Main parsing ---
  const headerRow = ['Cards (cards2)'];
  const rows = [headerRow];

  // Get the grid-layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all top-level children of grid
  const gridChildren = Array.from(grid.children);

  // First card: large feature card (left side)
  const firstCardAnchor = gridChildren.find((el) => el.tagName === 'A');
  if (firstCardAnchor) {
    const img = getCardImage(firstCardAnchor);
    const textContent = getCardText(firstCardAnchor);
    rows.push([
      img,
      textContent,
    ]);
  }

  // Second column: vertical stack of cards with images (right side, top)
  const verticalCardsContainer = gridChildren.find((el) => el.classList.contains('flex-horizontal'));
  if (verticalCardsContainer) {
    const cardAnchors = Array.from(verticalCardsContainer.querySelectorAll(':scope > a'));
    cardAnchors.forEach((cardAnchor) => {
      const img = getCardImage(cardAnchor);
      const textContent = getCardText(cardAnchor);
      rows.push([
        img,
        textContent,
      ]);
    });
  }

  // Third column: vertical stack of cards with only text (right side, bottom)
  const textCardsContainer = gridChildren.find((el) => el.classList.contains('flex-horizontal') && el !== verticalCardsContainer);
  if (textCardsContainer) {
    // Each card is an anchor, separated by dividers
    const cardAnchors = Array.from(textCardsContainer.querySelectorAll(':scope > a'));
    cardAnchors.forEach((cardAnchor) => {
      // No image for these cards
      const textContent = getCardText(cardAnchor);
      rows.push([
        '',
        textContent,
      ]);
    });
  }

  // Create and replace block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
