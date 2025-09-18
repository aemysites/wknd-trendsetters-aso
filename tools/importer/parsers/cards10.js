/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Get all direct card links (each card is an <a>)
  const cards = element.querySelectorAll(':scope > a');

  cards.forEach((card) => {
    // Image cell: find the image inside the card
    const imgWrapper = card.querySelector(':scope > div');
    const img = imgWrapper ? imgWrapper.querySelector('img') : null;
    // Defensive: if no image, skip this card
    if (!img) return;

    // Text cell: get the content area
    const contentDiv = card.querySelector('.utility-padding-all-1rem');
    if (!contentDiv) return;

    // Tag (optional)
    const tagGroup = contentDiv.querySelector('.tag-group');
    let tag = null;
    if (tagGroup) {
      tag = tagGroup.querySelector('.tag');
    }

    // Title (h3)
    const heading = contentDiv.querySelector('h3');
    // Description (p)
    const desc = contentDiv.querySelector('p');

    // Compose text cell contents
    const textCell = [];
    if (tag) {
      textCell.push(tag);
    }
    if (heading) {
      textCell.push(heading);
    }
    if (desc) {
      textCell.push(desc);
    }

    // Add row: [image, text cell]
    rows.push([img, textCell]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the block
  element.replaceWith(block);
}
