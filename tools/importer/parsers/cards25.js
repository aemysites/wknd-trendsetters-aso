/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content (image, title, description)
  function extractCardContent(cardDiv) {
    // Find the first image in the card
    const img = cardDiv.querySelector('img');
    // Find the first heading (h3, h2, etc.)
    let heading = cardDiv.querySelector('h1, h2, h3, h4, h5, h6');
    // Find the first paragraph
    let desc = cardDiv.querySelector('p');

    // Defensive: if heading or desc are not direct children, try deeper
    if (!heading) {
      heading = cardDiv.querySelector('[class*=heading], [class*=title]');
    }
    if (!desc) {
      // Sometimes description may be in a div
      desc = cardDiv.querySelector('div:not(:has(img)):not(:has(h1,h2,h3,h4,h5,h6))');
    }

    // Compose text cell: heading (if any), then description (if any)
    const textContent = [];
    if (heading) textContent.push(heading);
    if (desc) textContent.push(desc);
    return [img, textContent];
  }

  // Get all immediate children (cards or images)
  const cards = Array.from(element.querySelectorAll(':scope > div'));

  // Compose rows: only those with images are valid cards
  const rows = [];
  for (const cardDiv of cards) {
    const img = cardDiv.querySelector('img');
    if (!img) continue; // skip if no image
    // If card has heading or description, treat as a full card
    const hasText = cardDiv.querySelector('h1, h2, h3, h4, h5, h6, p');
    if (hasText) {
      const [imageEl, textEls] = extractCardContent(cardDiv);
      rows.push([imageEl, textEls]);
    }
  }

  // Build table data
  const table = [
    ['Cards (cards25)'],
    ...rows
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(table, document);
  element.replaceWith(block);
}
