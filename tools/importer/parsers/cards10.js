/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from each card-link
  function extractCardContent(cardLink) {
    // Find the image (mandatory)
    const imgWrapper = cardLink.querySelector('.utility-aspect-3x2');
    let img = null;
    if (imgWrapper) {
      img = imgWrapper.querySelector('img');
    }

    // Find the tag (optional)
    const tag = cardLink.querySelector('.tag-group .tag');

    // Find the heading (mandatory)
    const heading = cardLink.querySelector('h3, .h4-heading');

    // Find the description (optional)
    const desc = cardLink.querySelector('p');

    // Build the text cell content
    const textContent = [];
    if (tag) {
      textContent.push(tag.cloneNode(true));
    }
    if (heading) {
      textContent.push(heading.cloneNode(true));
    }
    if (desc) {
      textContent.push(desc.cloneNode(true));
    }

    return [img, textContent];
  }

  // Get all direct card links
  const cards = Array.from(element.querySelectorAll(':scope > a.card-link'));

  // Build table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards10)']);

  // Card rows
  cards.forEach(card => {
    const [img, textContent] = extractCardContent(card);
    rows.push([
      img,
      textContent
    ]);
  });

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
