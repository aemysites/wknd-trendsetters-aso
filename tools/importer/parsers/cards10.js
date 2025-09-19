/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content
  function extractCardContent(cardLink) {
    // Find image (mandatory)
    const imageWrapper = cardLink.querySelector('.utility-aspect-3x2');
    let imageEl = null;
    if (imageWrapper) {
      imageEl = imageWrapper.querySelector('img');
    }

    // Find text content
    const contentWrapper = cardLink.querySelector('.utility-padding-all-1rem');
    let tag = null;
    let heading = null;
    let desc = null;
    if (contentWrapper) {
      // Tag (optional)
      const tagGroup = contentWrapper.querySelector('.tag-group');
      if (tagGroup) {
        tag = tagGroup.querySelector('.tag');
      }
      // Heading (mandatory)
      heading = contentWrapper.querySelector('h3, .h4-heading');
      // Description (optional)
      desc = contentWrapper.querySelector('p');
    }

    // Compose text cell
    const textCellContent = [];
    if (tag) {
      textCellContent.push(tag);
    }
    if (heading) {
      textCellContent.push(heading);
    }
    if (desc) {
      textCellContent.push(desc);
    }
    return [imageEl, textCellContent];
  }

  // Build table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards10)']);

  // Each card is an <a.card-link>
  const cardLinks = element.querySelectorAll(':scope > a.card-link');
  cardLinks.forEach(cardLink => {
    const [imageEl, textCellContent] = extractCardContent(cardLink);
    rows.push([
      imageEl,
      textCellContent
    ]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
