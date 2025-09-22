/* global WebImporter */
export default function parse(element, { document }) {
  function extractCardContent(card) {
    const imageContainer = card.querySelector(':scope > div');
    const img = imageContainer ? imageContainer.querySelector('img') : null;
    const textContainer = card.querySelector(':scope > div + div');
    let tag = null;
    let heading = null;
    let description = null;
    if (textContainer) {
      const tagGroup = textContainer.querySelector('.tag-group');
      if (tagGroup) {
        tag = tagGroup.querySelector('.tag');
      }
      heading = textContainer.querySelector('h3');
      description = textContainer.querySelector('p');
    }
    const textCellContent = [];
    if (tag) textCellContent.push(tag);
    if (heading) textCellContent.push(heading);
    if (description) textCellContent.push(description);
    return [img, textCellContent];
  }

  const cards = Array.from(element.querySelectorAll(':scope > a'));

  // Build table data: header row (one cell), then each card (two cells)
  const tableData = [
    ['Cards (cards10)'],
    ...cards.map(card => extractCardContent(card)),
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(block);
}
