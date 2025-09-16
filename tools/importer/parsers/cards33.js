/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from each anchor card
  function extractCard(card) {
    // First cell: image (mandatory)
    const img = card.querySelector('img');

    // Second cell: text content (title, description, CTA)
    const textContainer = card.querySelector('div.w-layout-grid > div:last-child');
    // Defensive: fallback to any div after the image
    let textDiv = textContainer;
    if (!textDiv) {
      const divs = card.querySelectorAll('div.w-layout-grid > div');
      if (divs.length > 1) textDiv = divs[1];
    }

    // We'll collect the heading, description, and CTA
    let heading, desc, cta;
    if (textDiv) {
      heading = textDiv.querySelector('h3, .h4-heading');
      desc = textDiv.querySelector('p');
      // The CTA is the last div inside textDiv (with text 'Read')
      const divs = textDiv.querySelectorAll('div');
      if (divs.length) {
        // Find a div with textContent 'Read' (case-insensitive, trimmed)
        cta = Array.from(divs).find(d => d.textContent.trim().toLowerCase() === 'read');
        // If found, wrap in a link using the card's href
        if (cta) {
          const link = document.createElement('a');
          link.href = card.href;
          link.textContent = cta.textContent;
          cta = link;
        }
      }
    }

    // Compose the text cell contents
    const textCell = [];
    // Tag and time (optional, horizontal flex)
    const tagTime = textDiv ? textDiv.querySelector('.flex-horizontal') : null;
    if (tagTime) textCell.push(tagTime);
    if (heading) textCell.push(heading);
    if (desc) textCell.push(desc);
    if (cta) textCell.push(cta);

    return [img, textCell];
  }

  // Get all direct child anchors (cards)
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  // Build table rows
  const rows = [
    ['Cards (cards33)'],
    ...cards.map(extractCard),
  ];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(table);
}
