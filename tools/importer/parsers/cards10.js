/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required
  const headerRow = ['Cards (cards10)'];
  const cells = [headerRow];

  // Get all direct card links (each card)
  const cardLinks = element.querySelectorAll(':scope > a.card-link');

  cardLinks.forEach((card) => {
    // Image: always present as first child div > img
    const imageContainer = card.querySelector(':scope > div.utility-aspect-3x2');
    const img = imageContainer ? imageContainer.querySelector('img') : null;

    // Text content: second child div
    const contentContainer = card.querySelector(':scope > div.utility-padding-all-1rem');

    // Tag (optional)
    const tagGroup = contentContainer ? contentContainer.querySelector('.tag-group') : null;
    const tag = tagGroup ? tagGroup.querySelector('.tag') : null;

    // Title (h3)
    const title = contentContainer ? contentContainer.querySelector('h3') : null;
    // Description (p)
    const description = contentContainer ? contentContainer.querySelector('p') : null;

    // Compose text cell content
    const textCellContent = [];
    if (tag) textCellContent.push(tag);
    if (title) textCellContent.push(title);
    if (description) textCellContent.push(description);

    // If the card link has an href and it's not just '/', add as CTA at the end
    if (card.href && card.getAttribute('href') && card.getAttribute('href') !== '/') {
      const cta = document.createElement('a');
      cta.href = card.getAttribute('href');
      cta.textContent = 'Learn more';
      textCellContent.push(cta);
    }

    // Add row: [image, text content]
    cells.push([
      img ? img : '',
      textCellContent
    ]);
  });

  // Create block table and replace element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
