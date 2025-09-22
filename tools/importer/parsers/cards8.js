/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct card divs (each contains an image)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Table header as per block requirements (2 columns, second cell empty)
  const headerRow = ['Cards (cards8)', ''];
  const rows = [headerRow];

  // For each card div, extract the image (first child img)
  cardDivs.forEach((cardDiv) => {
    const img = cardDiv.querySelector('img');
    if (!img) return; // skip if no image

    // Reference the existing image element (do not clone or create new)
    const imageCell = img;
    // Second cell: use all text content from the card div except the image
    let textCell = '';
    // Collect all text nodes and elements except the image
    const textNodes = Array.from(cardDiv.childNodes).filter(node => node !== img && (node.nodeType === 3 || node.nodeType === 1));
    if (textNodes.length > 0) {
      // Create a container div and append all text nodes/elements
      const container = document.createElement('div');
      textNodes.forEach(node => container.appendChild(node.cloneNode(true)));
      textCell = container;
    } else if (img.alt && img.alt.trim()) {
      // Fallback: use alt text as heading
      const heading = document.createElement('h3');
      heading.textContent = img.alt;
      textCell = heading;
    } else {
      // Always provide a non-empty cell
      textCell = document.createElement('span');
      textCell.textContent = '';
    }
    rows.push([imageCell, textCell]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
