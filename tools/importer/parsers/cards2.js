/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image from a card anchor
  function extractImage(cardAnchor) {
    return cardAnchor.querySelector('img');
  }

  // Helper to extract all text content from a card anchor (more flexible)
  function extractText(cardAnchor) {
    const frag = document.createDocumentFragment();
    // Clone all children except images
    Array.from(cardAnchor.childNodes).forEach((node) => {
      if (!(node.tagName && node.tagName.toLowerCase() === 'div' && node.querySelector('img'))) {
        frag.appendChild(node.cloneNode(true));
      }
    });
    return frag;
  }

  // Get the main grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // The first card (feature card)
  const mainCard = grid.querySelector('a.utility-link-content-block');
  // The next group is a flex-horizontal block with two cards (top right)
  const flexBlocks = grid.querySelectorAll('.flex-horizontal');
  let flex1Cards = [];
  let flex2Cards = [];
  if (flexBlocks.length > 0) {
    flex1Cards = Array.from(flexBlocks[0].querySelectorAll('a.utility-link-content-block'));
  }
  if (flexBlocks.length > 1) {
    flex2Cards = Array.from(flexBlocks[1].querySelectorAll('a.utility-link-content-block'));
  }

  // Compose all cards in order
  const cards = [];
  if (mainCard) cards.push(mainCard);
  cards.push(...flex1Cards);
  cards.push(...flex2Cards);

  // Build table rows
  const rows = [];
  // Header row
  const headerRow = ['Cards (cards2)'];
  rows.push(headerRow);

  // For each card, create a row: [image, text content]
  cards.forEach(card => {
    const img = extractImage(card);
    const text = extractText(card);
    // Only include rows with images, per block rules
    if (img) {
      rows.push([img, text]);
    }
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
