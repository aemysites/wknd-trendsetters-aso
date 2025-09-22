/* global WebImporter */
export default function parse(element, { document }) {
  // Get only direct children that are cards (divs with an img)
  const cards = Array.from(element.children).filter(div => div.querySelector('img'));
  const rows = [];
  // Block header row as required
  rows.push(['Cards (cards25)']);

  cards.forEach(card => {
    // Reference the image element directly
    const img = card.querySelector('img');
    // Find the text content wrapper
    let textWrapper = card.querySelector('.utility-padding-all-2rem');
    // Fallback to any direct h3/h2/h1/p if wrapper not present
    let title = textWrapper ? textWrapper.querySelector('h1, h2, h3') : card.querySelector('h1, h2, h3');
    let desc = textWrapper ? textWrapper.querySelector('p') : card.querySelector('p');

    // Compose the text cell content, preserving semantic structure
    const textCell = [];
    if (title) textCell.push(title);
    if (desc) textCell.push(desc);

    // Only add row if image is present
    if (img) {
      rows.push([
        img,
        textCell.length ? textCell : ''
      ]);
    }
  });

  // Create the table using DOMUtils, referencing original elements
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
