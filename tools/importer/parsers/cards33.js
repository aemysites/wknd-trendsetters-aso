/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards33)'];

  // Get all direct child <a> elements (each is a card)
  const cardLinks = Array.from(element.querySelectorAll(':scope > a'));

  // Build rows for each card
  const rows = cardLinks.map((cardLink) => {
    // Find image (mandatory)
    const img = cardLink.querySelector('img');

    // Find the card content wrapper (the div after the image)
    const contentWrapper = img && img.nextElementSibling;

    // Defensive: If no content wrapper, fallback to the cardLink itself
    const contentDiv = contentWrapper || cardLink;

    // Compose the right cell: Tag, read time, title, description, CTA
    const rightCellContent = [];

    // Tag and read time (horizontal flex)
    const tagRow = contentDiv.querySelector('.flex-horizontal');
    if (tagRow) {
      rightCellContent.push(tagRow);
    }

    // Title (h3)
    const title = contentDiv.querySelector('h3');
    if (title) {
      rightCellContent.push(title);
    }

    // Description (p)
    const desc = contentDiv.querySelector('p');
    if (desc) {
      rightCellContent.push(desc);
    }

    // CTA ("Read" div)
    const ctaDivs = Array.from(contentDiv.querySelectorAll('div'));
    const cta = ctaDivs.find(d => d.textContent.trim().toLowerCase() === 'read');
    if (cta) {
      rightCellContent.push(cta);
    }

    // Left cell: image (mandatory)
    // Right cell: all extracted content
    return [img, rightCellContent];
  });

  // Compose the table
  const tableCells = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace original element with the new block table
  element.replaceWith(blockTable);
}
