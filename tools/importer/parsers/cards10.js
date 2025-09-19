/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as specified
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Defensive: get all direct card links (each card is an <a>)
  const cardLinks = element.querySelectorAll(':scope > a');

  cardLinks.forEach((card) => {
    // Find image (first child div with img inside)
    const imgDiv = card.querySelector(':scope > div.utility-aspect-3x2');
    const img = imgDiv ? imgDiv.querySelector('img') : null;

    // Find content div (second child div)
    const contentDiv = card.querySelector(':scope > div.utility-padding-all-1rem');
    let tag = null, heading = null, desc = null;
    if (contentDiv) {
      // Tag (optional)
      const tagGroup = contentDiv.querySelector('.tag-group');
      if (tagGroup) {
        tag = tagGroup.querySelector('.tag');
      }
      // Heading (optional)
      heading = contentDiv.querySelector('h3, .h4-heading');
      // Description (optional)
      desc = contentDiv.querySelector('p');
    }

    // Compose text cell content
    const textCellContent = [];
    if (tag) textCellContent.push(tag);
    if (heading) textCellContent.push(heading);
    if (desc) textCellContent.push(desc);

    // Defensive: if nothing found, fallback to contentDiv
    if (textCellContent.length === 0 && contentDiv) {
      textCellContent.push(contentDiv);
    }

    // Defensive: if no image, fallback to imgDiv
    const imageCell = img ? img : (imgDiv ? imgDiv : '');

    rows.push([
      imageCell,
      textCellContent
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
