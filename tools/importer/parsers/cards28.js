/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from an anchor element
  function extractCardInfo(cardAnchor) {
    // Try to find an image (mandatory for first cell)
    let img = cardAnchor.querySelector('img');
    // If not found directly, look for it in a nested div
    if (!img) {
      const imgDiv = cardAnchor.querySelector('div');
      if (imgDiv) img = imgDiv.querySelector('img');
    }
    // For the text cell: find heading and description
    let heading = cardAnchor.querySelector('h3, h2, h4, h5, h6');
    let desc = cardAnchor.querySelector('div.paragraph-sm, p, span');
    // Compose the text cell content
    const textContent = [];
    if (heading) textContent.push(heading);
    if (desc) textContent.push(desc);
    // If there are other links (CTA), add them at the end
    // (not present in this HTML, but for resilience)
    const ctas = Array.from(cardAnchor.querySelectorAll('a')).filter(a => a !== cardAnchor);
    if (ctas.length) textContent.push(...ctas);
    return [img, textContent];
  }

  // Find all tab panes (each tab is a set of cards)
  const tabPanes = element.querySelectorAll(':scope > div');
  const rows = [];
  // Always start with the block name header
  rows.push(['Cards (cards28)']);

  // For each tab pane, process its cards
  tabPanes.forEach(tabPane => {
    // Find the grid container inside the tab
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each card is an anchor
    const cards = grid.querySelectorAll(':scope > a');
    cards.forEach(cardAnchor => {
      const [img, textContent] = extractCardInfo(cardAnchor);
      if (img || (textContent && textContent.length)) {
        rows.push([
          img ? img : '',
          textContent.length ? textContent : ''
        ]);
      }
    });
  });

  // Build the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
