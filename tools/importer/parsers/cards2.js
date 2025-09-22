/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a card anchor
  function extractCardInfo(cardAnchor) {
    // Find image (if any)
    let image = cardAnchor.querySelector('img');
    // Find tag (if any)
    let tag = cardAnchor.querySelector('.tag');
    // Find heading (h3 or h4)
    let heading = cardAnchor.querySelector('h3, h4');
    // Find description (p)
    let desc = cardAnchor.querySelector('p');

    // Compose text cell content
    const textContent = [];
    if (tag) {
      textContent.push(tag.cloneNode(true));
    }
    if (heading) {
      textContent.push(heading.cloneNode(true));
    }
    if (desc) {
      textContent.push(desc.cloneNode(true));
    }
    return [image ? image.cloneNode(true) : '', textContent];
  }

  // Find the main grid
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Cards array
  const cards = [];

  // The grid has two main children: the big card (left) and the right column (2 stacked groups)
  // 1. Large card on the left (first child, an anchor)
  const leftCardAnchor = grid.children[0];
  if (leftCardAnchor && leftCardAnchor.tagName === 'A') {
    // The left card has a nested image, tag, heading, and desc
    cards.push(extractCardInfo(leftCardAnchor));
  }

  // 2. Top right: two cards with images (inside a flex container)
  const rightTopFlex = grid.children[1];
  if (rightTopFlex) {
    const rightTopAnchors = rightTopFlex.querySelectorAll(':scope > a');
    rightTopAnchors.forEach((anchor) => {
      cards.push(extractCardInfo(anchor));
    });
  }

  // 3. Bottom right: a flex container with text-only cards separated by dividers
  const rightBottomFlex = grid.children[2];
  if (rightBottomFlex) {
    // The anchors are the cards
    const rightBottomAnchors = rightBottomFlex.querySelectorAll(':scope > a');
    rightBottomAnchors.forEach((anchor) => {
      cards.push(extractCardInfo(anchor));
    });
  }

  // Compose table rows
  const headerRow = ['Cards (cards2)'];
  const rows = [headerRow];
  cards.forEach(([img, text]) => {
    rows.push([img, text]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
