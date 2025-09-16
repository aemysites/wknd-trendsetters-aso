/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid containing all cards
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Helper to extract card content
  function extractCard(cardEl) {
    // Find image container (may be nested)
    const imgContainer = cardEl.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    const img = imgContainer ? imgContainer.querySelector('img') : null;
    // Find heading (h3)
    const heading = cardEl.querySelector('h3');
    // Find description (p)
    const desc = cardEl.querySelector('p');
    // Find CTA (button or .button div)
    let cta = cardEl.querySelector('a.button, button, .button');
    // If CTA is a div, convert to a link
    if (cta && cta.tagName === 'DIV') {
      const link = document.createElement('a');
      link.textContent = cta.textContent;
      link.href = cardEl.getAttribute('href') || '#';
      cta = link;
    }
    // Compose text cell
    const textCell = [];
    if (heading) textCell.push(heading);
    if (desc) textCell.push(desc);
    if (cta) textCell.push(cta);
    return [img, textCell];
  }

  // Gather all card elements (direct children of grid)
  const cardNodes = Array.from(grid.children).filter(
    (child) => child.classList.contains('utility-link-content-block')
  );

  // Some cards are nested in a sub-grid (second column)
  const nestedGrid = grid.querySelector('.w-layout-grid.grid-layout');
  let nestedCards = [];
  if (nestedGrid) {
    nestedCards = Array.from(nestedGrid.children).filter(
      (child) => child.classList.contains('utility-link-content-block')
    );
  }

  // Merge all cards in order
  const allCards = [];
  // First card is the first child of the main grid
  if (cardNodes.length > 0) {
    allCards.push(cardNodes[0]);
  }
  // Then, nested cards (second column)
  if (nestedCards.length > 0) {
    allCards.push(...nestedCards);
  }

  // Build table rows
  const headerRow = ['Cards (cards37)'];
  const rows = [headerRow];
  allCards.forEach(cardEl => {
    const [img, textCell] = extractCard(cardEl);
    rows.push([img, textCell]);
  });

  // Create table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(table);
}
