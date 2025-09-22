/* global WebImporter */
export default function parse(element, { document }) {
  // Table header
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Select all direct card links (cards)
  const cards = element.querySelectorAll(':scope > a.card-link');

  cards.forEach((card) => {
    // Image cell: find the first image inside the card
    const imgWrapper = card.querySelector('.utility-aspect-3x2');
    const img = imgWrapper ? imgWrapper.querySelector('img') : null;
    // Defensive: if no image, skip this card
    if (!img) return;

    // Text cell: get the tag, heading, and paragraph
    const textWrapper = card.querySelector('.utility-padding-all-1rem');
    let tag = null, heading = null, desc = null;
    if (textWrapper) {
      // Tag (optional)
      const tagGroup = textWrapper.querySelector('.tag-group');
      if (tagGroup) {
        tag = tagGroup.querySelector('.tag');
      }
      // Heading (optional)
      heading = textWrapper.querySelector('h3, .h4-heading');
      // Description (optional)
      desc = textWrapper.querySelector('p');
    }

    // Compose text cell content
    const cellContent = [];
    if (tag) cellContent.push(tag);
    if (heading) cellContent.push(heading);
    if (desc) cellContent.push(desc);

    rows.push([
      img, // image cell
      cellContent // text cell (array of elements)
    ]);
  });

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
