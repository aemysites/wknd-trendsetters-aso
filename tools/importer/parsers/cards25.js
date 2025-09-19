/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs (each card)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Table header as required by the block spec
  const headerRow = ['Cards (cards25)'];
  const rows = [headerRow];

  cardDivs.forEach((cardDiv) => {
    // Find the first img in the card (mandatory)
    const img = cardDiv.querySelector('img');
    if (!img) return; // Skip if no image

    // Find the text container
    let textContainer = cardDiv.querySelector('.utility-padding-all-2rem');
    if (!textContainer) {
      const rel = cardDiv.querySelector('.utility-position-relative');
      if (rel) textContainer = rel;
    }
    if (!textContainer) textContainer = cardDiv;

    // Extract heading and paragraph if present
    let heading = textContainer.querySelector('h3, h2, h1, h4, h5, h6');
    let desc = textContainer.querySelector('p');
    // Defensive: if not found, try at cardDiv level
    if (!heading) heading = cardDiv.querySelector('h3, h2, h1, h4, h5, h6');
    if (!desc) desc = cardDiv.querySelector('p');

    // Compose text cell content
    const textCell = [];
    if (heading) textCell.push(heading);
    if (desc) textCell.push(desc);

    // Only add row if image and some text
    if (img && textCell.length) {
      rows.push([img, textCell]);
    }
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
