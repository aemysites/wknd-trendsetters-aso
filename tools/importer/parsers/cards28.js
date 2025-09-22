/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image and text from a card anchor
  function extractCardContent(card) {
    let img = null;
    let textContent = [];

    // Try to find an image inside the card
    img = card.querySelector('img');

    // Find heading (title)
    let heading = card.querySelector('h3, h4, h2, h1');
    if (heading) {
      textContent.push(heading);
    }

    // Find description (usually a div with class paragraph-sm)
    let desc = card.querySelector('.paragraph-sm');
    if (desc) {
      textContent.push(desc);
    }

    // If no heading or description, fallback to text nodes
    if (textContent.length === 0) {
      // Get all non-empty text nodes
      Array.from(card.childNodes).forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          textContent.push(document.createTextNode(node.textContent.trim()));
        }
      });
    }

    // If the card is a link and not just a wrapper, and has no image, treat as CTA
    // (not needed for this block, but left for completeness)
    // If needed, add logic here

    return [img, textContent];
  }

  // Find all tab panes (each tab is a set of cards)
  const tabPanes = element.querySelectorAll(':scope > div');
  const rows = [];
  const headerRow = ['Cards (cards28)'];
  rows.push(headerRow);

  tabPanes.forEach((tabPane) => {
    // Each tabPane contains a grid-layout div
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each card is an <a> (anchor)
    const cards = grid.querySelectorAll(':scope > a');
    cards.forEach((card) => {
      // For each card, extract image and text
      const [img, textContent] = extractCardContent(card);
      // Only add row if we have at least image or text
      if (img || (textContent && textContent.length)) {
        // First cell: image (if present), else empty string
        // Second cell: text content (array of elements)
        rows.push([
          img ? img : '',
          textContent.length === 1 ? textContent[0] : textContent
        ]);
      }
    });
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
