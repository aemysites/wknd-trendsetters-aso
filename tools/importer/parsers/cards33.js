/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards33)'];
  const rows = [headerRow];

  // Defensive: get all immediate child <a> elements (each card)
  const cardLinks = Array.from(element.querySelectorAll(':scope > a'));

  cardLinks.forEach((cardLink) => {
    // Find the image (first image in the card)
    const img = cardLink.querySelector('img');

    // Find the card content container (the div after the image)
    const contentDiv = img ? img.nextElementSibling : null;
    
    // Defensive: If no contentDiv, skip this card
    if (!contentDiv) return;

    // Extract tag and read time (optional, could be grouped)
    const metaRow = contentDiv.querySelector('.flex-horizontal');
    let metaFragment = null;
    if (metaRow) {
      metaFragment = document.createDocumentFragment();
      Array.from(metaRow.children).forEach((metaChild) => {
        metaFragment.appendChild(metaChild);
      });
    }

    // Extract heading
    const heading = contentDiv.querySelector('h3, .h4-heading');
    // Extract description
    const desc = contentDiv.querySelector('p');
    // Extract CTA ("Read")
    const cta = Array.from(contentDiv.childNodes).find((node) => {
      return node.nodeType === 1 && node.textContent.trim().toLowerCase() === 'read';
    });

    // Compose the text cell
    const textCellContent = [];
    if (metaFragment) textCellContent.push(metaFragment);
    if (heading) textCellContent.push(heading);
    if (desc) textCellContent.push(desc);
    if (cta) textCellContent.push(cta);

    // Each row: [image, text content]
    rows.push([
      img,
      textCellContent
    ]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
