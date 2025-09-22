/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image and text from a card anchor
  function extractCardContent(cardEl) {
    // Find image container (may be nested)
    const imgContainer = cardEl.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    let imgEl = null;
    if (imgContainer) {
      imgEl = imgContainer.querySelector('img');
    }
    // Find heading (h3 or h4)
    const heading = cardEl.querySelector('h3, h4');
    // Find description (first <p>)
    const desc = cardEl.querySelector('p');
    // Find CTA (button or link or div with button class)
    let cta = cardEl.querySelector('.button, .cta, [role="button"], a.button');
    // Compose text cell
    const textCell = [];
    if (heading) textCell.push(heading);
    if (desc) textCell.push(desc);
    if (cta) textCell.push(cta);
    // Compose image cell
    const imageCell = imgEl ? imgEl : '';
    return [imageCell, textCell];
  }

  // Find the grid containing cards
  const grid = element.querySelector('.grid-layout');
  // Get all direct card anchors inside grid
  let cards = [];
  if (grid) {
    // The first child is a card anchor, the second child is a nested grid with more cards
    const gridChildren = Array.from(grid.children);
    gridChildren.forEach((child) => {
      if (child.matches('a.utility-link-content-block')) {
        cards.push(child);
      } else if (child.classList.contains('grid-layout')) {
        // Nested grid, get all card anchors inside
        cards = cards.concat(Array.from(child.querySelectorAll('a.utility-link-content-block')));
      }
    });
  }

  // Compose table rows
  const headerRow = ['Cards (cards37)'];
  const rows = [headerRow];
  cards.forEach((cardEl) => {
    rows.push(extractCardContent(cardEl));
  });

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
