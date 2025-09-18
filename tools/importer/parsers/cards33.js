/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block table
  const headerRow = ['Cards (cards33)'];

  // Get all direct child <a> elements (each card)
  const cardLinks = Array.from(element.querySelectorAll(':scope > a'));

  // Prepare rows for each card
  const rows = cardLinks.map((card) => {
    // Find the image (first img in card)
    const img = card.querySelector('img');

    // Find the card content container (the inner div after the image)
    const contentGrid = card.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column.y-center.grid-gap-sm');
    // Defensive: fallback to the first div after img if needed
    let contentDiv;
    if (contentGrid) {
      // The content is the second child of the grid (after img)
      const divs = Array.from(contentGrid.children).filter((el) => el.tagName === 'DIV');
      contentDiv = divs.length ? divs[0] : null;
    } else {
      // Fallback: look for the first div after img
      const divs = Array.from(card.querySelectorAll('div'));
      contentDiv = divs.length > 1 ? divs[1] : null;
    }

    // Defensive: if no contentDiv, fallback to the card itself
    const textContent = contentDiv || card;

    // Table row: [image, text content]
    return [img, textContent];
  });

  // Compose the table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
