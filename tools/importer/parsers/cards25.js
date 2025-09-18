/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from a card container
  function extractCard(cardEl) {
    // Find the image (first img in card)
    const img = cardEl.querySelector('img');
    // Find the heading and paragraph (if present)
    let textContent = null;
    const heading = cardEl.querySelector('h3, h2, h4, h1');
    const paragraph = cardEl.querySelector('p');
    // Compose text cell
    if (heading || paragraph) {
      const frag = document.createDocumentFragment();
      if (heading) frag.appendChild(heading);
      if (paragraph) frag.appendChild(paragraph);
      textContent = frag;
    }
    return [img, textContent];
  }

  // Get all direct children of the grid element
  const cards = Array.from(element.querySelectorAll(':scope > div'));

  // Build rows for cards with both image and text
  const rows = [];
  cards.forEach((cardEl) => {
    // Defensive: Only include cards with an image
    const img = cardEl.querySelector('img');
    if (!img) return; // skip if no image
    // Check if there is text content
    const heading = cardEl.querySelector('h3, h2, h4, h1');
    const paragraph = cardEl.querySelector('p');
    if (heading || paragraph) {
      rows.push(extractCard(cardEl));
    }
  });

  // Table header
  const headerRow = ['Cards (cards25)'];
  const cells = [headerRow, ...rows];

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
