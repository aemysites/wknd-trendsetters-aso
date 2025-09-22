/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Get all direct card links (each card is an <a> element)
  const cards = element.querySelectorAll(':scope > a');

  cards.forEach(card => {
    // Find image container (first child div with an img)
    const imageContainer = card.querySelector(':scope > div.utility-aspect-3x2');
    let imageEl = null;
    if (imageContainer) {
      imageEl = imageContainer.querySelector('img');
    }

    // Find text content container (second child div)
    const textContainer = card.querySelector(':scope > div.utility-padding-all-1rem');
    let textContent = [];
    if (textContainer) {
      // Tag (optional, usually a category)
      const tagGroup = textContainer.querySelector('.tag-group');
      if (tagGroup) {
        // Use the whole tag group for resilience
        textContent.push(tagGroup);
      }
      // Heading (h3)
      const heading = textContainer.querySelector('h3');
      if (heading) {
        textContent.push(heading);
      }
      // Description (p)
      const desc = textContainer.querySelector('p');
      if (desc) {
        textContent.push(desc);
      }
    }

    // Compose row: [image, text]
    const row = [imageEl, textContent];
    rows.push(row);
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(block);
}
