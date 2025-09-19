/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from each <a> card element
  function extractCardContent(card) {
    // Find the image (mandatory)
    const img = card.querySelector('img');

    // Find the content container (the div after the image)
    const contentDiv = img.nextElementSibling;

    // Defensive: if contentDiv is missing, fallback to card
    const contentScope = contentDiv || card;

    // Tag and read time (optional, can be grouped inline)
    const metaDiv = contentScope.querySelector('.flex-horizontal');
    // Title (h3 or h4)
    const heading = contentScope.querySelector('h3, h4, h2, h1');
    // Description (first <p> after heading)
    let description = null;
    if (heading) {
      let next = heading.nextElementSibling;
      while (next && next.tagName.toLowerCase() !== 'p') {
        next = next.nextElementSibling;
      }
      description = next;
    }
    // CTA (the last div with text 'Read', or a link)
    let cta = null;
    // Try to find a div with text 'Read' (case-insensitive)
    const divs = contentScope.querySelectorAll('div');
    for (const d of divs) {
      if (d.textContent && d.textContent.trim().toLowerCase() === 'read') {
        cta = d;
        break;
      }
    }
    // If not found, fallback to a link inside the card
    if (!cta) {
      const link = contentScope.querySelector('a');
      if (link) cta = link;
    }

    // Compose the text cell: meta, heading, description, cta
    const textCell = [];
    if (metaDiv) textCell.push(metaDiv);
    if (heading) textCell.push(heading);
    if (description) textCell.push(description);
    if (cta) textCell.push(cta);

    return [img, textCell];
  }

  // Get all immediate <a> children (cards)
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  // Build the table rows
  const headerRow = ['Cards (cards33)'];
  const rows = [headerRow];

  cards.forEach(card => {
    rows.push(extractCardContent(card));
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
