/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row (must be exactly one column, no colspan)
  const headerRow = ['Cards (cards37)'];
  const rows = [headerRow];

  // Find the main grid containing cards
  const grids = element.querySelectorAll(':scope .grid-layout');
  if (!grids || grids.length === 0) return;

  // Helper to extract card info from an anchor card
  function extractCard(cardEl) {
    // Find image: always inside a div with class utility-aspect-*
    const imageContainer = cardEl.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    let img = imageContainer ? imageContainer.querySelector('img') : null;
    const imageCell = img ? img.cloneNode(true) : '';

    // Find text content: heading, paragraph, button (convert button to link if present)
    let heading = cardEl.querySelector('h2, h3, h4');
    let description = cardEl.querySelector('p');
    let button = cardEl.querySelector('.button');
    let cta = null;
    if (button) {
      let link = cardEl.closest('a');
      let href = link ? link.getAttribute('href') : '#';
      cta = document.createElement('a');
      cta.href = href || '#';
      cta.textContent = button.textContent;
    }
    const textCell = [];
    if (heading) textCell.push(heading.cloneNode(true));
    if (description) textCell.push(description.cloneNode(true));
    if (cta) textCell.push(cta);
    return [imageCell, textCell];
  }

  // First grid: contains the main hero card and the nested grid of smaller cards
  const mainGrid = grids[0];
  // First card is the hero card (large image, heading, description, button)
  const heroCard = mainGrid.querySelector(':scope > a');
  if (heroCard) {
    rows.push(extractCard(heroCard));
  }

  // Nested grid: contains the remaining cards
  const nestedGrid = mainGrid.querySelector(':scope > .grid-layout');
  if (nestedGrid) {
    const smallCards = nestedGrid.querySelectorAll(':scope > a');
    smallCards.forEach(card => {
      rows.push(extractCard(card));
    });
  }

  // Replace the original element with the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
