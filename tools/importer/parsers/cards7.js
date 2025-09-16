/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row as specified (must be exactly one column)
  const headerRow = ['Cards (cards7)'];

  // Each card is a direct child div (utility-aspect-1x1)
  const cardDivs = element.querySelectorAll(':scope > div.utility-aspect-1x1');

  // Build table rows for each card
  const rows = Array.from(cardDivs).map(cardDiv => {
    // Find the image inside the card
    const img = cardDiv.querySelector('img');
    // Defensive: only add if image exists
    if (img) {
      // First cell: image
      // Second cell: use the image alt text as the text content (mandatory)
      // If there is other text content in the cardDiv, include it too
      const textCell = document.createElement('div');
      let hasText = false;
      if (img.alt && img.alt.trim()) {
        // Use alt text as a heading
        const heading = document.createElement('h3');
        heading.textContent = img.alt.trim();
        textCell.appendChild(heading);
        hasText = true;
      }
      // Check for any other text nodes in cardDiv (besides the image)
      Array.from(cardDiv.childNodes).forEach(node => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          const desc = document.createElement('div');
          desc.textContent = node.textContent.trim();
          textCell.appendChild(desc);
          hasText = true;
        }
      });
      if (!hasText) {
        textCell.innerHTML = '\u00a0';
      }
      return [img, textCell];
    }
    return null;
  }).filter(Boolean); // Remove any nulls

  // Compose the table cells array
  const cells = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Set colspan=2 on the header row to match the number of columns in data rows
  const headerTr = block.querySelector('tr');
  if (headerTr && headerTr.children.length === 1 && rows.length && rows[0].length === 2) {
    headerTr.children[0].setAttribute('colspan', '2');
  }

  // Replace the original element with the block table
  element.replaceWith(block);
}
