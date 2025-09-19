/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a card link element
  function extractCard(linkEl) {
    // Find image (if present)
    let imgWrapper = linkEl.querySelector(':scope > div[class*="aspect"]');
    let img = imgWrapper ? imgWrapper.querySelector('img') : null;

    // Find tag (if present)
    let tagGroup = linkEl.querySelector('.tag-group');
    let tag = tagGroup ? tagGroup.querySelector('.tag') : null;

    // Find heading (h3 or h4)
    let heading = linkEl.querySelector('h3, .h3-heading, .h4-heading');
    // Find description (p)
    let desc = linkEl.querySelector('p');

    // Compose text cell
    const textCell = [];
    if (tag) textCell.push(tag);
    if (heading) textCell.push(heading);
    if (desc) textCell.push(desc);

    return [img ? img : '', textCell];
  }

  // Get main grid
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Cards array
  const rows = [];
  // Header row
  rows.push(['Cards (cards2)']);

  // First card: large image and text
  const firstCardLink = grid.querySelector(':scope > a.utility-link-content-block');
  if (firstCardLink) {
    rows.push(extractCard(firstCardLink));
  }

  // Second row: two cards side by side
  const secondRow = grid.querySelector(':scope > .flex-horizontal.flex-vertical.flex-gap-sm');
  if (secondRow) {
    const cardLinks = Array.from(secondRow.querySelectorAll(':scope > a.utility-link-content-block'));
    cardLinks.forEach(link => {
      rows.push(extractCard(link));
    });
  }

  // Third row: vertical stack of text cards (no images)
  const thirdRow = grid.querySelectorAll(':scope > .flex-horizontal.flex-vertical.flex-gap-sm')[1];
  // Defensive: if not found, try next sibling
  let thirdRowEl = thirdRow || grid.children[2];
  if (thirdRowEl && thirdRowEl.classList.contains('flex-horizontal')) {
    const cardLinks = Array.from(thirdRowEl.querySelectorAll(':scope > a.utility-link-content-block'));
    cardLinks.forEach(link => {
      // For these, no image, just text
      let heading = link.querySelector('h3, .h3-heading, .h4-heading');
      let desc = link.querySelector('p');
      const textCell = [];
      if (heading) textCell.push(heading);
      if (desc) textCell.push(desc);
      rows.push(['', textCell]);
    });
  }

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
