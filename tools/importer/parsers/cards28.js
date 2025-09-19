/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract cards from a grid
  function extractCardsFromGrid(grid) {
    const cards = [];
    grid.querySelectorAll(':scope > a').forEach((a) => {
      // Find image (mandatory for cards28)
      const img = a.querySelector('img');
      if (!img) return; // Skip cards without image (do not add empty cell)
      // Compose text cell: include all text content in a
      const textContent = [];
      // Get heading (h3)
      const heading = a.querySelector('h3');
      if (heading) textContent.push(heading.cloneNode(true));
      // Get all paragraph-sm divs
      a.querySelectorAll('.paragraph-sm').forEach((desc) => {
        textContent.push(desc.cloneNode(true));
      });
      // If no heading or desc, fallback to all text nodes inside <a> (excluding script/style)
      if (textContent.length === 0) {
        // Get all text nodes inside <a>
        const walker = document.createTreeWalker(a, NodeFilter.SHOW_TEXT, {
          acceptNode: (node) => {
            // Ignore whitespace-only nodes
            if (!node.textContent.trim()) return NodeFilter.FILTER_SKIP;
            // Ignore script/style
            if (node.parentElement && (node.parentElement.tagName === 'SCRIPT' || node.parentElement.tagName === 'STYLE')) {
              return NodeFilter.FILTER_SKIP;
            }
            return NodeFilter.FILTER_ACCEPT;
          }
        });
        let node;
        while ((node = walker.nextNode())) {
          textContent.push(document.createTextNode(node.textContent.trim()));
        }
      }
      // Compose row: [image, text]
      cards.push([
        img.cloneNode(true),
        textContent
      ]);
    });
    return cards;
  }

  // Find all tab panes (each contains a grid of cards)
  const tabPanes = element.querySelectorAll(':scope > div');
  const rows = [];
  // Header row
  const headerRow = ['Cards (cards28)'];
  rows.push(headerRow);

  tabPanes.forEach((tabPane) => {
    // Find grid inside this tab pane
    const grid = tabPane.querySelector('.w-layout-grid');
    if (grid) {
      const cards = extractCardsFromGrid(grid);
      rows.push(...cards);
    }
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
