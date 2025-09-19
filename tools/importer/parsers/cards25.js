/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image and text from a card block
  function extractCardContent(cardDiv) {
    // Find the first image in the card
    const img = cardDiv.querySelector('img');
    // Find the text container (usually a div with padding)
    let textContainer = null;
    // Try to find a div with a heading and paragraph
    const candidates = cardDiv.querySelectorAll('div');
    for (const c of candidates) {
      if (c.querySelector('h3') || c.querySelector('p')) {
        textContainer = c;
        break;
      }
    }
    // If not found, fallback to the cardDiv itself
    if (!textContainer) {
      textContainer = cardDiv;
    }
    return [img, textContainer];
  }

  // Get all direct children that are cards (divs with images)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Prepare table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards25)']);

  // For each card div, extract image and text, and add to rows
  cardDivs.forEach(cardDiv => {
    const img = cardDiv.querySelector('img');
    // Only process if an image is present (mandatory)
    if (img) {
      // Try to find a text container within this card
      let textContainer = null;
      // Look for a div with heading or paragraph
      const candidates = cardDiv.querySelectorAll('div');
      for (const c of candidates) {
        if (c.querySelector('h3') || c.querySelector('p')) {
          textContainer = c;
          break;
        }
      }
      // If not found, fallback to cardDiv itself
      if (!textContainer) {
        textContainer = cardDiv;
      }
      rows.push([img, textContainer]);
    }
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
