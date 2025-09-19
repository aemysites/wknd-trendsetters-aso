/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image and text from each card anchor
  function extractCardContent(cardAnchor) {
    // Find image inside the card
    const img = cardAnchor.querySelector('img');
    // Find heading and description
    const heading = cardAnchor.querySelector('h3, h2, h4, h5, h6');
    const desc = cardAnchor.querySelector('.paragraph-sm, p');
    // Compose text cell contents
    const textContent = [];
    if (heading) textContent.push(heading);
    if (desc) textContent.push(desc);
    // Defensive: if no heading or desc, fallback to all text
    if (textContent.length === 0) {
      Array.from(cardAnchor.childNodes).forEach((node) => {
        if (node.nodeType === 3 && node.textContent.trim()) {
          const p = document.createElement('p');
          p.textContent = node.textContent.trim();
          textContent.push(p);
        }
      });
    }
    return [img ? img : '', textContent];
  }

  // Find all tab panes (each tab contains a grid of cards)
  const tabPanes = element.querySelectorAll(':scope > div');
  const rows = [];

  // Always start with the header row
  rows.push(['Cards (cards28)']);

  // For each tab pane, extract its cards
  tabPanes.forEach((tabPane) => {
    // Find grid container inside tabPane
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each card is an anchor
    const cardAnchors = grid.querySelectorAll(':scope > a');
    cardAnchors.forEach((cardAnchor) => {
      const [img, textContent] = extractCardContent(cardAnchor);
      // Only add if there is some text and image (or empty string for image)
      if (textContent && textContent.length) {
        rows.push([img, textContent]);
      }
    });
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
