/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as per block spec
  const headerRow = ['Cards (cards23)'];
  const rows = [headerRow];

  // Find all tab panes (each tab is a block of cards)
  const tabPanes = element.querySelectorAll(':scope > div');
  tabPanes.forEach((tabPane) => {
    // Find the grid layout inside each tab pane
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;

    // Each card is an <a> inside the grid
    const cards = grid.querySelectorAll(':scope > a');
    cards.forEach((card) => {
      // Try to find image container and image
      let img = card.querySelector('img');
      // If no image, skip (per block spec)
      if (!img) return;

      // Compose text cell by collecting all text content in the card except the image
      // Remove the image container from the clone, keep only text
      const cardClone = card.cloneNode(true);
      // Remove all images from the clone
      cardClone.querySelectorAll('img').forEach(imgEl => imgEl.remove());
      // Remove empty divs (like aspect ratio wrappers)
      cardClone.querySelectorAll('div').forEach(div => {
        if (!div.textContent.trim() && div.children.length === 0) div.remove();
      });
      // The text cell should contain all the remaining content (including heading, description, etc.)
      const textCell = Array.from(cardClone.childNodes).filter(node => {
        // Only keep elements or text nodes with content
        if (node.nodeType === 3) return node.textContent.trim();
        if (node.nodeType === 1) return node.textContent.trim() || node.querySelector('*');
        return false;
      });
      // Add row: [image, text]
      rows.push([img, textCell]);
    });
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
