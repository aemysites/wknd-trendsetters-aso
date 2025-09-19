/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Get all direct child <a> elements (each is a card)
  const cards = element.querySelectorAll(':scope > a');

  cards.forEach((card) => {
    // Find the image container (first child div with image)
    const imageContainer = card.querySelector('.utility-aspect-3x2');
    let imageEl = imageContainer && imageContainer.querySelector('img');
    // Defensive: If no image found, skip this card
    if (!imageEl) return;

    // Find the text content container
    const textContainer = card.querySelector('.utility-padding-all-1rem');
    // Defensive: If no text found, skip this card
    if (!textContainer) return;

    // Extract tag (optional)
    const tagGroup = textContainer.querySelector('.tag-group');
    let tagEl = null;
    if (tagGroup) {
      tagEl = tagGroup.querySelector('.tag');
    }

    // Extract heading (optional)
    const headingEl = textContainer.querySelector('h3');
    // Extract description (optional)
    const descEl = textContainer.querySelector('p');

    // Compose the text cell
    const textCellContent = [];
    if (tagEl) {
      textCellContent.push(tagEl);
    }
    if (headingEl) {
      textCellContent.push(headingEl);
    }
    if (descEl) {
      textCellContent.push(descEl);
    }
    // If there is a link (the card itself), add a CTA at the bottom
    // Only add CTA if the href is not just '/'
    if (card.href && card.getAttribute('href') && card.getAttribute('href') !== '/') {
      const ctaLink = document.createElement('a');
      ctaLink.href = card.getAttribute('href');
      ctaLink.textContent = 'Learn more';
      textCellContent.push(ctaLink);
    }

    // Add the row: [image, text content]
    rows.push([
      imageEl,
      textCellContent
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
