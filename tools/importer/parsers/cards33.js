/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the card text content
  function extractCardTextContent(cardDiv) {
    // Find the tag/label (optional), time (optional), heading, description, and CTA
    const textContainer = cardDiv.querySelector('div:not(:has(img))');
    if (!textContainer) return '';

    // Tag and time (optional)
    const tagRow = textContainer.querySelector('.flex-horizontal');
    let tagFragment = null;
    if (tagRow) {
      tagFragment = document.createElement('div');
      tagFragment.append(...Array.from(tagRow.childNodes));
    }

    // Heading (h3)
    const heading = textContainer.querySelector('h3');
    // Description (p)
    const desc = textContainer.querySelector('p');
    // CTA (the last div, usually says 'Read')
    const ctas = Array.from(textContainer.querySelectorAll('div'));
    let cta = null;
    if (ctas.length > 0) {
      // The last div is usually the CTA
      cta = ctas[ctas.length - 1];
      // Defensive: only use if it's not the tagRow
      if (cta === tagRow) cta = null;
    }

    // Compose the text cell
    const cellContent = [];
    if (tagFragment) cellContent.push(tagFragment);
    if (heading) cellContent.push(heading);
    if (desc) cellContent.push(desc);
    if (cta && cta.textContent.trim().toLowerCase() === 'read') {
      // Wrap CTA in a link if the card is a link
      const parentLink = cardDiv.closest('a');
      if (parentLink && parentLink.href) {
        const ctaLink = document.createElement('a');
        ctaLink.href = parentLink.href;
        ctaLink.textContent = cta.textContent;
        cellContent.push(ctaLink);
      } else {
        cellContent.push(cta);
      }
    }
    return cellContent;
  }

  // Build the table rows
  const headerRow = ['Cards (cards33)'];
  const rows = [headerRow];

  // Each card is a direct child <a> of the block
  const cards = Array.from(element.querySelectorAll(':scope > a'));
  cards.forEach((card) => {
    // Image: first img in the card
    const img = card.querySelector('img');
    // Text content: extract from card
    const cardGrid = card.querySelector('div');
    const textContent = extractCardTextContent(cardGrid);
    rows.push([
      img,
      textContent,
    ]);
  });

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
