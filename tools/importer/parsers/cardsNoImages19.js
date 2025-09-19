/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row
  const headerRow = ['Cards (cardsNoImages19)'];
  const rows = [headerRow];

  // Defensive: get all immediate children that are cards
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((cardDiv) => {
    // Each cardDiv contains: icon div, then a <p>
    // We want only the text content for cardsNoImages19
    // Get the <p> (description)
    const desc = cardDiv.querySelector('p');
    // Defensive: fallback to textContent if <p> missing
    let cardContent;
    if (desc) {
      cardContent = desc;
    } else {
      // fallback: use all text in cardDiv
      cardContent = document.createElement('span');
      cardContent.textContent = cardDiv.textContent.trim();
    }
    rows.push([cardContent]);
  });

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
