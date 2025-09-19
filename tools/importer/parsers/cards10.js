/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Get all direct card links (each card)
  const cards = element.querySelectorAll(':scope > a.card-link');

  cards.forEach((card) => {
    // Find image (mandatory)
    const imgContainer = card.querySelector('.utility-aspect-3x2');
    const img = imgContainer ? imgContainer.querySelector('img') : null;
    // Defensive: if no image, skip this card
    if (!img) return;

    // Find text content
    const textContainer = card.querySelector('.utility-padding-all-1rem');
    let tag = null;
    let heading = null;
    let desc = null;
    let cta = null;

    if (textContainer) {
      // Tag (optional)
      const tagGroup = textContainer.querySelector('.tag-group');
      if (tagGroup) {
        tag = tagGroup.querySelector('.tag');
      }
      // Heading (optional)
      heading = textContainer.querySelector('h3');
      // Description (optional)
      desc = textContainer.querySelector('p');
      // CTA: If the card itself has an href, use its text as CTA
      // Not present visually in this layout, so skip
    }

    // Compose text cell
    const textCell = [];
    if (tag) textCell.push(tag);
    if (heading) textCell.push(heading);
    if (desc) textCell.push(desc);
    if (cta) textCell.push(cta);

    // Add row: [image, text content]
    rows.push([
      img,
      textCell
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(block);
}
