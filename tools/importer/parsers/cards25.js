/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct card containers
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Table header row as required
  const headerRow = ['Cards (cards25)'];
  const rows = [headerRow];

  cardDivs.forEach((cardDiv) => {
    // Find the first image in the card
    const img = cardDiv.querySelector('img');
    if (!img) return; // skip if no image (should not happen)

    // Find text content (title and description)
    let title = cardDiv.querySelector('h3, h2, h1, h4, h5, h6');
    let desc = cardDiv.querySelector('p');

    // Compose text cell: preserve heading and paragraph semantics
    const textCell = [];
    if (title) textCell.push(title);
    if (desc) textCell.push(desc);
    // Fallback: if no heading/paragraph, include any text nodes
    if (textCell.length === 0) {
      const textNodes = Array.from(cardDiv.childNodes).filter(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
      textNodes.forEach(n => {
        const p = document.createElement('p');
        p.textContent = n.textContent.trim();
        textCell.push(p);
      });
    }

    // Add row: [image, text cell]
    rows.push([img, textCell]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
