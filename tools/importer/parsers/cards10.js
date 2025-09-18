/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Header row as specified
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Get all direct children that are cards (anchor tags)
  const cards = element.querySelectorAll(':scope > a.card-link');

  cards.forEach((card) => {
    // Find the image container (first div inside card)
    const imageContainer = card.querySelector(':scope > div');
    let imageCell = null;
    if (imageContainer) {
      // Defensive: ensure there's an img inside
      const img = imageContainer.querySelector('img');
      if (img) {
        imageCell = imageContainer; // Use the whole container for aspect ratio
      }
    }

    // Find the text container (second div inside card)
    const textContainer = card.querySelector(':scope > div.utility-padding-all-1rem');
    let textCell = null;
    if (textContainer) {
      // We'll use the whole text container, which includes tag, heading, and paragraph
      textCell = textContainer;
    }

    // Only add row if both image and text exist
    if (imageCell && textCell) {
      rows.push([imageCell, textCell]);
    }
  });

  // Build the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the new table
  element.replaceWith(table);
}
