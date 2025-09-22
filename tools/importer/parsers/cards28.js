/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract cards from a grid
  function extractCardsFromGrid(grid) {
    const cards = [];
    // Each card is an <a> inside the grid
    const cardLinks = grid.querySelectorAll(':scope > a');
    cardLinks.forEach((card) => {
      // Try to find an image (in a div with .utility-aspect-3x2)
      let imageDiv = card.querySelector('.utility-aspect-3x2');
      let img = imageDiv ? imageDiv.querySelector('img') : null;
      // If no image, try to find any img inside the card
      if (!img) img = card.querySelector('img');
      // Only include cards with an image (image is mandatory)
      if (!img) return;
      // Compose text cell: include all text content except image
      // Get all elements except .utility-aspect-3x2 (image container)
      const textCell = document.createElement('div');
      Array.from(card.children).forEach((child) => {
        if (!child.classList.contains('utility-aspect-3x2')) {
          textCell.appendChild(child.cloneNode(true));
        }
      });
      // If textCell is empty, fallback to text content
      if (!textCell.textContent.trim()) {
        textCell.textContent = card.textContent.trim();
      }
      cards.push([img, textCell]);
    });
    return cards;
  }

  // Find all tab panes (each tab pane contains a grid)
  const tabPanes = element.querySelectorAll(':scope > div');
  const allCards = [];
  tabPanes.forEach((tabPane) => {
    // Find the grid inside the tab pane
    const grid = tabPane.querySelector('.w-layout-grid');
    if (grid) {
      const cards = extractCardsFromGrid(grid);
      allCards.push(...cards);
    }
  });

  // Compose table rows
  const headerRow = ['Cards (cards28)'];
  const tableRows = [headerRow, ...allCards];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  // Replace the original element
  element.replaceWith(table);
}
