/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a card container
  function extractCardContent(cardDiv) {
    // Find the image (mandatory)
    const img = cardDiv.querySelector('img');
    // Find the text content (title and description)
    let title = null;
    let desc = null;
    // Look for a container with text
    const textContainer = cardDiv.querySelector('.utility-padding-all-2rem') || cardDiv.querySelector('.utility-position-relative') || cardDiv;
    if (textContainer) {
      title = textContainer.querySelector('h3');
      desc = textContainer.querySelector('p');
    }
    // Compose text cell
    const textCell = [];
    if (title) textCell.push(title);
    if (desc) textCell.push(desc);
    return [img, textCell];
  }

  // Get all immediate child divs (each is a card or image)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Compose rows for cards: only include cards with both image and text
  const rows = [];
  for (const div of cardDivs) {
    // Only include cards with both image and text (not plain images)
    const img = div.querySelector('img');
    const hasText = div.querySelector('h3') || div.querySelector('p');
    if (img && hasText) {
      rows.push(extractCardContent(div));
    }
  }

  // Build table cells
  const cells = [
    ['Cards (cards25)'], // header row
    ...rows
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block
  element.replaceWith(block);
}
