/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required
  const headerRow = ['Cards (cardsNoImages19)'];
  const rows = [headerRow];

  // Defensive: Get all immediate child divs (each is a card)
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((cardDiv) => {
    // Each cardDiv contains: icon div, and a <p> with the description
    // We want only the text content for this block (no images/icons)
    // Find the <p> element (description)
    const desc = cardDiv.querySelector('p');
    let cardContent;
    if (desc) {
      // Create a new paragraph element to avoid carrying over unwanted classes
      const p = document.createElement('p');
      p.textContent = desc.textContent;
      cardContent = p;
    } else {
      // Fallback: use textContent of cardDiv
      cardContent = document.createTextNode(cardDiv.textContent.trim());
    }
    rows.push([cardContent]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
