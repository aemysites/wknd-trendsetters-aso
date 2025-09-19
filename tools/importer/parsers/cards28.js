/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract cards from a grid
  function extractCardsFromGrid(grid) {
    const cards = [];
    // Each direct child <a> is a card
    const cardLinks = Array.from(grid.children).filter(
      (child) => child.tagName === 'A'
    );
    cardLinks.forEach((card) => {
      // Find image (MANDATORY)
      let img = card.querySelector('img');
      if (!img) return; // Skip cards without image
      // Find heading (h3)
      let heading = card.querySelector('h3');
      // Find description (div.paragraph-sm)
      let desc = card.querySelector('.paragraph-sm');
      // Defensive: fallback to first div if no .paragraph-sm
      if (!desc) {
        // Find all divs after h3 (if present), or all divs
        const divs = Array.from(card.querySelectorAll('div'));
        // Exclude image wrapper divs
        const filteredDivs = divs.filter(d => !d.querySelector('img') && (!heading || d !== heading.parentElement));
        if (filteredDivs.length > 0) {
          desc = filteredDivs[0];
        }
      }
      // Compose text cell
      const textContent = [];
      if (heading) textContent.push(heading);
      if (desc) textContent.push(desc);
      // Try to include all text nodes that are not in heading or desc
      // (for flexibility)
      const textNodes = Array.from(card.childNodes).filter(
        node => node.nodeType === Node.TEXT_NODE && node.textContent.trim()
      );
      textNodes.forEach(node => {
        textContent.push(document.createTextNode(node.textContent.trim()));
      });
      // Also include any additional <div> with text not already included
      Array.from(card.querySelectorAll('div')).forEach(div => {
        if (div !== desc && div !== img.parentElement && div.textContent.trim() && !textContent.includes(div)) {
          textContent.push(div);
        }
      });
      cards.push([img, textContent]);
    });
    return cards;
  }

  // Find all tab panes (each tab is a set of cards)
  const tabPanes = element.querySelectorAll(':scope > div');
  const allCards = [];
  tabPanes.forEach((tabPane) => {
    // Find the grid inside this tab
    const grid = tabPane.querySelector('.w-layout-grid');
    if (grid) {
      const cards = extractCardsFromGrid(grid);
      allCards.push(...cards);
    }
  });

  // Build table rows
  const headerRow = ['Cards (cards28)'];
  const tableRows = [headerRow];
  allCards.forEach(([img, textContent]) => {
    tableRows.push([
      img,
      Array.isArray(textContent) ? textContent : [textContent],
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
