/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards17) block: 2 columns, multiple rows
  // Each card: image in first cell, text content in second cell

  // Header row
  const headerRow = ['Cards (cards17)'];

  // Find the grid container (holds all cards)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate card divs (each is a card)
  const cardDivs = Array.from(grid.children);

  // For each card, extract image (first cell), and text content (second cell)
  const rows = cardDivs.map(cardDiv => {
    // Find image inside card
    const img = cardDiv.querySelector('img');
    const imageCell = img || '';
    // Try to find text content from the closest parent section
    let textCell = '';
    const section = element.closest('section');
    if (section) {
      // Try to find a heading and paragraph for each card by index
      // Find all headings and paragraphs in the section
      const headings = Array.from(section.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      const paragraphs = Array.from(section.querySelectorAll('p'));
      // Use the card index to match heading/paragraph
      const idx = cardDivs.indexOf(cardDiv);
      const heading = headings[idx];
      const para = paragraphs[idx];
      let textParts = [];
      if (heading) textParts.push(heading.outerHTML);
      if (para) textParts.push(para.outerHTML);
      textCell = textParts.join('\n');
    }
    return [imageCell, textCell];
  });

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace original element
  element.replaceWith(table);
}
