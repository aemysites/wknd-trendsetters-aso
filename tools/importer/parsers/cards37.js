/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a card element (anchor or div)
  function extractCard(cardEl) {
    // Get image (first img inside the card)
    const img = cardEl.querySelector('img');
    // Get heading (first h3 inside the card)
    const heading = cardEl.querySelector('h2, h3, h4, h5, h6');
    // Get description (first p inside the card)
    const desc = cardEl.querySelector('p');
    // Get CTA (button or link with class 'button' or similar)
    let cta = cardEl.querySelector('.button, button, a.button');
    // If CTA is a div, convert to a button element for semantics
    if (cta && cta.tagName === 'DIV') {
      const btn = document.createElement('span');
      btn.textContent = cta.textContent;
      cta = btn;
    }
    // Compose text cell
    const textParts = [];
    if (heading) textParts.push(heading);
    if (desc) textParts.push(desc);
    if (cta) textParts.push(cta);
    // Return [image, text cell]
    return [img, textParts];
  }

  // Find the main grid containing all cards
  const container = element.querySelector('.w-layout-grid.grid-layout');
  if (!container) return;

  // Gather all card nodes (anchors or divs with card content)
  // The first card is a bit different (has a nested grid for the right cards)
  const cards = [];
  const directCards = Array.from(container.children).filter(
    (el) => el.classList.contains('utility-link-content-block')
  );
  if (directCards.length > 0) {
    // First card is the large one on the left
    cards.push(directCards[0]);
    // The second child is a nested grid containing the right column cards
    const nestedGrid = container.querySelector('.w-layout-grid.grid-layout.tablet-1-column.grid-gap-sm.y-top');
    if (nestedGrid) {
      const nestedCards = Array.from(nestedGrid.children).filter(
        (el) => el.classList.contains('utility-link-content-block')
      );
      cards.push(...nestedCards);
    }
  }

  // Defensive: If no cards found, fallback to all anchors with card class
  if (cards.length === 0) {
    cards.push(...element.querySelectorAll('a.utility-link-content-block'));
  }

  // Build table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards37)']);
  // Card rows
  cards.forEach((card) => {
    rows.push(extractCard(card));
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
