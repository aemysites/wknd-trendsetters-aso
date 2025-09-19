/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row
  const headerRow = ['Cards (cardsNoImages19)'];
  const rows = [headerRow];

  // Get all immediate child divs (each is a card)
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((cardDiv) => {
    // Defensive: find the first <p> inside this cardDiv
    const description = cardDiv.querySelector('p');
    if (description) {
      // Only the description goes in the card cell
      rows.push([description]);
    }
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
