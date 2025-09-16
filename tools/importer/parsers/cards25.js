/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from a card root element
  function extractCardContent(cardEl) {
    // Find the first img (mandatory)
    const img = cardEl.querySelector('img');
    // Find the first h3 (title, optional)
    const heading = cardEl.querySelector('h3');
    // Find the first p (description, optional)
    const desc = cardEl.querySelector('p');
    // Compose text cell (heading + description)
    const textContent = [];
    if (heading) textContent.push(heading);
    if (desc) textContent.push(desc);
    // If neither heading nor desc, leave cell empty
    return [img, textContent.length ? textContent : ''];
  }

  // Compose table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards25)']);

  // Find all direct children of the grid
  const cards = Array.from(element.querySelectorAll(':scope > div'));
  cards.forEach((cardEl) => {
    // Only treat as a card if it has an img
    const img = cardEl.querySelector('img');
    // If it has both an img and text (h3 or p), treat as a card
    const hasText = cardEl.querySelector('h3, p');
    if (img && hasText) {
      rows.push(extractCardContent(cardEl));
    }
  });

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
