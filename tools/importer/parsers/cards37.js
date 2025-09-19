/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a card anchor
  function extractCardInfo(cardEl) {
    // Find image (mandatory)
    let imgDiv = cardEl.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    let img = imgDiv ? imgDiv.querySelector('img') : null;
    // Find heading (h2, h3, h4)
    let heading = cardEl.querySelector('h2, h3, h4');
    // Find description (first <p> after heading)
    let desc = null;
    if (heading) {
      desc = heading.nextElementSibling && heading.nextElementSibling.tagName === 'P'
        ? heading.nextElementSibling
        : cardEl.querySelector('p');
    } else {
      desc = cardEl.querySelector('p');
    }
    // Find CTA (button or link)
    let cta = cardEl.querySelector('.button, .cta, a.button');
    // Compose text cell
    const textCell = [];
    if (heading) textCell.push(heading);
    if (desc) textCell.push(desc);
    if (cta) textCell.push(cta);
    return [img, textCell];
  }

  // Find main grid containing cards
  const mainGrid = element.querySelector('.grid-layout');
  // First card is a large feature, the rest are smaller cards inside nested grid
  const cards = [];
  // First card (feature)
  const firstCard = mainGrid.querySelector('a.utility-link-content-block');
  if (firstCard) {
    cards.push(extractCardInfo(firstCard));
  }
  // Nested grid contains remaining cards
  const nestedGrid = mainGrid.querySelector('.grid-layout');
  if (nestedGrid) {
    const cardLinks = Array.from(nestedGrid.querySelectorAll('a.utility-link-content-block'));
    cardLinks.forEach(cardEl => {
      cards.push(extractCardInfo(cardEl));
    });
  }

  // Table header
  const headerRow = ['Cards (cards37)'];
  // Table rows: each card is a row with [image, text]
  const tableRows = cards.map(([img, textCell]) => [img, textCell]);
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...tableRows
  ], document);

  // Replace element
  element.replaceWith(table);
}
