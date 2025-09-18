/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards25)'];
  const rows = [headerRow];

  // Get all immediate children of the grid container
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((cardDiv) => {
    // Find the image (mandatory)
    const img = cardDiv.querySelector('img');
    // Defensive: skip if no image
    if (!img) return;

    // Find text content (h3 and p) if present
    let textContent = null;
    const h3 = cardDiv.querySelector('h3');
    const p = cardDiv.querySelector('p');
    if (h3 || p) {
      // Create a wrapper div for text
      textContent = document.createElement('div');
      if (h3) textContent.appendChild(h3);
      if (p) textContent.appendChild(p);
    }

    // If no h3/p, leave text cell empty
    const textCell = textContent || '';

    // Add row: [image, text]
    rows.push([img, textCell]);
  });

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
