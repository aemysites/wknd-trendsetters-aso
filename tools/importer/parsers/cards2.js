/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a card anchor
  function extractCardInfo(cardAnchor) {
    // Find image (if present)
    const imgContainer = cardAnchor.querySelector('.utility-aspect-1x1, .utility-aspect-3x2');
    let img = null;
    if (imgContainer) {
      img = imgContainer.querySelector('img');
    }
    // Find tag (if present)
    const tagGroup = cardAnchor.querySelector('.tag-group');
    let tag = null;
    if (tagGroup) {
      tag = tagGroup.querySelector('.tag');
    }
    // Find heading (h3)
    let heading = cardAnchor.querySelector('h3');
    // Find description (p)
    let desc = cardAnchor.querySelector('p');
    // Compose text cell
    const textCell = document.createElement('div');
    if (tag) {
      const tagSpan = document.createElement('span');
      tagSpan.textContent = tag.textContent;
      tagSpan.style.display = 'inline-block';
      tagSpan.style.fontSize = '0.75em';
      tagSpan.style.marginBottom = '0.5em';
      textCell.appendChild(tagSpan);
      textCell.appendChild(document.createElement('br'));
    }
    if (heading) {
      textCell.appendChild(heading.cloneNode(true));
    }
    if (desc) {
      textCell.appendChild(desc.cloneNode(true));
    }
    // Only return a card if there is an image
    if (img) {
      return [img.cloneNode(true), textCell];
    }
    // If no image, skip this card (do not return anything)
    return null;
  }
  // Get main grid
  const container = element.querySelector(':scope > div > div');
  // Compose table rows
  const rows = [];
  // Header row
  const headerRow = ['Cards (cards2)'];
  rows.push(headerRow);
  // Main card (large left card)
  const mainCardAnchor = container.querySelector(':scope > a.utility-link-content-block');
  if (mainCardAnchor) {
    const card = extractCardInfo(mainCardAnchor);
    if (card) rows.push(card);
  }
  // Right column, top row: two cards with images
  const rightTopRow = container.querySelector(':scope > div.flex-horizontal');
  if (rightTopRow) {
    const rightTopCards = Array.from(rightTopRow.querySelectorAll(':scope > a.utility-link-content-block'));
    rightTopCards.forEach(cardAnchor => {
      const card = extractCardInfo(cardAnchor);
      if (card) rows.push(card);
    });
  }
  // Right column, bottom: text-only cards (no image)
  const rightBottomRow = container.querySelector(':scope > div.flex-horizontal.flex-vertical.flex-gap-sm.w-node-f71f504d-ed02-fbe1-5974-4ebc66911f34-86a1a9b3');
  if (rightBottomRow) {
    // Each card is an anchor
    const textCards = Array.from(rightBottomRow.querySelectorAll(':scope > a.utility-link-content-block'));
    textCards.forEach(cardAnchor => {
      // For text-only cards, build text cell with heading and description
      let heading = cardAnchor.querySelector('h3');
      let desc = cardAnchor.querySelector('p');
      if (heading || desc) {
        const textCell = document.createElement('div');
        if (heading) textCell.appendChild(heading.cloneNode(true));
        if (desc) textCell.appendChild(desc.cloneNode(true));
        rows.push(['', textCell]);
      }
    });
  }
  // Create table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace element
  element.replaceWith(table);
}
